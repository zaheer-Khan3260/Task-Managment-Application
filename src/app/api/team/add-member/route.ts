import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team.model";

export async function POST(req: NextRequest){
    await dbConnect();
    
    const { userId, teamToken} = await req.json()
    
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
    const updatedMembers = team.members.push(userId);
    const updatedteam = Team.findByIdAndUpdate(team._id, {
        members: updatedMembers,
    },
    {
        new: true,
    }
    )

    if(!updatedteam) {
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
            team: updatedteam
        },
        {
            status: 200
        }
    )
}