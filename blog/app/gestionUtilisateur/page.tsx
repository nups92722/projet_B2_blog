"use client"; // C'est un composant côté client

import { useSession } from "next-auth/react";
import Link from "next/link";

const DashboardPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Gestion de l'utilisateur non authentifié
      throw new Error('Not authenticated!');
    },
  });

  return (
    <div>
      <h1>DashBoard Page</h1>
      <p>Hi {session?.user?.name}</p>
      <Link href="/logout">Logout Page</Link>
    </div>
  );
};

export default DashboardPage;
