import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./PostAPI";

type Data = {
    message:String
}

export default async function handler(req:NextApiRequest,res:NextApiResponse<Data>){
    if(req.method === "POST") {
        const {commentInput,id} = req.body
        await prisma.comment.create({
            data:{
                comment:commentInput,
                postId:id, 
                createdAt:new Date()
            }
        }).then(()=> {
            res.status(200).json({message:'Comment Post sucessfully.'})
        }).catch(e=> {
            console.log(e);
            res.status(500).json({message:'Something went wrong.'})

        })
    }
}