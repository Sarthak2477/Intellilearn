import React from 'react'

import { Editor } from '@monaco-editor/react';

type CodeEditorProps = {}

export default function CodeEditor({}: CodeEditorProps) {
  return (
    <Editor 
      height="80vh"
      language='sql'
      theme="custom-theme"
      options={{
        minimap: {
          enabled: false,
        },
        fontFamily: "JetBrains Mono"
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