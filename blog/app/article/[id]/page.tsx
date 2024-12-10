'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useFetch } from './../../gestionRequete/fetchHook'; // Assurez-vous que ce hook personnalisé est bien en place

interface Article {
  id: number;
  titre: string;
  article: string;
  imageChemin: string | null;
  imageDescription: string | null;
  auteurId: number;
  auteurPseudo: string;
  date: string;
}

const ArticlePage = () => {
  const { id } = useParams(); // Utilisation de useParams pour obtenir l'ID de l'URL
  const [params, setParams] = useState({
    id: id
  });

  const { donnees: article, chargement, erreur } = useFetch<Article>('/api/article', params, 'POST');

  // Si les articles sont en cours de chargement
  if (chargement) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800 text-white">
        <p className="text-lg">Chargement de l'article...</p>
      </div>
    );
  }

  // Si une erreur est survenue lors du chargement des articles
  if (erreur) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-800 text-white">
        <p className="text-lg">Erreur : {erreur}</p>
      </div>
    );
  }

  // Si l'article n'est pas trouvé ou si l'ID n'est pas valide
  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800 text-white">
        <p className="text-lg">Aucun article trouvé.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">{article.titre}</h1>

      <div className="article-content bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-4">{article.article}</p>

        {/* Affichage de l'image si disponible */}
        {article.imageChemin && (
          <div className="mb-6">
            <img
              src={article.imageChemin}
              alt={article.imageDescription || "Image de l'article"}
              className="w-full h-auto rounded-md shadow-lg"
            />
          </div>
        )}

        <div className="article-meta mt-6">
          <p className="text-sm text-gray-400">Auteur : {article.auteurPseudo}</p>
          <p className="text-sm text-gray-400">Date de publication : {article.date}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
