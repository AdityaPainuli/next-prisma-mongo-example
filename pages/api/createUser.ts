import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from './PostAPI'

type Data = {
  message:string
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === 'POST') {
    const {nameInput,emailInput} = req.body
    console.log(req.body)
    prisma.author.create({
        data:{
            name:nameInput,
            email:emailInput
        }
    }).then(()=> {
        res.status(200).json({message:"User Created"})
       
    }).catch(e=>{
        console.log(e)
        res.status(500).json({message:"Something went wrong"})
        
    })
  }
}
