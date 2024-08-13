import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team.model";
import mongoose from "mongoose";

export async function POST(req: NextRequest){
    await dbConnect();
    
    const { userId, teamToken} = await req.json()

    const userObjectId = new mongoose.Types.ObjectId(userId);
    
    const team = await Team.findOne({ teamToken });
    if(!team) {
        return NextResponse.json(
            {
                success: false,
                message: "Invalid team token"
            },
            {
                status: 401
            }
        )
    }
    
    const updatedTeam = await Team.findByIdAndUpdate(team._id, 
        { 
            members: [...team.members, userObjectId]
        }, 
        { new: true }
    ).populate("members")

    if(!updatedTeam) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to update team members"
            },
            {
                status: 500
            }
        )
    }
    return NextResponse.json(
        {
            success: true,
            message: "Team member added successfully",
            team: updatedTeam
        },
        {
            status: 200
        }
    )
}