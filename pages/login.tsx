import Link from "next/link";
import { useEffect, useState } from "react"
import prisma from "./api/PostAPI"
 


const login = () => {
    const [nameInput,setNameInput] = useState('')
    const [emailInput , setEmailInput] = useState('');
    const createUser = async () => {
    const response = await fetch('/api/createUser',{
        method:'POST',
        body:JSON.stringify({nameInput,emailInput}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const {message} = await response.json()
    alert(message)
   
    
}
  return (
    <div className="w-[80%] mx-auto flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl font-semibold my-4">Create an Author ⚡⚡</h1>
        <div className="flex  w-[50%] space-x-4 mt-4 items-center">
            <label className="text-lg font-semibold">Name</label>
            <input type = "text" value = {nameInput} onChange={(e)=>setNameInput(e.target.value)} placeholder="Name of the Author" className="p-2 flex-1 bg-gray-200 outline-none
             rounded-sm" />
        </div>
        <div className="flex  w-[50%] space-x-4 mt-4 items-center">
            <label className="text-lg font-semibold">Email</label>
            <input type = "email" value = {emailInput} onChange={(e)=>setEmailInput(e.target.value)} placeholder="E-mail of the Author" className="p-2 flex-1 bg-gray-200 outline-none
             rounded-sm" />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-md mt-4 w-[50%] hover:bg-blue-400 cursor-pointer" onClick = {createUser}>Create Author</button>
        <Link href= '/'><button  className="bg-gray-800 text-white p-2 rounded-md mt-4 w-[50%] hover:bg-gray-600 cursor-pointer" >Go Back</button></Link>

    </div>
  )
}

export default login