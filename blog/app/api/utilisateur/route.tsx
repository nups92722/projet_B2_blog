
import {prisma} from '@/src/db/prisma';

export async function POST(request:any) {

    try {
        const body = await request.json();
        const {authorId} = body;
        const utilisateur = await prisma.article.findUnique({where : {id : 1}})
        return Response.json(utilisateur);
    }
    catch(error) {
        return Response.json(error)
    }
}