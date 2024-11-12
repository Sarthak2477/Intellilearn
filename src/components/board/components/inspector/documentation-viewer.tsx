import useInspectorStore from '@/stores/inspector';
import React from 'react'

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {}

export default function DocumentationViewer({}: Props) {
  const { documentationText } = useInspectorStore();

  return (
    <div className='h-[80vh] overflow-auto'>
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