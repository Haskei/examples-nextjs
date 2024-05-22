import { NextResponse } from "next/server";

const apiURL = "http://localhost:3002/lista";

export async function PUT(request, { params }) {
  try {
    const update_item = await request.json();
    const response = await fetch(`${apiURL}/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update_item),
    });
    const item = await response.json();
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: "Falha no update" },
      { status: 500 },
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    await fetch(`${apiURL}/${params.id}`, { method: "DELETE" });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao deletar" },
      { status: 500 },
    );
  }
}