import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task.model";

export async function POST(req: NextRequest) {
    await dbConnect()

    const { content, priority, assignTo,
         completionTime, isCompleted} = await req.json()
    
    const userCookies = req.cookies.get('user')?.value
    const user = userCookies ? JSON.parse(userCookies) : null;

    if (!user) {
        return NextResponse.json(
            {
                success: false,
                message: 'User not authenticated'
            },
            {
                status: 401
            }
        )
    }

    console.log("userdata: ", user);
    

    const task = new Task({
        content,
        priority,
        assignTo,
        completionTime,
        isCompleted,
        owner: user.id
    })
    await task.save()
    if(!task){
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to create task'
            },
            {
                status: 500
            }
        )
    }

    return NextResponse.json(
        {
            success: true,
            message: 'Task created successfully',
            data: task
        },
        {
            status: 201
        }
    )

}