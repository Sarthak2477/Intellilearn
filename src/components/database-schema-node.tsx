import { Node, NodeProps, Position } from "@xyflow/react";
import { BaseNode } from "@/components/base-node";
import { LabeledHandle } from "@/components/labeled-handle";

type DatabaseSchemaNode = Node<{
  label: string;
  schema: { title: string; type: string }[];
}>;

const getTypeColor = (type: string): string => {
  const typeColor: {
    [_: string]: string,
  } = {
    // Numeric types
    'int': 'text-blue-600',
    'integer': 'text-blue-600',
    'float': 'text-blue-600',
    'double': 'text-blue-600',
    'decimal': 'text-blue-600',
    'number': 'text-blue-600',
    
    // String types
    'string': 'text-emerald-600',
    'text': 'text-emerald-600',
    'char': 'text-emerald-600',
    'varchar': 'text-emerald-600',
    
    // Date/Time types
    'date': 'text-purple-600',
    'datetime': 'text-purple-600',
    'timestamp': 'text-purple-600',
    'time': 'text-purple-600',
    
    // Boolean type
    'boolean': 'text-yellow-600',
    'bool': 'text-yellow-600',
    
    // Array/Object types
    'array': 'text-pink-600',
    'object': 'text-pink-600',
    'json': 'text-pink-600',
    
    // Binary types
    'binary': 'text-orange-600',
    'blob': 'text-orange-600',
    
    // UUID/ID types
    'uuid': 'text-cyan-600',
    'id': 'text-cyan-600',
    
    // Default
    'default': 'text-gray-600'
  };

  const normalizedType = type.toLowerCase();
  return typeColor[normalizedType]  || typeColor.default;
};

export function DatabaseSchemaNode({
  data,
  selected,
}: NodeProps<DatabaseSchemaNode>) {
  return (
    <BaseNode className="p-0 bg-zinc-800 min-w-[200px]" selected={selected}>
      <h2 className="rounded-tl-md rounded-tr-md bg-zinc-900 p-2 text-center text-sm text-blue-400 font-bold">
        {data.label}
      </h2>
      <div className="grid">
        {data.schema.map((entry) => (
          <div 
            key={entry.title}
            className="relative grid grid-cols-2 text-sm bg-neutral-800 hover:bg-neutral-900"
          >
            <div className="relative py-3 pl-0 font-mono">
              <LabeledHandle
                id={entry.title}
                title={entry.title}
                type="target"
                position={Position.Left}
                labelClassName="text-zinc-300/90"
              />
            </div>
            <div className="relative py-3 pr-0 text-right font-mono">
              <LabeledHandle
                id={entry.title}
                title={entry.type}
                type="source"
                position={Position.Right}
                className="p-0 text-blue-400"
                handleClassName="p-0"
                labelClassName={`p-0 font-bold ${getTypeColor(entry.type)}`}
              />
            </div>
          </div>
        ))}
      </div>
    </BaseNode>
  );
}