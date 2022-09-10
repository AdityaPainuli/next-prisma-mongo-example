import { UserIcon } from '@heroicons/react/24/solid'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import prisma from '../api/PostAPI'

type comment_type = {
    comment:string,
    id:string
}

const Post = (context:any) => {
    const router = useRouter()
    const {title,body,author,id,comments} = context
    const [commentInput,setCommentInput] = useState('');
   const sendComment = async() => {
    const response = await fetch('/api/createComments',{
        method:"POST",
        body:JSON.stringify({commentInput,id}),
        headers: {'Content-Type':'application/json'}
        
    }).then((res)=> {
        setCommentInput('')
        alert("Comment Added Sucessfully.")
    })
    .catch((e)=>{
        console.log(e)
        alert('Something went wrong')
        
    })
   }
  return (
    <div className='w-[90%] mx-auto my-4 p-2'>
        <Head>
            <title>{title}</title>
        </Head>
        <h1 className='font-bold text-6xl my-2'>{title}</h1>
        <p className='px-2  my-[4rem]'>{body}</p>
       <p className='text-right font-semibold text-gray-500 '>- By {author.name}</p>
       <div>
        <h1 className='text-xl font-semibold my-4'>Comments</h1>
        {comments.map((comment:comment_type) => (
            <div key = {comment.id} className='flex space-x-4 items-center p-2 bg-gray-100 rounded-sm my-2'>
                <UserIcon height={20} width={20}/>
                <div key={comment.id}>
                <p>{comment.comment}</p>
            </div>
            </div>
        ))}
        
        <textarea
              name="blog-content"
              id="blog-content"
              value = {commentInput}
              onChange = {(e)=>setCommentInput(e.target.value)}
              cols={80}
              placeholder="Post your thoughts and comments"
              className="w-full border resize-none border-gray-500 focus:border-blue-500 focus:border-2 rounded-sm outline-none py-2 px-4 h-[100px]"
            ></textarea>
             <button className='bg-gray-800 my-4 hover:bg-gray-600 text-white p-2 rounded-md' onClick = {sendComment}>Send Comment</button>
       </div>
       <Link href = "/" className='my-4'>
            <button className='bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-md'>Go back</button> 
       </Link>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export const getStaticProps = async (context:any) => {
   const {slug} = context.params
   
    const post = await prisma.posts.findUnique({
        where:{
            slug:String(slug)
        },
        include: {
            author:{
                select:{name:true}
            },
            comments: {
                select:{comment:true,id:true}
            }
        },
        
    })
    return {
        props:post
    }
}


export default Post