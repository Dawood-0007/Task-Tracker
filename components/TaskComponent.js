"use client"
import React from 'react'
import { useState } from 'react'

const TaskComponent = (props) => {
  const [task, setTask] = useState({id:props.id, title:props.title, description:props.description, status:"Completed"});

  const handleClick = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(task),
      redirect: "follow",
    };

    fetch("/api/backend", requestOptions)
      .then((response) => response.json()) 
      .catch((error) => console.error(error));

    
    props.Load();
  }

  return (
       
        <div className='flex flex-col justify-center shadow-xl rounded-lg p-4'>
            <h2 className='text-bold text-3xl mb-1'>{props.title}</h2>
            <p className='mb-2'>{props.description}</p>
            <p className='mb-1'>Created at: {props.dateOfCreation}</p>
            <button className='rounded-full border cursor-pointer bg-gray-400 font-semibold text-white p-1 hover:text-gray-500 hover:bg-white hover:border-gray-400' onClick={handleClick}>Mark as Completed</button>
        </div>
  )
}

export default TaskComponent;