import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    summary:
      "This repository appears to manage an e-commerce platform with structured user, order, and product data.",
    tables: [
      {
        name: "Users",
        columns: [
          { name: "id", type: "uuid" },
          { name: "email", type: "string" },
          { name: "created_at", type: "timestamp" },
          { name: "role", type: "string" }
        ]
      }
    ],
    confidence: 0.91
  });
}