import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="flex flex-col justify-center p-12 lg:min-h-[90vh]">
        <h1 className="text-4xl font-bold text-center">
        This app is to Manage your <span className="text-gray-500">tasks.</span> 
      </h1>
      <p className="text-center">Simple and Secure</p>
      </div>
      <div className="flex justify-center items-center lg:height-[90vh] ">
        <Image
          src="/locked.svg"
          alt="Task Tracker"
          width={300}
          height={300}
          className="mb-10"
          />
      </div>
    </div>
  );
}
