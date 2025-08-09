"use client"
import React from 'react'

const CompletedComponent = (props) => {
  const [task, setTask] = React.useState({id:props.id, title:props.title, description:props.description, status:props.status});


  const handleClick = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: JSON.stringify(task),
      redirect: "follow",
    };

 const response = await fetch("/api/backend", requestOptions);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    await response.json();
    props.Load();
  }

  return (
        <div className='flex flex-col justify-center shadow-xl rounded-lg p-4'>
            <h2 className='text-bold text-2xl mb-1'>Title: {props.title}</h2>
            <p>Task: {props.description}</p>
            <p>Created at: {props.dateOfCreation}</p>
            <p>Status : {props.status}</p>
            <button className='rounded-full border cursor-pointer bg-gray-400 font-semibold text-white p-1 hover:text-gray-500 hover:bg-white hover:border-gray-400' onClick={handleClick}>Delete from Completes</button>
        </div>
  )
}

export default CompletedComponent