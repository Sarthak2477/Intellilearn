import { Node, NodeProps, Position } from "@xyflow/react";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import { BaseNode } from "@/components/base-node";
import { LabeledHandle } from "@/components/labeled-handle";

type DatabaseSchemaNode = Node<{
  label: string;
  schema: { title: string; type: string }[];
}>;

export function DatabaseSchemaNode({
  data,
  selected,
}: NodeProps<DatabaseSchemaNode>) {
  return (
    <BaseNode className="p-0 bg-zinc-800" selected={selected}>
      <h2 className="rounded-tl-md rounded-tr-md bg-zinc-900 p-2 text-center text-sm text-blue-400 font-bold">
        {data.label}
      </h2>
      {/* shadcn Table cannot be used because of hardcoded overflow-auto */}
      <table className="border-none overflow-visible">
        <TableBody>
          {data.schema.map((entry) => (
            <TableRow key={entry.title} className="relative text-xs bg-neutral-800 hover:bg-neutral-900">
              <TableCell className="pl-0 pr-6 font-semibold ">
                <LabeledHandle
                  id={entry.title}
                  title={entry.title}
                  type="target"
                  position={Position.Left}
                  labelClassName="text-zinc-300/90"
                />
              </TableCell>
              <TableCell className="pr-0 text-right font-thin font-mono">
                <LabeledHandle
                  id={entry.title}
                  title={entry.type}
                  type="source"
                  position={Position.Right}
                  className="p-0"
                  handleClassName="p-0"
                  labelClassName="p-0 text-emerald-400 font-bold"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </table>
    </BaseNode>
  );
}
