"use client";

import React, { useCallback, useEffect } from 'react';
import { Background, ReactFlow, Controls, useNodesState, useEdgesState } from '@xyflow/react';
import type { Edge, Node } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LayoutGrid } from 'lucide-react';

import ELK from 'elkjs/lib/elk.bundled.js';

import { DatabaseSchemaNode } from "@/components/database-schema-node";

import '@xyflow/react/dist/style.css';
import '../css/board.css';


const elk = new ELK();

const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.spacing.nodeNode': '150',
  'elk.layered.spacing.nodeNodeBetweenLayers': '200',
  'elk.direction': 'RIGHT',
  'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
  'elk.layered.nodePlacement.strategy': 'SIMPLE',
  'elk.layered.layering.strategy': 'NETWORK_SIMPLEX'
};

type NodeRendererProps = {
  nodes: TableNode[],
  edges: Edge[],
}

export type TableNode = Omit<Node, 'data'> & {
  data: Node['data'] & {
    schema: {
      title: string,
      type: string,
      is_null?: boolean,
      is_unique?: boolean,
      is_pk?: boolean,
    }[]
  }
}

export default function NodeRenderer({
  nodes: i__nodes,
  edges: i__edges,
}: NodeRendererProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(i__nodes);
  const [edges, setEdges] = useEdgesState(i__edges);

  const getNodeDimensions = (node: TableNode) => ({
    width: 280,
    height: 50 + node.data.schema.length * 30
  });

  const handleAutoLayout = useCallback(async () => {
    const elkGraph = {
      id: "root",
      children: nodes.map((node) => ({
        id: node.id,
        ...getNodeDimensions(node),
        // Add ports for better edge routing
        ports: node.data.schema.map((field) => ({
          id: `${node.id}-${field.title}`,
          properties: {
            side: 'EAST'
          }
        }))
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target]
      }))
    };

    try {
      const layoutGraph = await elk.layout(elkGraph, { layoutOptions: elkOptions });
      
      setNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          // Add some offset to center the layout
          position: {
            x: layoutGraph.children?.find((n) => n.id === node.id)?.x ?? 0 + 100,
            y: layoutGraph.children?.find((n) => n.id === node.id)?.y ?? 0 + 50
          }
        }))
      );
    } catch (error) {
      console.error('Layout calculation failed:', error);
    }
  }, [nodes, edges, setNodes]);
  
  // Auto layout items in the beggining
  useEffect(() => {
    handleAutoLayout();
  }, []);

  return (
    <>
      <ReactFlow
        colorMode='dark'
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        nodeTypes={{
          databaseSchema: DatabaseSchemaNode
        }}
        nodesDraggable
      >
        <Background color='#fff2' bgColor='var(--board-default-background)' size={2} gap={20} />
        <Controls position='top-left'/>
      </ReactFlow>
      <div className='absolute top-4 right-4 '>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="secondary"
                onClick={handleAutoLayout}
                className="px-3 py-2 rounded-md flex items-center justify-center gap-2"
              >
                <LayoutGrid />
              </Button>
            </TooltipTrigger>
            <TooltipContent className='bg-white text-primary'>
                Auto Layout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}