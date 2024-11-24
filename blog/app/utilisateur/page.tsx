// app/utilisateur/page.tsx

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Créez une instance de Prisma Client
const prisma = new PrismaClient();

export async function GET() {
  // Utilisation d'un email fixe
  const email = "criviere@example.com";

  try {
    // Chercher l'utilisateur avec cet email dans la base de données
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { email },
    });

    // Si l'utilisateur est trouvé, retourner ses données
    if (utilisateur) {
      return NextResponse.json(utilisateur);
    } else {
      // Si l'utilisateur n'est pas trouvé
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
    }
  } catch (error) {
    // En cas d'erreur serveur
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
