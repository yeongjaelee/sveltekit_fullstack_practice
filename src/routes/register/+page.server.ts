import type {Actions} from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import {users} from "$data/schema";
import {db} from "$data/db";


export const actions: Actions ={
    default: async ({request})=>{
        const data : FormData = await request.formData()
        const email : string|undefined = data.get('email')?data.get('email') as string: undefined
        const password : string|undefined = data.get('password')?data.get('password') as string: undefined
        console.log('action')
        console.log(email)
        console.log(password)
        if(!email){
            return fail(400, {message:"이메일을 입력해주세요"})
        }
        if(!password){
            return fail(400, {message:"비밀번호를 입력해주세요"})
        }
        const user = await db.insert(users).values({
            email, password
        }).returning()
        if (user){
            throw redirect(302, '/home')
        } else{
            return {
                message:"회원가입에 실패하였습니다."
            }
        }

}
}