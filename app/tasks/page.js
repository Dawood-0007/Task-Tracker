"use client";
import React from "react";
import TaskComponent from "@/components/TaskComponent";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const Task = () => {
  const { user } = useUser();

  if (!user) {
    return <p className="text-center text-2xl font-bold mt-32">Loading ...</p>
  }

  const [task, setTask] = useState([]);
  const [relaod, setReload] = useState(true);

  const handleLoad = async () => {
    setReload((prev) => !prev);
  };


  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`/api/backend?userId=${user.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTask(result);
      })
      .catch((error) => console.error(error));
    
  }, [relaod]);

  return (
    <div>
  <h1 className="text-2xl md:text-3xl mt-6 md:mt-10 text-center px-2">
    All your <span className="text-gray-500">tasks</span> in one place
  </h1>

  <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-4 md:mt-6">
    <Link href={"/addtask"}>
      <button className="rounded-full border cursor-pointer bg-gray-400 font-semibold text-white p-2 hover:text-gray-500 hover:bg-white hover:border-gray-400 px-4 w-40 text-sm md:text-base">
        Add Task
      </button>
    </Link>
    <Link href={"/completed-tasks"}>
      <button className="rounded-full border cursor-pointer bg-gray-400 font-semibold text-white p-2 hover:text-gray-500 hover:bg-white hover:border-gray-400 px-4 w-52 text-sm md:text-base text-center">
        See all completed Tasks
      </button>
    </Link>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 p-4">
    {task.length > 0 ? (
      task.map((item, index) => (
        <TaskComponent
          id={item?.taskId}
          key={index}
          title={item?.title}
          dateOfCreation={item.createdAt.split("T")[0]}
          description={item?.description}
          Load={handleLoad}
          status={item?.status}
        />
      ))
    ) : (
      <p className="text-center text-gray-500 col-span-full">No task found</p>
    )}
  </div>
</div>
  );
};

export default Task;
