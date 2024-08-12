import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team.model";


export async function POST(req: NextRequest){
    await dbConnect();
    const { teamName, members, department }  = await req.json();

    const userCookies = req.cookies.get('user')?.value
    const user = userCookies ? JSON.parse(userCookies) : null;

    if(!user){
        return NextResponse.json({
            success: false,
            message: 'User not authenticated'
        },
        {
            status: 401
        }
    )
    }

    const teamToken = generateTeamToken();

    const team = new Team({
        teamName,
        members,
        department,
        teamToken,
        createdBy: user.id
    })

    if(!team){
        return NextResponse.json({
            success: false,
            message: 'Failed to create team'
        },
        {
            status: 500
        }
    )
    }

    return NextResponse.json(
        {
            success: true,
            message: 'Team created successfully',
            teamData : team
        }, {
            status: 201
        }
    
    )


}


export function generateTeamToken(){
    let token = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
    "0123456789abcdefghijklmnopqrstuvwxyz";
    for (let index = 0; index < 11; index++) {
        let char = Math.floor(Math.random() * str.length + 1)
        token += str.charAt(char) 
    }
    return token
}