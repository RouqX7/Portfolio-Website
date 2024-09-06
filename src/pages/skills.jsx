import React from "react";
import { LuBadgeCheck } from "react-icons/lu";

function Skills() {
  return (
    <div className="min-h-screen flex flex-col p-8">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gray-800 text-center">Skills</h1>
      <h2 className="text-md mt-2 text-gray-600 text-center">My technical level</h2>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="flex flex-row space-x-32">
          {/* First Skill Box */}
          <div className=" h-96 w-72 rounded-md shadow-md p-4 bg-white">
            <div className="text-center text-xl mt-2">Frontend Developer</div>

            <div className="h-5/6 mt-7 w-full flex justify-between px-4">
              {/* First White Box */}
              <div className="w-1/2 bg-white rounded-md p-4">
                <div className="w-full h-auto text-gray-600 text-center flex flex-col items-center font-medium">
                  <div className="flex items-center">
                    <LuBadgeCheck className="mr-2" />
                    <p>React</p>
                  </div>
                  <p>Advanced</p>
                </div>
              </div>

              {/* Second White Box */}
              <div className="w-1/2 bg-white rounded-md p-4">
                <div className="w-full h-auto text-gray-600 text-center flex flex-col items-center font-medium">
                  <div className="flex items-center">
                    <LuBadgeCheck className="mr-2" />
                    <p>Vue</p>
                  </div>
                  <p>Intermediate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Second Skill Box */}
          <div className="bg-white h-96 w-72 rounded-md shadow-md p-4">
            <div className="text-center text-xl mt-2">Backend Developer</div>

            <div className="h-5/6 mt-7 w-full flex justify-between px-4">
              {/* First White Box */}
              <div className="w-1/2 bg-white rounded-md p-4">
                <div className="w-full h-auto text-gray-600 text-center flex flex-col items-center font-medium">
                  <div className="flex items-center">
                    <LuBadgeCheck className="mr-2" />
                    <p>Node.js</p>
                  </div>
                  <p>Advanced</p>
                </div>
              </div>

              {/* Second White Box */}
              <div className="w-1/2 bg-white rounded-md p-4">
                <div className="w-full h-auto text-gray-600 text-center flex flex-col items-center font-medium">
                  <div className="flex items-center">
                    <LuBadgeCheck className="mr-2" />
                    <p>Python</p>
                  </div>
                  <p>Advanced</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
