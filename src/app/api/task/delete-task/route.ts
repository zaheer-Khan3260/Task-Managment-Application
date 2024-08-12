import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task.model";


export async function GET(req: NextRequest) {
  await dbConnect();

  const postId  = req.json()

  const deletePost = await Task.findByIdAndDelete(postId)

  if(!deletePost){
    return NextResponse.json(
        {
            success: false,
            message: "Post not found"
        },
        {
            status: 404,
        }
    )
  }
  return NextResponse.json({
    success: true,
    message: "Post deleted successfully"
  },
{
    status: 200,
  
})
  
}
