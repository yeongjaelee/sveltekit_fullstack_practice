import type {Actions} from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import {users} from "$data/schema";
import {db} from "$data/db";
import {eq} from "drizzle-orm";


export const actions: Actions ={
    default: async ({request, cookies})=>{
        const data : FormData = await request.formData()
        const email : string|undefined = data.get('email')?data.get('email') as string: undefined
        const password : string|undefined = data.get('password')?data.get('password') as string: undefined
        if(!email){
            return fail(400, {message:"이메일을 입력해주세요"})
        }
        if(!password){
            return fail(400, {message:"비밀번호를 입력해주세요"})
        }
        const find = await db.select().from(users).where(eq(users.email, email)).where(eq(users.password, password)).limit(1)
        if(find.length===0){
            return fail(401, {message:'아이디와 비밀번호를 다시 확인해주세요'})
        }
        const user = find[0]

        cookies.set('email', user.email!)

        throw redirect(302, '/home')
    }
}