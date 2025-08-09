"use client";
import React from "react";
import TaskComponent from "@/components/TaskComponent";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const Task = () => {
  const { user } = useUser();
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
    <div> c
      <h1 className="text-3xl mt-10 text-center">
        All your <span className="text-gray-500">tasks</span> in one place
      </h1>
      <div className="absolute left-[38%]">
        <Link href={"/addtask"}>
          <button className="rounded-full border cursor-pointer bg-gray-400 font-semibold text-white p-1 hover:text-gray-500 hover:bg-white hover:border-gray-400 px-4">
            Add Task
          </button>
        </Link>
        <Link href={"/completed-tasks"}>
          <button className="rounded-full border cursor-pointer bg-gray-400 font-semibold text-white p-1 hover:text-gray-500 hover:bg-white hover:border-gray-400 px-4">
            See all completed Tasks
          </button>
        </Link>
      </div>
       <div className='grid grid-cols-3 gap-4 mt-10 ml-3 p-4'>
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
        <p>No task found</p>
      )}
      </div>
      
    </div>
  );
};

export default Task;
