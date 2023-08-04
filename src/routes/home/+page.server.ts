import {Actions, redirect, fail} from "@sveltejs/kit";
import {db} from "../../data/db";
import {todos, users} from "$data/schema";
import {eq} from "drizzle-orm";
import type {PageServerLoad} from './$types';
export const load: PageServerLoad = async ({parent})=>{
    const parentData = await parent()
    const user = parentData.user
    const todoList = await db.select().from(todos).where(eq(todos.authorId, user.id)).limit(10)

    return {
        todoList
    }
}

export const actions : Actions = {
    create : async ({request, cookies}) =>{
        const data = await request.formData()
        const email = cookies.get('email')
        if(!email){
            throw redirect(302, '/')
        }

        const find = await db.select().from(users).where(eq(users.email, email))
        const user = find[0]
        const contents = data.get('contents')?data.get('contents') as string: undefined
        if(!contents){
            return fail(400, {
                message:"내용을 입력해주세요"
            })
        }
        await db.insert(todos).values({
            contents,
            authorId:user.id
        }).catch((_)=>{
            return fail(400, {
                message: '실패요'
            })
        })
        return {
            success: true,
            message: "성공요"
        }
    },
    finish : async ({request}) => {
        const data = await request.formData()
        const id = data.get('id')?data.get('id') as number:undefined
        if(!id){
            return fail(400, {
                message:"오류발생"
            })
        }
        await db.update(todos).set({isDone: true}).where(eq(todos.id, id));
        return {
            success:true,
            message:"완료성공요"
        }

    }
}