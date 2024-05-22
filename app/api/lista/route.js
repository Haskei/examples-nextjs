import { NextResponse } from "next/server";

const apiURL = "http://localhost:3001/lista";

export async function GET() {
  try {
    const response = await fetch(apiURL);
    const lista = await response.json();
    return NextResponse.json(lista);
  } catch (error) {
    return NextResponse.json({ error: "Falha no fetch" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const novo_item = await request.json();
    const response = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo_item),
    });
    const item = await response.json();
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao criar o item" },
      { status: 500 },
    );
  }
}
