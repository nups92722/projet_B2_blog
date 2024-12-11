"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useFetch } from './../../gestionRequete/fetchHook';

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

interface Commentaire {
  mongodb_id?: string;
  articleId: string;
  auteurPseudo: string;
  contenu: string;
  date: string;
}

const ArticlePage = () => {
  const { id } = useParams();
  const [params] = useState({ id: id });
  const { donnees: article, chargement, erreur } = useFetch<Article>('/api/article', params, 'POST');

  const [nouveauCommentaire, setNouveauCommentaire] = useState('');
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);

  useEffect(() => {
    const chargerCommentaires = async () => {
      try {
        const response = await fetch(`/api/commentaire?articleId=${id}`);
        console.log("Réponse de l'API commentaires : ", response); 
        if (response.ok) {
          const data = await response.json();
          console.log("Données des commentaires : ", data); 
          setCommentaires(data);
        } else {
          console.error(`Erreur lors du chargement des commentaires : ${response.statusText}`);
        }
      } catch (error) {
        console.error("Erreur réseau lors du chargement des commentaires", error);
      }
    };
  
    if (id) {
      chargerCommentaires();
    }
  }, [id]);  

  const ajouterCommentaire = async () => {
    if (!nouveauCommentaire.trim()) return;
  
    try {
      const payload = {
        articleId: id,
        auteurPseudo: "Utilisateur Anonyme",
        contenu: nouveauCommentaire,
      };
  
      console.log("Payload envoyé : ", payload);
      const response = await fetch("/api/commentaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      console.log("Réponse de l'API ajout commentaire : ", response);
      if (response.ok) {
        const { commentaire } = await response.json();
        console.log("Commentaire ajouté : ", commentaire);
        setCommentaires([...commentaires, commentaire]);
        setNouveauCommentaire('');
      } else {
        console.error(`Erreur lors de l'ajout du commentaire : ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erreur réseau lors de l'ajout du commentaire", error);
    }
  };
  

  if (chargement) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800 text-white">
        <p className="text-lg">Chargement de l'article...</p>
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-800 text-white">
        <p className="text-lg">Erreur : {erreur}</p>
      </div>
    );
  }

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

      <div className="comments-section mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Commentaires</h2>

        {commentaires.length > 0 ? (
          <ul className="space-y-4">
            {commentaires.map((commentaire) => (
              <li key={commentaire.mongodb_id} className="p-4 bg-gray-700 rounded-lg shadow-md">
                <p className="text-sm text-gray-400">
                  <span className="font-bold">{commentaire.auteurPseudo}</span> - {new Date(commentaire.date).toLocaleString()}
                </p>
                <p className="text-lg">{commentaire.contenu}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Aucun commentaire pour cet article.</p>
        )}

        <div className="mt-6">
          <textarea
            value={nouveauCommentaire}
            onChange={(e) => setNouveauCommentaire(e.target.value)}
            placeholder="Écrivez votre commentaire..."
            className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={ajouterCommentaire}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Ajouter un commentaire
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
