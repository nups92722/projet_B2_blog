'use client'; // C'est un composant côté client

import { useSession } from "next-auth/react";
import Link from "next/link";

const DashboardPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Gestion de l'utilisateur non authentifié
      throw new Error('Non authentifié!');
    },
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold mb-4">Page du Tableau de Bord</h1>

      <p className="text-xl mb-4">Bonjour {session?.user?.name}</p>

      {/* Lien pour se déconnecter */}
      <Link href="/logout" className="text-blue-400 hover:text-blue-600 transition duration-300 mt-8">
        Se déconnecter
      </Link>

      {/* Logo agrandi 6 fois, sous le lien "Se déconnecter" */}
      <div className="flex justify-center mt-8">
        <img
          src="/logo.png" // Logo dans le dossier public
          alt="Logo"
          className="w-96 h-96 object-contain" // 6 fois plus grand que la taille précédente
        />
      </div>
    </div>
  );
};

export default DashboardPage;
