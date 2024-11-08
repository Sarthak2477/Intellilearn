"use client";

import useFlowStore from '@/stores/flow';
import { Code2, X } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

export default function CodeEditor({}: Props) {
  const { toggleEditorOpen } = useFlowStore();
  
  return (
    <div className='flex-[2] bg-red-500'>

    </div>
  )
}