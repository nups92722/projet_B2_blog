import { prisma } from "../src/db/prisma";

export default async function Home() {
  // Récupérer tous les utilisateurs
  const allArticles = await prisma.article.findMany({orderBy: {date: 'desc'}});

  return (
    <div>
      <h1>Les Articles les plus récent</h1>
      <ul>
        {allArticles.map((article) => (
          <li key={article.id}>
            <div>
              <p>titre : {article.titre}</p>
            </div>
            <div>
              <p>auteur : {article.utilisateur.pseudo}</p>
              <p>date publication : {article.date.toDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}