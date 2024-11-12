import React, { FormEvent, useState } from 'react'
import Image from 'next/image';

import { ChatCompletionChunk } from 'openai/resources/index.mjs';
import { Stream } from 'openai/streaming.mjs';
import MonacoEditor from "@monaco-editor/react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useInspectorStore, { ExportOptions } from '@/stores/inspector';
import { generateDjangoModelFromSchema } from '@/actions/django-export-generator';
import { generatePrismaModelFromSchema } from '@/actions/prisma-export-generator';
import prismaTokenizer from '@/lib/prisma-tokenizer';

const LANGUAGE_TO_IMAGE_URL: {[_:string]:string} = {
  "django": "/django_logo.jpg",
  "prisma": "/prisma_logo.svg"
};

export default function ExportSchemaToORMSection() {
  const [ exporting, setExporting ] = useState(false);
  const [ output, setOutput ] = useState("");
  const { mainSchemaText, exportOption, setExportOption } = useInspectorStore();
  
  const handleChangeExportOption = (option: ExportOptions) => setExportOption(option);

  async function handleExport(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if ( exporting ) return;

    setOutput("");
    setExporting(true);
    
    let stream;
    
    if ( exportOption === "django" )
      stream = await generateDjangoModelFromSchema(mainSchemaText);
    else if ( exportOption === "prisma" )
      stream = await generatePrismaModelFromSchema(mainSchemaText);
    else return;

    for await (const chunk of stream as Stream<ChatCompletionChunk>) {
      const data = chunk.choices[0]?.delta.content;
      setOutput(explanation => explanation + (data !== undefined ? data : ""));
    }
    setExporting(false);
  }
  
  return (
    <div className='space-y-2'>
      <form onSubmit={handleExport} className='flex items-center gap-2'>
        <div className='bg-white flex items-center justify-center rounded-lg overflow-hidden  w-8'>
          <Image
            src={LANGUAGE_TO_IMAGE_URL[exportOption]}
            alt={`Export to ${exportOption}`}
            height={40}
            width={40}
          />
        </div>
        <Select value={exportOption} onValueChange={handleChangeExportOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Export Option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="django" descriptor="Export to django models and migrate">Django</SelectItem>
            <SelectItem value="prisma" descriptor="Export to prisma models and migrate">Prisma</SelectItem>
            <SelectItem disabled value="eloquent" descriptor="Export to eloquent models and migrate">Eloquent</SelectItem>
            <SelectItem disabled value="drizzle" descriptor="Export to drizzle models and migrate">Drizzle</SelectItem>
          </SelectContent>
        </Select>
        <button 
          disabled={exporting}
          className='px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm'
        >{output ? "Regenerate" : "Generate"}</button>
      </form>
      <MonacoEditor 
        value={output.replace(/```[a-zA-Z0-9]+\n|\n```/g, '').replace(/```/,"")}
        className="h-[80vh]"
        language={
          exportOption === "django" ? "python" :
          exportOption === "prisma" ? "prisma" :
          "javascript"
        }
        theme="custom-theme"
        options={{
          minimap: {
            enabled: false,
          },
          fontFamily: "JetBrains Mono",
          fontSize: 13,
        }}
        beforeMount={monaco => {
          monaco.editor.defineTheme('custom-theme', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
              'editor.background': '#00000000',
            },
          });

          // Added prisma support
          monaco.languages.register({ id: 'prisma' })
          monaco.languages.setMonarchTokensProvider('prisma', prismaTokenizer as any)

        }}
        keepCurrentModel={true}
      />
    </div>    
  );
}