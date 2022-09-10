import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { useState } from 'react'
import prisma from './api/PostAPI';

type Author_type = {
  email:String,
  name:String,
  id:any
}

const writtingblog = ({allAuthors}:any) => {
  const [ArticleHeading, SetArticleHeading] = useState("");
  const [ArticleBody, SetArticleBody] = useState("");
  const [slug,setSlug] = useState("");
  const [authorName,setAuthorName] = useState('');
  const handleBlogSumbit = async() => {
    const response = await fetch('/api/createBlog',{
        method:'POST',
        body:JSON.stringify({ArticleHeading,ArticleBody,slug,authorName}),
       headers:{
            'Content-Type':'application/json'
        }
    })
    const {message} = await response.json()
    alert(message)
    console.log(message)
  }
  return (
    <div className='w-[90%] mx-auto my-4 flex flex-col justify-center items-center'>
         <input
              type="text"
              className=" border-b border-black capitalize focus:border-b-2 focus:border-blue-500 w-full my-4 text-4xl outline-none"
              placeholder="Title of the Post "
              value={ArticleHeading}
              onChange={(e) => SetArticleHeading(e.target.value)}
            />
         <input
              type="text"
              className=" border-b border-black  focus:border-b-2 focus:border-blue-500 w-full my-4 text-lg outline-none"
              placeholder="slug for the post"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
         
  <div className="mb-3 w-full">
    <select onChange = {(e)=>setAuthorName(e.target.value)} className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
        <option selected>Open this select menu</option>
        {/* <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option> */}
        {
          allAuthors.map((author:Author_type,index:any) => (
            <option key = {index}  value = {author.id}>{author.name}</option>
          ))
        }
    </select>
</div>
            
            <textarea
              name="blog-content"
              id="blog-content"
              cols={80}
              value={ArticleBody}
              placeholder="Tell your story.."
              onChange={(e) => SetArticleBody(e.target.value)}
              className="w-full border resize-none border-gray-500 focus:border-blue-500 focus:border-2 rounded-sm outline-none py-2 px-4 h-[400px]"
            ></textarea>
            <button className='bg-blue-500 rounded-md cursor-pointer p-2 my-2 w-[60%]   text-white' onClick = {handleBlogSumbit}>Submit Blog</button>
            <Link href = "/">
            <button className='bg-gray-800 rounded-md cursor-pointer p-2 w-[60%]  text-white' >Go back</button>
   
            </Link>
             </div>
  )
}

export default writtingblog


export const getStaticProps:GetStaticProps = async() => {
  const allAuthors = await prisma.author.findMany()

  return {
    props:{
      allAuthors
    }
  }
}