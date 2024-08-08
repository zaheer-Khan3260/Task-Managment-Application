import mongoose, {Schema, Document, mongo} from "mongoose";
import { User } from "./User.model";

export interface Task extends Document{
    content: string;
    priority: Number;
    assignTo: string;
    completionTime: Date;
    owner: User;
    isCompleted: boolean;
}

const taskSchema: Schema<Task> = new Schema({
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

const TaskModel = (mongoose.models.Task as mongoose.Model<Task>) 
|| mongoose.model<Task>("Task", taskSchema)

export default TaskModel;