"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useFetch } from './../../gestionRequete/fetchHook'; // Importer le hook personnalisé

interface Article {
  id: number;
  titre: string;
  article: string;
  imageChemin: string | null;
  imageDescription: string | null;
  auteurId: number;
  auteurPseudo: string;
  date: string; // Changer en string ou Date selon la structure des données
}

const ArticlePage = () => {
  const { id } = useParams(); // Utilisation de useParams pour obtenir l'ID de l'URL
  const [params, setParams] = useState({
    id: id
  });
  // Ne pas faire la requête avant d'avoir l'ID
  const { donnees: article, chargement, erreur } = useFetch<Article>('/api/article', params, 'POST');

  // Si les articles sont en cours de chargement
  if (chargement) {
    return <p>Chargement de l'article...</p>;
  }

  // Si une erreur est survenue lors du chargement des articles
  if (erreur) {
    return <p>Erreur : {erreur}</p>;
  }

  // Si l'article n'est pas trouvé ou si l'ID n'est pas valide
  if (!article) {
    return (
      <div>
        <p>Aucun article trouvé.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{article.titre}</h1>
      <p>{article.article}</p>
      {/* Affichage de l'image si disponible */}
      {article.imageChemin && <img src={article.imageChemin} alt={article.imageDescription || 'Image de l\'article'} />}
      <p>Auteur : {article.auteurPseudo}</p>
      <p>Date de publication : {article.date}</p>
    </div>
  );
};

export default ArticlePage;
