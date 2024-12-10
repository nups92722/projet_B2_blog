"use client"
import React from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"

const Header: React.FC = () => {
  const { data: session } = useSession(); // Récupère l'état de la session
  const router = useRouter(); // Hook pour naviguer

  // Fonction pour gérer le bouton en fonction de l'état de la session
  const menuUtilisateur = () => {
    if (session) {
      // Si l'utilisateur est connecté, on le redirige vers le dashboard
      router.push("/gestionUtilisateur");
    } else {
      // Si l'utilisateur n'est pas connecté, on le redirige vers la page de login
      router.push("/connexion");
    }
  };

  return (
    <header className="flex justify-center items-center bg-gray-800 py-2 px-5 text-white">
      <div className="flex items-center w-full max-w-screen-xl justify-between">
        
        <div className="logo">
          {/* Logo agrandi 2x */}
          <img src="logo.png" alt="Logo" className="h-24 w-auto" /> {/* Taille 2x */}
        </div>

        <div className="site-title text-xl mx-5 flex-grow text-center">
          NCY & CO
        </div>

        <nav className="flex-grow">
          <ul className="list-none m-0 p-0 flex justify-center">

            {/* Menu Item 1: Articles Récents */}
            <li className="relative mx-4 group">
              <a href="#" className="block px-4 py-2 transition duration-300 ease-in-out bg-transparent hover:bg-gray-600">Articles Récents</a>
              
              <ul className="submenu absolute top-full left-0 bg-gray-700 list-none m-0 p-0 min-w-[150px] z-10 hidden group-hover:block">
                <li><a href="/blog/article-1" className="block px-4 py-2 transition duration-300 ease-in-out bg-transparent hover:bg-gray-600">Article 1</a></li>
                <li><a href="/blog/article-2" className="block px-4 py-2 transition duration-300 ease-in-out bg-transparent hover:bg-gray-600">Article 2</a></li>
                <li><a href="/blog/article-3" className="block px-4 py-2 transition duration-300 ease-in-out bg-transparent hover:bg-gray-600">Article 3</a></li>
              </ul>
            </li>
            
            <li className="mx-4">
              <a href="/" className="block px-4 py-2 transition duration-300 ease-in-out bg-transparent hover:bg-gray-600">Accueil</a>
            </li>

            {/* Menu Item 3: Catégories */}
            <li className="relative mx-4 group">
              <a href="#" className="block px-4 py-2 transition duration-300 ease-in-out bg-transparent hover:bg-gray-600">Catégories</a>
              
              <ul className="submenu absolute top-full left-0 bg-gray-700 list-none m-0 p-0 min-w-[150px] z-10 hidden group-hover:block">
                <li><a href="/blog/category/webdev" className="block px-4 py-2 transition duration-300 ease-in-out bg-transparent hover:bg-gray-600">Développement Web</a></li>
                <li><a href="/blog/category/design" className="block px-4 py-2 transition duration-300 ease-in-out bg-transparent hover:bg-gray-600">Design</a></li>
                <li><a href="/blog/category/marketing" className="block px-4 py-2 transition duration-300 ease-in-out bg-transparent hover:bg-gray-600">Marketing</a></li>
              </ul>
            </li>
          </ul>
        </nav>

        <div className="login">
          <button onClick={menuUtilisateur} className="bg-blue-500 text-white py-2 px-4 text-lg rounded transition duration-300 ease-in-out hover:bg-blue-700">
            {session ? `Bonjour, ${session.user?.name}` // Affiche le nom de l'utilisateur s'il est connecté
            : "Se connecter" // Affiche "Se connecter" s'il n'est pas connecté
            }
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
