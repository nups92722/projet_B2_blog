"use client";

import Link from 'next/link';
import { useState } from 'react';
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
    Page: page,
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
    modifParams((prev) => ({ ...prev, Page: nouvPage })); // Mettre à jour les paramètres dynamiques
  };

  // Fonction pour décrémenter la page
  const decrement = () => {
    if (page > minPage) {
      const nouvPage = page - 1;
      modifPage(nouvPage);
      modifParams((prev) => ({ ...prev, Page: nouvPage })); // Mettre à jour les paramètres dynamiques
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {Articles && Articles.length > 0 ? (
          Articles.map((article) => (
            <div key={article.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{article.titre}</h2>
              <Link
                href={`/article/${article.id}`}
                className="text-blue-600 hover:underline font-medium"
              >
                Cliquez ici pour voir l'article {article.id}
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Aucun article disponible.</p>
        )}
      </div>

      <div className="mt-6 text-center">
        <div className="mb-4">
          <input
            type="number"
            value={page}
            onChange={changeEtat}
            className="border-gray-300 rounded-lg shadow-sm px-3 py-2 w-20 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-x-4">
          <button
            onClick={decrement}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            Page précédente
          </button>
          <button
            onClick={increment}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            Page suivante
          </button>
        </div>
        <p className="mt-4 text-gray-600">Page actuelle : {page}</p>
      </div>
    </div>
  );
};

export default PageAccueil;
