import { NextResponse } from "next/server";

const apiURL = "http://localhost:3001/tasks";

export async function GET() {
  try {
    const response = await fetch(apiURL);
    const tasks = await response.json();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const newTask = await request.json();
    const response = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const task = await response.json();
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}
