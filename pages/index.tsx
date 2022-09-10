import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import prisma from './api/PostAPI'
import {UserPlusIcon} from '@heroicons/react/24/solid'

const Home: NextPage = ({posts}:any) => {
  return (
    <div className="w-[90%] mx-auto my-4 flex flex-col space-y-4">
      <Head>
        <title>Blog Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex  justify-between items-center '>
        <h1 className='text-4xl flex-1 mb-4 font-bold'>All Blogs</h1>
        <button className='bg-gray-800 rounded-sm cursor-pointer hover:bg-gray-700 text-white p-2 mr-4'>
          <Link href="/writtingblog">
          Create a blog
          </Link>
        </button>
        <Link href = "/login">
        <button className='bg-blue-500 text-white p-2 rounded-sm'>Create a Author</button>
        </Link>
      </div>
      {posts.map((post:any) => (
        <Link href="/post/[slug]" as={`/post/${post.slug}`} >
         <div key = {post.id} className='bg-gray-200 cursor-pointer hover:bg-gray-300 shadow-md rounded-md p-4'>
           <h1 className='text-2xl font-semibold my-2 uppercase'>{post.title}</h1>
          <p className="truncate h-[50px]">{post.body}</p>
         </div>
        </Link>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  const posts = await prisma.posts.findMany()
  

  return {
   props: {
    posts
   }
  }
}

export default Home
