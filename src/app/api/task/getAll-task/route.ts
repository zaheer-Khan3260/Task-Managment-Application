import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task.model";

export async function GET(req: NextRequest){
    await dbConnect();
    const userId = req.url.split("=")[1]
    if(!userId){
        return NextResponse.json(
            {
                success: false,
                message: "User ID is required"
            }, 
            {
                status: 400
            }
        )
    }

    const tasks = await Task.find({owner: userId})
    if(tasks.length < 1){
    return NextResponse.json(
            {
                success: true,
                message: "No tasks found for this user"
            },
            {
                status: 200
            }
        )
    }

    return NextResponse.json(
        {
            success: true,
            message: "Tasks retrieved successfully",
            data: tasks
        },
        {
            status: 200
        }
    )
}