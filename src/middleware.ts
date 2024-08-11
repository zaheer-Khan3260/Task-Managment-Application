import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken"
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const baseURL = request.nextUrl.origin
    const verify = `${baseURL}/api/auth/verifyJwt`
    const token = request.cookies.get('aT')?.value

    const res = await axios.get(verify, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const response = NextResponse.next()
    
    response.cookies.set('user', JSON.stringify(res.data.user))
    return response
   
}
 
export const config = {
  matcher: [
    '/api/user/:path*'
  ]
}