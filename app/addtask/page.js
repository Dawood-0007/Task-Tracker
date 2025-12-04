"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const AddTask = () => {
    const { user } = useUser();

    if (!user) {
      return <p className="text-center text-2xl font-bold mt-32">Loading ...</p>
    }

    const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
    userId: user.id
  });

  const handleClick = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: JSON.stringify(task),
  redirect: "follow"
};

console.log(task)

fetch("/api/backend", requestOptions)
  .then((response) => response.text())
  .catch((error) => console.error(error));

  setTimeout(() => {
    setTask({ title: "", description: "", status: "pending", userId: user.id });
 }, 100);
  };

  return (
    <div>
      <h1 className="text-3xl mt-10 text-center">
        Add a new <span className="text-gray-500">task</span>
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-6">
        <Link href={"/tasks"}>
          <button className="rounded-full border cursor-pointer bg-gray-400 font-semibold text-white p-1 hover:text-gray-500 hover:bg-white hover:border-gray-400 px-4">
            See Pending Tasks
          </button>
        </Link>
      </div>
      <div className="flex flex-col justify-center shadow-xl rounded-lg p-4 mt-10">
        <input
          type="text"
          placeholder="Task Title"
          className="border p-2 rounded mb-4"
          value={task.title}
          onChange={(e) =>
            setTask((prevTask) => ({
              ...prevTask,
              title: e.target.value,
            }))
          }
        />
        <textarea
          rows="5"
          placeholder="Task Description"
          className="border p-2 rounded mb-4"
          value={task.description}
          onChange={(e) =>
            setTask((prevTask) => ({
              ...prevTask,
              description: e.target.value,
            }))
          }
        ></textarea>
        <button
          className="rounded-full border cursor-pointer bg-gray-400 font-semibold text-white p-1 hover:text-gray-500 hover:bg-white hover:border-gray-400 px-4"
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddTask;
