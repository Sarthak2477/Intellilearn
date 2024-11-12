import { generateExplanationFromSchema } from "@/actions/explanation-generator";
import useInspectorStore from "@/stores/inspector";
import { X } from "lucide-react";
import { ChatCompletionChunk } from "openai/resources/index.mjs";
import { Stream } from "openai/streaming.mjs";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

type Props = {
  sectionToExplain: string;
}

export default function ExplainWithAIComponent({
  sectionToExplain,
}: Props) {
  const [ explanation, setExplanation ] = useState("");
  
  const { setIsExplaining } = useInspectorStore();
  const { mainSchemaText } = useInspectorStore();

  async function generateExplaination() {
    const response = await generateExplanationFromSchema(mainSchemaText, sectionToExplain);

    for await (const chunk of response as Stream<ChatCompletionChunk>) {
      setExplanation(explanation => explanation + chunk.choices[0]?.delta.content || "");
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    generateExplaination();

    return () => {
      controller.abort();
    }
  }, []);
  
  return (
    <div 
      className={`
        absolute 

        z-[120]
        
        w-96 min-h-32 max-h-96

        overflow-auto text-wrap
        
        rounded-lg border-[1px] border-green-400 
        bg-zinc-800/95 

        flex flex-col
        p-3
      `}
    >
      <div className='flex justify-between'>
        <span className="font-bold font-poppins">Explain with AI</span>
        <X size={18} className='text-gray-400' onClick={() => setIsExplaining(false)} />
      </div>
      <Markdown className="text-xs text-gray-300">
        { explanation }   
      </Markdown>
    </div>
  );
}