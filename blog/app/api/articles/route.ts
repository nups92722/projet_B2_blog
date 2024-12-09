import { prisma } from '@/db/prisma';

export async function POST(req: Request) {
  try {
    console.log('Début de la requête pour récupérer les articles');
    let page = 1;
    let nbArticle = 20;
    let dateDebut = new Date();
    let dateFin = new Date(-8640000000000000);
    let passe = 0;
    // Exécution de la requête

    if (req) {
        const { Page, NbArticle, DateDebut, DateFin } = await req.json();

        if (NbArticle !== undefined) {
          nbArticle = NbArticle;
        }
        if (Page !== undefined) {
          page = Page;
        }
        if (DateDebut !== undefined) {
          dateDebut = new Date(DateDebut); // Convertir en objet Date si nécessaire
        }
        if (DateFin !== undefined) {
          dateFin = new Date(DateFin); // Convertir en objet Date si nécessaire
        }
      }
      passe = (page - 1) * nbArticle

    const articles = await prisma.article.findMany({
      // where: {
      //   date: {
      //     gte: dateDebut,  // Date >= startDate
      //     lte: dateFin,    // Date <= endDate
      //   },
      // },
      orderBy: {
        date: 'desc',  // Trier par date, décroissant
      },
      skip: passe,  // Commencer à l'article 6 (l'index commence à 0)
      take: nbArticle,  // Prendre 10 articles
    });

    console.log('Articles récupérés :', articles);

    // Retourner les données
    return Response.json(articles);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles :', error);
    return Response.json({ message: 'Erreur interne du serveur' }, { status: 500 });
  } finally {
    console.log('Fin de la fonction GET.');
  }
}
