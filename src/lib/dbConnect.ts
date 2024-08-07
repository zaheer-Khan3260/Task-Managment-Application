import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {}


export default async function dbConnect(): Promise<void> {
    if(connection.isConnected) {
        console.log("dbConnect");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '' , {})
        connection.isConnected = db.connections[0].readyState

        console.log("Database connected")
    } catch (error) {
        console.log("Database connection error", error)
        process.exit(1);
    }
}