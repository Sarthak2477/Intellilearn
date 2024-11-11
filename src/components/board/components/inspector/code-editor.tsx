"use client";

import React, { useEffect } from 'react'

import { DiffEditor, Editor } from '@monaco-editor/react';
import useInspectorStore from '@/stores/inspector';
import useFlowStore from '@/stores/flow';
import SQLToReactFlowParser from '@/lib/react-flow-parser';

type CodeEditorProps = {}

export default function CodeEditor({}: CodeEditorProps) {
  const { 
    mainSchemaText,
    buffering,
    diffSchemaText,
    mainCodeDiffMode,
    clearDiffSchemaText,
    setMainCodeDiffMode,
    setMainSchemaText,
  } = useInspectorStore();

  const {
    setFlowNodes,
    setFlowEdges,
    flowNodes,
    flowEdges,
  } = useFlowStore();
  
  const handleCodeChange = (value: string | undefined) => {
    // Don't update flow chart when streaming
    if ( !buffering && mainSchemaText ) {
      const parser = new SQLToReactFlowParser();
      const { nodes, edges } = parser.parse(value || "");

      setMainSchemaText(value || "");
      setFlowNodes(nodes.map(node => {
        const correspondingNode = nodes.find(n => n.id === node.id);
        if ( correspondingNode ) {
          return {
            ...node,
            position: correspondingNode.position,
          }
        }
        
        return node;
      }));
      setFlowEdges(edges);
    }
  }
  
  if ( mainCodeDiffMode && !buffering ) {
    const handleCancelChanges = () => {
      clearDiffSchemaText();
      setMainCodeDiffMode(false); 
      handleCodeChange(mainSchemaText);
    }

    const handleAcceptChanges = () => {
      setMainSchemaText(diffSchemaText);
      clearDiffSchemaText();
      setMainCodeDiffMode(false);
    }
    
    // Diff Mode
    return <>
      <DiffEditor 
        original={mainSchemaText || ""}
        modified={diffSchemaText || ""}
        
        height="70vh"
        language='sql'
        theme="custom-theme"
        options={{
          minimap: {
            enabled: false,
          },
          fontFamily: "JetBrains Mono",
          readOnly: buffering,
          enableSplitViewResizing: true,
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
      {/* Accept Changes button */}
      {
        !buffering && (
          <div className='flex gap-3 items-center my-3'>
            <span className='text-xs text-zinc-500 font-poppins'>Accept changes?</span>
            <button onClick={handleCancelChanges} className='text-xs px-2 py-1 rounded-md text-white bg-red-500 hover:bg-red-600 font-mono'>Cancel</button>
            <button onClick={handleAcceptChanges} className='text-xs px-2 py-1 rounded-md text-white border-[1px] border-green-500 hover:bg-white/10 font-mono'>Accept</button>

          </div>
        )
      }
    </>
  }
  
  return (
    <Editor 
      value={mainSchemaText || ""}
      onChange={handleCodeChange}
      height="70vh"
      language="sql"
      theme="custom-theme"
      options={{
        minimap: {
          enabled: false,
        },
        // fontFamily: "JetBrains Mono",
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
      keepCurrentModel={true}
    />
  )
}