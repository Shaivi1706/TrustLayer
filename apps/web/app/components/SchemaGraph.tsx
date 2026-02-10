"use client";

import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

type Column = {
  name: string;
  type: string;
};

type Table = {
  name: string;
  columns: Column[];
};

type Relationship = {
  from: string;
  to: string;
};

export default function SchemaGraph({
  tables,
}: {
  tables: Table[];
}) {

  // Auto-generate nodes horizontally
  const nodes = tables.map((table, index) => ({
    id: table.name,
    position: { x: index * 250, y: 100 },
    data: {
      label: (
        <div className="bg-zinc-800 text-white px-4 py-2 rounded-xl shadow-lg border border-zinc-700">
          {table.name}
        </div>
      ),
    },
  }));

  // FAKE relationships for now (replace later with backend)
  const edges =
    tables.length > 1
      ? tables.slice(1).map((table, i) => ({
          id: `${tables[i].name}-${table.name}`,
          source: tables[i].name,
          target: table.name,
          animated: true,
        }))
      : [];

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 h-100">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Schema Relationship Graph
      </h2>

      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}