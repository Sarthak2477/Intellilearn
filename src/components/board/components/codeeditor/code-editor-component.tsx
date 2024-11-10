"use client";

import React from 'react'

import { Editor } from '@monaco-editor/react';
import useCodeEditorStore from '@/stores/codeeditor';

type CodeEditorProps = {}

export default function CodeEditor({}: CodeEditorProps) {
  const { mainSchemaText, buffering } = useCodeEditorStore();
  
  return (
    <Editor 
      value={mainSchemaText || ""}
      height="70vh"
      language='sql'
      theme="custom-theme"
      options={{
        minimap: {
          enabled: false,
        },
        fontFamily: "JetBrains Mono",
        readOnly: buffering,
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
  )
}