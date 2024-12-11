import { prisma } from '@/db/prisma';

export async function GET(req: Request) {
  try {
    console.log('Début de la requête pour récupérer les commentaires');

    // Récupération des paramètres de requête
    const url = new URL(req.url);
    const articleId = url.searchParams.get('articleId');

    if (!articleId) {
      return Response.json({ message: 'L\'ID de l\'article est requis' }, { status: 400 });
    }

    // Récupération des commentaires pour l'article
    const commentaires = await prisma.commentaire.findMany({
      where: { articleId: parseInt(articleId) },
      orderBy: { date: 'desc' }, // Trier les commentaires par date décroissante
      include: {
        article: true, // Inclure les détails de l'article associé si nécessaire
      },
    });

    console.log('Commentaires récupérés :', commentaires);

    // Retourner les commentaires
    return Response.json(commentaires);
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires :', error);
    return Response.json({ message: 'Erreur interne du serveur' }, { status: 500 });
  } finally {
    console.log('Fin de la fonction GET.');
  }
}

export async function POST(req: Request) {
  try {
    console.log('Début de la requête pour ajouter un commentaire');

    const { articleId, auteurPseudo, contenu } = await req.json();

    // Validation des données
    if (!articleId || !auteurPseudo || !contenu) {
      return Response.json({ message: 'Données incomplètes' }, { status: 400 });
    }

    // Création du commentaire
    const nouveauCommentaire = await prisma.commentaire.create({
      data: {
        articleId: parseInt(articleId),
        auteurPseudo,
        contenu,
        date: new Date(),
      },
      include: {
        article: true, // Inclure les détails de l'article associé si nécessaire
      },
    });

    console.log('Commentaire ajouté :', nouveauCommentaire);

    // Retourner le commentaire créé
    return Response.json({ message: 'Commentaire ajouté', commentaire: nouveauCommentaire });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire :', error);
    return Response.json({ message: 'Erreur interne du serveur' }, { status: 500 });
  } finally {
    console.log('Fin de la fonction POST.');
  }
}
