import React from "react";

const page = () => {
  return (
    <div className="p-5 ">
      <h1 className="text-2xl font-bold ">Task Tracker App</h1>
      <p className="mt-4 mb-4">
        This is a simple task tracker app to help you manage your tasks
        efficiently. You can add, view, and track the status of your tasks with
        ease.
      </p>

      <p>
        For any inquiries or support, please contact us at:
        <a
          href="mailto:dawoodqasim0007@gmail.com"
          class="text-blue-600 underline hover:text-blue-800"
        >
          dawoodqasim0007@gmail.com
        </a>
      </p>
    </div>
  );
};

export default page;
