"use client";

import { Code2, X } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

export default function CodeEditor({}: Props) {
  const [editorOpen, setEditorOpen] = useState(false);
  
  const toggleEditor = () => setEditorOpen(!editorOpen);
  
  return (
    <div className='
      absolute pointer-events-none
      h-full w-full
    '>
      <div 
        onClick={toggleEditor}
        className='
          absolute right-3 top-1/2 -translate-y-1/2
          h-12 w-12
          rounded-lg
          bg-zinc-900 hover:bg-zinc-800
          cursor-pointer
          border-[1.4px] border-emerald-500

          flex items-center justify-center
          pointer-events-auto
      '>
        <Code2 className='text-gray-500' size={18}/>
      </div>

      <div className={`
        w-[45rem] h-[45rem]
        absolute right-0 top-1/2 -translate-y-1/2
        rounded-l-xl
        
        ${editorOpen ? "translate-x-2" : "translate-x-[100%]"}
        transition-all
        bg-zinc-900
        shadow-sm

        border-2 border-emerald-600

        p-4
        
        pointer-events-auto
      `}>
        <div className='flex justify-end'>
          <X onClick={toggleEditor} className='cursor-pointer' />
        </div>
      </div>
    </div>
  )
}