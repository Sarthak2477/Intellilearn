"use client";

import useFlowStore from '@/stores/flow';
import { Code2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { Editor, loader } from '@monaco-editor/react';

type Props = {};

export default function CodeEditor({}: Props) {
  const { toggleEditorOpen, codeEditorOpen } = useFlowStore();
  
  useEffect(() => {
    
  }, [])
  
  return (
    <motion.div 
      className='relative' // Added relative
      animate={{
        width: codeEditorOpen ? "30%" : "0%"
      }}
      initial={{
        width: "0%"
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <div className={`p-4`}>
        <Editor 
          height="90vh"
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