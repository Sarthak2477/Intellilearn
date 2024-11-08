"use client";

import useFlowStore from '@/stores/flow';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import CodeEditor from './code-editor-component';

type Props = {};

export default function CodeEditorSection({}: Props) {
  const { toggleEditorOpen, codeEditorOpen } = useFlowStore();
  
  useEffect(() => {
    
  }, []);
  
  return (
    <>
    {/* This component will open the editor if the mouse pulled towards the right
        right of the screen
     */}
      <div 
        onMouseEnter={toggleEditorOpen}
        className='absolute h-[100%] w-4 right-0 top-1/2 -translate-y-1/2' />
    
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
            <span className='font-bold text-emerald-500 font-sans'>SQL Code</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <X onClick={toggleEditorOpen} size={18} className='text-emerald-500'/>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Close</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <CodeEditor />          
        </div>
      </motion.div>
    </>
  );
}