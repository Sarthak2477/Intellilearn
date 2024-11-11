import useInspectorStore from '@/stores/inspector';
import React, { useEffect } from 'react'

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {}

export default function DocumentationViewer({}: Props) {
  const { documentationText, mainSchemaText, buffering } = useInspectorStore();

  if ( buffering ) {
    return <div className='h-[72vh]'>
      { documentationText }
    </div>
  }

  return (
    <div className='h-[72vh] overflow-auto'>
      <Markdown
        className="markdown h-full"
        remarkPlugins={[
          remarkGfm,
        ]}
      >
        { documentationText }
      </Markdown>
    </div>
  )
}