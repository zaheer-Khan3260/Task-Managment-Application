import mongoose, {Schema, Document} from "mongoose";
import jwt from "jsonwebtoken"

export interface User extends Document{
    fullName: string;
    email: string;
    password: string;
    useFor: string; 
    sector?: string;
    refreshToken?: string;
    isVerified: boolean;
    varifyCode: string;
    varifyCodeExpiry: Date;
}

const userSchema: Schema<User> = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: [true, "Email is required"], 
        unique: true,
        match: [/.+\@.+\..+/, "Enter a valid email address"]
    },
    password: {
        type: String, 
        required: [true, "Password is required"],
    },
    useFor: {
        type: String, 
        required: true
    },
    sector: {
        type: String, 
        required: true
    },
    refreshToken: {
        type: String, 
        default: null
    },
    isVerified: {
        type: Boolean, 
        default: false
    },
    varifyCode: {
        type: String, 
        default: null
    },
    varifyCodeExpiry: {
        type: Date, 
        default: null
    }
}, {timestamps: true})


 const User = (mongoose.models.User as mongoose.Model<User>)
 || mongoose.model<User>("User", userSchema)

 export default User;