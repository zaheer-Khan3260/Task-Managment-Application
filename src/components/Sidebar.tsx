'use client'

import React from 'react'
import { CgMathPlus } from "react-icons/cg";
import { CgHomeAlt } from "react-icons/cg";
import { BsChatLeft } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import Link from 'next/link';


const workspaceList = [
    {
        id: "1",
        name: "Personal Tasks",
    },
    {
        id: "2",
        name: "Managment Team",
    },
    {
        id: "3",
        name: "UI/UX Team",
    },
]

const OverviewList = [
    {
        id: "1",
        name: "Overview",
        image: <CgHomeAlt/>
    },
    {
        id: "2",
        name: "Team"
    },
    {
        id: "3",
        name: "Messages"
    },
]

function Sidebar() {
  return (
    <div className='w-[25rem] h-screen p-8 bg-[#1A1C22]'>
      {/* Header or Logo cont */}
      <div className='text-4xl font-semibold text-white'>
        Logo
      </div>
        {/* Overview Container */}

        <div className='mt-14'>
        <div className='cursor-pointer'>
            <p className='text-[#444752] text-sm'>Overview</p>
        </div>
        <div className='mt-5 cursor-pointer'>
                <Link href={'/dashboard'}>
                <div id='Overview' className='flex items-center gap-2 text-[#63656D] hover:bg-[#2A2C3C]
                 hover:text-white p-3 rounded-xl hover:scale-105 duration-300 text-lg'>
                    <CgHomeAlt className='mr-2 text-xl mb-1'/>
                    <label htmlFor='Overview'>Overview</label>
                </div>
                </Link>
                <Link href={"/dashboard/team"}>
                <div id='Team' className='flex items-center gap-2 text-[#63656D] hover:bg-[#2A2C3C]
                 hover:text-white p-3 rounded-xl hover:scale-105 duration-300 text-lg'>
                    <BsFillPeopleFill className='mr-2 text-xl mb-1'/>
                    <label htmlFor='Team'>Team</label>
                </div>
                </Link>
                <div id='Messages' className='flex items-center gap-2 text-[#63656D] hover:bg-[#2A2C3C]
                 hover:text-white p-3 rounded-xl hover:scale-105 duration-300 text-lg'>
                    <BsChatLeft className='mr-2 text-xl mb-1'/>
                    <label htmlFor='Messages'>Messages</label>
                </div>
          
        </div>
        </div>
      {/* workspace container */}
      <div className='mt-14'>
        <div className='flex justify-between items-center cursor-pointer'>
            <p className='text-[#444752] text-sm'>Workspace</p>
            <CgMathPlus />
        </div>
        {/* Workspace list */}
        <div className='mt-5 cursor-pointer'>
            {workspaceList.map(workspace => (
                <div key={workspace.id} className='flex items-center gap-2 text-[#63656D] hover:bg-[#2A2C3C]
                 hover:text-white p-3 rounded-xl hover:scale-105 duration-300'>
                    <div
                    className='w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
                    ></div>
                    <label htmlFor={workspace.id}>{workspace.name}</label>
                </div>
            ))}
        </div>

      </div>
    </div>
  )
}

export default Sidebar
