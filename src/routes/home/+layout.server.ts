import type {LayoutServerLoad} from './$types'
import {db} from "../../data/db";
import {users} from "$data/schema";
import {eq} from "drizzle-orm";
import {redirect} from '@sveltejs/kit'
export const load : LayoutServerLoad = async ({cookies}) =>{
    const email : string | undefined = cookies.get('email');
    if(!email){
        throw redirect(302, '/')
    }
    const find = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if(find.length===0){
        throw redirect(302, '/')
    }
    const user = find[0]

    return{
        user
    }

}