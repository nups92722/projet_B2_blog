"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useFetch } from './gestionRequete/fetchHook'; // Importer le hook personnalisé

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

const PageAccueil = () => {
    const minPage = 1;
  // Etat pour gérer la page
  const [page, modifPage] = useState<number>(minPage);

  // Paramètres flexibles à envoyer à l'API
  const [params, modifParams] = useState({
    Page: page 
  });

  // Utilisation des hooks pour récupérer les articles
  const { donnees: Articles, chargement, erreur } = useFetch<Article[]>('/api/articles', params, 'POST');

  // Fonction pour gérer la modification de la page dans l'input
  const changeEtat = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nouvValeur = parseInt(event.target.value, 10); // convertir la valeur en nombre
    if (!isNaN(nouvValeur) && nouvValeur >= minPage) {
        modifPage(nouvValeur); // Mettre à jour l'état avec la nouvelle valeur
    }
  };

  // Fonction pour incrémenter la page
  const increment = () => {
    const nouvPage = page + 1;
    modifPage(nouvPage);
    modifParams(prev => ({ ...prev, Page: nouvPage })); // Mettre à jour les paramètres dynamiques
  };

  // Fonction pour décrémenter la page
  const decrement = () => {
    if (page > minPage) {
        const nouvPage = page - 1;
        modifPage(nouvPage);
        modifParams(prev => ({ ...prev, Page: nouvPage })); // Mettre à jour les paramètres dynamiques
    }
  };

  // Si les articles sont en cours de chargement
  if (chargement) {
    return <p>Chargement des articles...</p>;
  }

  // Si une erreur est survenue lors du chargement des articles
  if (erreur) {
    return <p>Erreur : {erreur}</p>;
  }

  return (
    <>
      <div>
        {Articles && Articles.length > 0 ? (
          Articles.map((article) => (
            <div key={article.id} style={{ marginBottom: '20px' }}>
              <h2>{article.titre}</h2>
              <Link href={`/article/${article.id}`}>
            Cliquez ici pour voir l'article {article.id}
            </Link>
            </div>
          ))
        ) : (
          <p>Aucun article disponible.</p>
        )}
      </div>

      <div>
        <input
          type="number"
          value={page}  // L'input est contrôlé par l'état
          onChange={changeEtat} // Mise à jour de l'état lors de la modification de l'input
        />
        <button onClick={increment}>Incrémenter</button>
        <button onClick={decrement}>Décrémenter</button>
        <p>Valeur actuelle : {page}</p>
      </div>
    </>
  );
};

export default PageAccueil;
