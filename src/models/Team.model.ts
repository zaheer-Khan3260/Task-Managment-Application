import mongoose, {Schema, Document} from "mongoose";
import { User } from "./User.model";

export interface Team extends Document{
    teamName: string;
    createdBy: User;
    members: User[];
    department: string;
    teamToken: string;
}


const teamSchema: Schema<Team> = new Schema(
    {
        teamName: { 
            type: String, 
            required: true
         },
        createdBy: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', required: true 
        },
        members: [
            { 
                type: Schema.Types.ObjectId, 
                ref: 'User' 
            }
        ],
        department: { 
            type: String, 
            required: true 
        },
        teamToken: { 
            type: String, 
            required: true 
        }
    },
    {
        timestamps: true,
    }
) 

const teamModel = (mongoose.models.Team as mongoose.Model<Team>)
|| mongoose.model<Team>("Team", teamSchema)

export default teamModel;