"use client";

import { Background, ReactFlow, Controls } from '@xyflow/react';
import { DatabaseSchemaNode } from "@/components/database-schema-node";

import React from 'react'

import '@xyflow/react/dist/style.css';
import './css/board.css';
import PromptBar from './components/promptbar';
import CodeEditor from './components/codeeditor';

type Props = {}

export default function SchemaBoard({}: Props) {
  const nodes = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      type: "databaseSchema",
      data: {
        label: "Authors",
        schema: [
          { title: "author_id", type: "int" },
          { title: "first_name", type: "varchar" },
          { title: "last_name", type: "varchar" },
          { title: "birth_year", type: "int" },
        ],
      },
    },
    {
      id: "2",
      position: { x: 300, y: 0 },  // Move Books next to Authors
      type: "databaseSchema",
      data: {
        label: "Books",
        schema: [
          { title: "book_id", type: "int" },
          { title: "title", type: "varchar" },
          { title: "genre", type: "varchar" },
          { title: "publish_year", type: "int" },
          { title: "author_id", type: "int" },
        ],
      },
    },
    {
      id: "3",
      position: { x: 300, y: 200 },  // Place Borrowers below Books
      type: "databaseSchema",
      data: {
        label: "Borrowers",
        schema: [
          { title: "borrower_id", type: "int" },
          { title: "first_name", type: "varchar" },
          { title: "last_name", type: "varchar" },
          { title: "email", type: "varchar" },
        ],
      },
    },
    {
      id: "4",
      position: { x: 600, y: 200 },  // Place Borrowings next to Borrowers
      type: "databaseSchema",
      data: {
        label: "Borrowings",
        schema: [
          { title: "borrow_id", type: "int" },
          { title: "book_id", type: "int" },
          { title: "borrower_id", type: "int" },
          { title: "borrow_date", type: "date" },
          { title: "return_date", type: "date" },
        ],
      },
    },
  ];
  

  const edges = [
    {
      id: "books-authors",
      source: "1",
      target: "2",
      sourceHandle: "author_id",
      targetHandle: "author_id",
    },
    {
      id: "borrowings-books",
      source: "2",
      target: "4",
      sourceHandle: "book_id",
      targetHandle: "book_id",
    },
    {
      id: "borrowings-borrowers",
      source: "3",
      target: "4",
      sourceHandle: "borrower_id",
      targetHandle: "borrower_id",
    },
  ];
  
  
  
  return (
    <div className='flex-1 relative flex flex-col'>
      <ReactFlow
        colorMode='dark'
        nodes={nodes}
        edges={edges}
        nodeTypes={{
          databaseSchema: DatabaseSchemaNode
        }}
      >
        <Background color='#fff2' bgColor='var(--board-default-background)' size={2} gap={20} />
        <Controls position='top-right'/>
      </ReactFlow>

      <CodeEditor />
      <PromptBar />
    </div>
  );
}