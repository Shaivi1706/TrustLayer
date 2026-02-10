"use client";

import { useState, useRef, useEffect } from "react";
import SchemaGraph from "./SchemaGraph";

export default function RepoConnect() {
  const [repo, setRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [expandedTable, setExpandedTable] = useState<string | null>(null);
  const logsEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

  const handleAnalyze = () => {
    if (!repo) return;

    setLoading(true);
    setResults(null);
    setLogs([]);

    const eventSource = new EventSource(
        `/api/analyze/stream?repoUrl=${encodeURIComponent(repo)}`
    );

    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "log") {
        setLogs((prev) => [...prev, data.message]);
        }

        if (data.type === "result") {
        setResults(data.payload);
        setLoading(false);
        eventSource.close();
        setRepo("");
        }
    };

    eventSource.onerror = () => {
        console.error("SSE connection failed");
        eventSource.close();
        setLoading(false);
    };
    };

  return (
    <div className="space-y-10 max-w-4xl">

      {/* CONNECT CARD */}
      <div className="bg-zinc-900 p-8 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">
          Connect GitHub Repository
        </h2>

        <input
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="Paste a public GitHub repository URL"
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 mb-4"
        />

        <button
          onClick={handleAnalyze}
          disabled={!repo || loading}
          className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Generate Data Dictionary"}
        </button>
      </div>

      {/* AGENT ACTIVITY */}
      {logs.length > 0 && (
        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h3 className="font-semibold mb-4">
            Agent Activity
          </h3>

          <div className="space-y-2 text-zinc-400">
            {logs.map((log, i) => (
              <p key={i} className={loading ? "animate-pulse" : ""}>
                {log}
              </p>
            ))}
          </div>
          <div ref={logsEndRef} />
        </div>
      )}

      {/* RESULTS */}
        {results &&  <SchemaGraph tables={results.tables} /> && (
        <div className="bg-zinc-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-2">
            Data Dictionary Generated
            </h2>

            <p className="text-zinc-400 mb-6">
            AI agents analyzed your codebase and inferred the following data model.
            </p>

            <p className="text-zinc-300 mb-8">
            {results.summary}
            </p>

            <div className="space-y-4">
            {results.tables.map((table:any) => {
                const isExpanded = expandedTable === table.name;

                return (
                <div
                    key={table.name}
                    onClick={() =>
                    setExpandedTable(isExpanded ? null : table.name)
                    }
                    className="bg-zinc-800 p-4 rounded-xl cursor-pointer hover:bg-zinc-700 transition"
                >
                    {/* HEADER */}
                    <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                        {table.name}
                    </h3>

                    <span className="text-zinc-400 text-sm">
                        {isExpanded ? "▲" : "▼"}
                    </span>
                    </div>

                    {/* EXPANDABLE COLUMNS */}
                    {isExpanded && (
                    <div className="mt-4 space-y-2">
                        {table.columns.map((col:any, i:any) => (
                        <div
                            key={col.name + i}
                            className="flex justify-between bg-zinc-900 px-3 py-2 rounded-md text-sm"
                        >
                            <span>{col.name}</span>
                            <span className="text-zinc-400">
                            {col.type}
                            </span>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                );
            })}
            </div>
        </div>
        )}
    </div>
  );
}