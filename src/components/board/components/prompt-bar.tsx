import { Meteors } from '@/components/global/meteors'
import { Input } from '@/components/ui/input'
import { LoaderCircle, Pickaxe, Zap } from 'lucide-react'
import React, { useState } from 'react'

// Server actions
import { generateSchemaFromPrompt } from "@/actions/schema-generator";
import useCodeEditorStore from '@/stores/codeeditor';

type Props = {}

export default function PromptBar({}: Props) {
  /*
    Prompt Bar
    Takes in text input and sends the prompt to OpenAI API to get schema response to process later.
  */

  const [prompt, setPrompt] = useState("");

  const { mainSchemaText, addToMainSchemaText, buffering, setBuffering, addToDiffSchemaText } = useCodeEditorStore();

  async function handlePromptSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    setBuffering(true);

    
    const stream = await generateSchemaFromPrompt(prompt);
    for await (const chunk of stream) {
      if ( mainSchemaText.length <= 0 ) {
        addToMainSchemaText(chunk.choices[0]?.delta?.content || "");
      } else {
        addToDiffSchemaText(chunk.choices[0]?.delta?.content || "");
      }
    }
    setBuffering(false);
  }

  return (
    <form 
    onSubmit={handlePromptSubmit}
    className='
      absolute 
      w-[32rem] min-h-14 
      bottom-12 left-1/2 -translate-x-1/2 
      bg-zinc-900 
      rounded-xl

      flex items-center justify-between
      px-4

      overflow-hidden
    '>
      <Meteors number={10} className=''/>
      {
        buffering ? <LoaderCircle size={18} className='text-zinc-700 animate-spin' /> : <Zap className='text-zinc-700' size={18} />
      }
      <Input 
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        className='peer border-0 focus-visible:ring-0 placeholder:text-zinc-500 text-zinc-500 py-3 !text-xs' 
        placeholder='Your prompt goes here....'
      />
      <div className='
        peer-[:not(:placeholder-shown)]:opacity-100 opacity-0 
        text-emerald-700
        bg-transparent
        hover:bg-emerald-600
        hover:text-zinc-800
        
        right-4
        absolute
        peer-[:not(:placeholder-shown)]:translate-y-0
        -translate-y-10
        
        p-2
        rounded-lg
        cursor-pointer
        
        transition-all
        '>
        <Pickaxe size={18} />
      </div>
      <span className="absolute bottom-[2px] left-11 text-[9px] text-zinc-500">{ prompt.length > 0 && `${prompt.length} characters` }</span>
    </form>
  )
}