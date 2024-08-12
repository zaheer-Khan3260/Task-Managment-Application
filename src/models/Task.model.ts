import mongoose, {Schema, Document, mongo} from "mongoose";
import { UserSchema } from "./User.model";

export interface TaskSchema extends Document{
    content: string;
    priority: Number;
    assignTo: string;
    completionTime: Date;
    owner: UserSchema;
    isCompleted: boolean;
}

const taskSchema: Schema<TaskSchema> = new Schema({
    content: {
        type: String, 
        required: true
    },
    priority: {
        type: Number, 
        required: true
    },
    assignTo: {
        type: String, 
        required: true
    },
    completionTime: {
        type: Date, 
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    isCompleted: {
        type: Boolean, 
        default: false
    }
})

const Task = (mongoose.models.Task as mongoose.Model<TaskSchema>) 
|| mongoose.model<TaskSchema>("Task", taskSchema)

export default Task;