import { prisma } from '@/db/prisma';

export async function POST(req: Request) {
  try {
    // Lire le corps de la requête et vérifier si l'ID est présent
    const body = await req.json();
    console.log("frite")
    console.log("frite")
    console.log("frite")
    console.log("frite")
    console.log("frite")
    console.log("frite")
    console.log(body)
    if (!body || !body.id) {
      return Response.json({ message: 'ID manquant dans la requête.' }, { status: 400 });
    }

    const { id } = body;

    // Effectuer la requête Prisma
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) }, // S'assurer que l'ID est un entier
    });

    if (!article) {
      return Response.json({ message: 'Article non trouvé.' }, { status: 404 });
    }

    return Response.json(article);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article :', error);
    return Response.json({ message: 'Erreur interne du serveur' }, { status: 500 });
  } finally {
    console.log('Fin de la fonction POST.');
  }
}
