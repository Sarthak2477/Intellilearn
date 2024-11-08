"use client";

import useFlowStore from '@/stores/flow';
import { Code2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { Editor, loader } from '@monaco-editor/react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';

type Props = {};

export default function CodeEditor({}: Props) {
  const { toggleEditorOpen, codeEditorOpen } = useFlowStore();
  
  useEffect(() => {
    
  }, [])
  
  return (
    <motion.div 
      className='relative' // Added relative
      animate={{
        width: codeEditorOpen ? "35%" : "0%"
      }}
      initial={{
        width: "0%"
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <div className={`p-4 flex flex-col`}>
        <div className='flex justify-between items-center px-2 mb-4'>
          <span className='font-bold text-slate-500'>SQL Code</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <X onClick={toggleEditorOpen} size={18} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Close</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Editor 
          height="80vh"
          language='sql'
          theme="custom-theme"
          options={{
            minimap: {
              enabled: false,
            }
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
          }}
        />
      </div>
    </motion.div>
  );
}