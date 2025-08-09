import mongoose from "mongoose";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    await mongoose.connect(process.env.MONGODB_URI);
    const tasks = await Task.find({ status: "pending", userId: userId }).sort({ createdAt: -1 });
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

export async function POST(request) {
  try {
    const { title, description, status, userId } = await request.json();
    console.log("Creating task for user:", userId);
    await mongoose.connect(process.env.MONGODB_URI);

    const lastTask = await Task.findOne().sort({ taskId: -1 });
    const nextId = lastTask ? (lastTask.taskId || 0) + 1 : 1;


    const newTask = new Task({
      title,
      description,
      status,
      taskId: nextId,
      userId
    });

    await newTask.save();
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  } finally {
    mongoose.connection.close();
  }
}

export async function PUT(request) {
  try {
    const { id, title, description, status, userId } = await request.json();
    await mongoose.connect(process.env.MONGODB_URI);
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, userId },
      { new: true }
    );
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  } finally {
    mongoose.connection.close();
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    console.log("Deleting task with ID:", id);
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    await Task.findOneAndDelete({ taskId: id });
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  } finally {
    mongoose.connection.close();
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json();
    await mongoose.connect(process.env.MONGODB_URI);

    const updatedTask = await Task.findOneAndUpdate(
      { taskId: id },
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task status:", error);
    return NextResponse.json({ error: "Failed to update task status" }, { status: 500 });
  } finally {
    mongoose.connection.close();
  }
}
// Compare this snippet from task-tracker/app/api/backend/route.js: