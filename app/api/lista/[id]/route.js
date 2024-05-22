import { NextResponse } from "next/server";

const apiURL = "http://localhost:3001/tasks";

export async function PUT(request, { params }) {
  try {
    const updatedTask = await request.json();
    const response = await fetch(`${apiURL}/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const task = await response.json();
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
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
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
}