import mongoose from "mongoose";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    const tasks = await Task.find({ status: "Completed", userId: userId }).sort({ createdAt: -1 });
    if (!tasks) {
      return NextResponse.json({ error: "No tasks found" }, { status: 404 });
    }
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  } finally {
    mongoose.connection.close();
  }
}
