import dbConnect from "@/lib/dbConnect";


export async function POST(request: Request){
    await dbConnect()
    
    const { email, password } = await request.json()

    

}