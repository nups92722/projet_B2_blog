'use client';

import { useState } from 'react';
import {useRouter} from "next/navigation"

const pageInscription = () => {
  const router = useRouter()
  const [donneeForm, modifDonneeForm] = useState({
    pseudo: '',
    nom: '',
    prenom: '',
    anniversaire: '',
    email: '',
    mdp: '',
    description: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const gestionModifDonneeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    modifDonneeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth/inscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donneeForm),
    });

    const data = await response.json();

    if (data.success) {
      setSuccessMessage('Inscription réussie !');
      modifDonneeForm({
        pseudo: '',
        nom: '',
        prenom: '',
        anniversaire: '',
        email: '',
        mdp: '',
        description: '',
      });
    } else {
      setError(data.message || 'Une erreur est survenue.');
    }
  };
  const redirectionConnexion = () => {
    router.push('/connexion');  // Redirige vers la page d'inscription
  };
  return (
    <>
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pseudo">Pseudo :</label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            value={donneeForm.pseudo}
            onChange={gestionModifDonneeForm}
            required
          />
        </div>
        <div>
          <label htmlFor="nom">Nom :</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={donneeForm.nom}
            onChange={gestionModifDonneeForm}
            required
          />
        </div>
        <div>
          <label htmlFor="prenom">Prénom :</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={donneeForm.prenom}
            onChange={gestionModifDonneeForm}
            required
          />
        </div>
        <div>
          <label htmlFor="anniversaire">Anniversaire :</label>
          <input
            type="date"
            id="anniversaire"
            name="anniversaire"
            value={donneeForm.anniversaire}
            onChange={gestionModifDonneeForm}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={donneeForm.email}
            onChange={gestionModifDonneeForm}
            required
          />
        </div>
        <div>
          <label htmlFor="mdp">Mot de passe :</label>
          <input
            type="password"
            id="mdp"
            name="mdp"
            value={donneeForm.mdp}
            onChange={gestionModifDonneeForm}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description (facultatif) :</label>
          <input
            id="description"
            name="description"
            value={donneeForm.description}
            onChange={gestionModifDonneeForm}
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
    <div>
    <p>deja inscrit? connecter vous ici</p>
    {/* Votre contenu ici */}
    <button onClick={redirectionConnexion}>Connexion</button>
  </div>
  </>
  );
};

export default pageInscription;
