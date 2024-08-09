import { Task } from "@/models/Task.model";
import { Team } from "@/models/Team.model";
import { User } from "@/models/User.model";

export interface ApiResponse{
    success: boolean;
    message: string;
    userData?: Array<User>;
    tasks?: Array<Task>;
    team?: Array<Team>;
}