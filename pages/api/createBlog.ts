
import { Posts } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from './PostAPI'

type Data = {
  message:String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {ArticleHeading,ArticleBody,slug,authorName} = req.body
   
  
  if(req.method === 'POST') {

    await prisma.posts.create({
    data:{
      slug:slug,
      title:ArticleHeading,
      body:ArticleBody,
      authorId:authorName
    }
   }).then(()=> {
     res.status(200).json({message:'Blog is created'})
   }).catch((e)=> {
      console.log(e);
      res.json({message:e })
   })
  }
}
