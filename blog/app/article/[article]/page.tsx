import { prisma } from "../../../src/db/prisma";

export default async function Home() {
  const article = await prisma.article.findUnique({where: {id: 1}});

  return (
    <div>
      {article != null ? (
        <>
          <h1>{article.titre}</h1>
          <div>
            <p>article : {article.article}</p>
          </div>
          <div>
            <p>auteur : {article.utilisateur.pseudo}</p>
            <p>date publication : {article.date.toDateString()}</p>
          </div>
        </>
      ) : (
        <p>Aucun article disponible</p>
      )}
    </div>
  );
}