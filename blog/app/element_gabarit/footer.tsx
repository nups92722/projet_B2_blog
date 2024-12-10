import Image from 'next/image';
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-5">
      <div className="footer-content flex flex-wrap justify-around items-start px-5 max-w-screen-xl mx-auto">
        
        {/* À propos */}
        <div className="footer-section m-5 flex-1 min-w-[300px]">
          <h2 className="text-xl mb-3 text-gray-200">À propos</h2>
          <p className="text-sm text-gray-400">
            Nous sommes une entreprise dédiée à fournir les meilleures solutions numériques. Notre mission est d'aider nos clients à réussir dans le monde en constante évolution d'aujourd'hui.
          </p>
        </div>

        {/* Contactez-nous */}
        <div className="footer-section m-5 flex-1 min-w-[300px]">
          <h2 className="text-xl mb-3 text-gray-200">Contactez-nous</h2>
          <ul className="list-none p-0">
            <li className="text-sm text-gray-400 mb-2">Email : contact@ncy.com</li>
            <li className="text-sm text-gray-400 mb-2">Téléphone : +33 6 33 09 59 51</li>
            <li className="text-sm text-gray-400">Adresse : 123 Rue de l'Innovation, Paris</li>
            <li className="text-sm text-gray-400 mb-2">Paypal : jerushenbabouche2004@gmail.com</li>
          </ul>
        </div>

        {/* Membre de l'équipe */}
        <div className="footer-section m-5 flex-1 min-w-[300px]">
          <h2 className="text-xl mb-3 text-gray-200">Membre de l'équipe</h2>
          <div className="team-member flex items-center">
            <Image
              src="/Yann-KRASINSKI.jpg"
              alt="Yann Krasinski - Développeur"
              className="rounded-full border-2 border-gray-300 mr-4"
              width={100}
              height={100}
            />
            <div className="text-left">
              <p className="team-name text-lg font-bold text-white">Yann Krasinski</p>
              <p className="team-role text-sm text-gray-400">Développeur Front-End</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom mt-5 text-sm text-gray-500 text-center">
        <p>&copy; 2024 NCY & CO. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
