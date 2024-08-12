import mongoose, {Schema, Document} from "mongoose";
import { UserSchema } from "./User.model";
export interface TeamSchema extends Document{
    teamName: string;
    createdBy: UserSchema;
    members: UserSchema[];
    department: string;
    teamToken: string;
}


const teamSchema: Schema<TeamSchema> = new Schema(
    {
        teamName: { 
            type: String, 
            required: true
         },
        createdBy: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        members: [
            { 
                type: Schema.Types.ObjectId, 
                ref: 'User',
                required: true

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

const Team = (mongoose.models.Team as mongoose.Model<TeamSchema>)
|| mongoose.model<TeamSchema>("Team", teamSchema)

export default Team;