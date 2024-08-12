import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task.model";

export async function POST(req: NextRequest){
    await dbConnect();
    const { content, completionTime,
        assignTo, priority, _id, isCompleted } = await req.json()
    
    const taskData = await Task.findById(_id);
    if(!taskData){
        return NextResponse.json(
            { success: false, message: "Task not found "}, {status: 404}
        )
    }
    const updatedTask = await Task.findByIdAndUpdate(taskData._id, {
        content: content ? content : taskData.content,
        completionTime: completionTime? completionTime : taskData.completionTime,
        assignTo: assignTo? assignTo : taskData.assignTo,
        priority: priority? priority : taskData.priority,
        isCompleted: isCompleted ? isCompleted : taskData.isCompleted
    },
    {
        new: true,
    })

    if(!updatedTask){
        return NextResponse.json(
            { success: false, message: "Failed to update task"}, {status: 500}
        )
    }

    return NextResponse.json(
        {
            success: true,
            message: "Task Updated successfully",
            task: updatedTask
        },
        {
            status:200
        }
        )
}