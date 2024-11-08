"use client";

import { Background, ReactFlow, Controls } from '@xyflow/react';
import React from 'react'

import '@xyflow/react/dist/style.css';
import './css/board.css';
import PromptBar from './components/promptbar';

type Props = {}

export default function SchemaBoard({}: Props) {
  return (
    <div className='flex-1 relative flex flex-col'>
      <ReactFlow
        colorMode='dark'
        nodes={[]}
        edges={[]}
      >
        <Background color='#fff2' bgColor='var(--board-default-background)' size={2} gap={20} />
        <Controls position='top-right'/>
      </ReactFlow>
      <PromptBar />
    </div>
  );
}