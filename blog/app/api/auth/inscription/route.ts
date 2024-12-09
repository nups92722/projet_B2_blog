import { prisma } from "@/db/prisma"; // Assurez-vous que le chemin vers prisma est correct
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { pseudo, nom, prenom, anniversaire, email, mdp, description } = await req.json();
    
    // Vérifier si l'email ou le pseudo existe déjà
    const utilisateurExistant = await prisma.utilisateur.findFirst({
      where: {
        OR: [
          { email },
          { pseudo }
        ]
      }
    });

    if (utilisateurExistant) {
      return new Response(
        JSON.stringify({ success: false, message: "L'email ou le pseudo est déjà utilisé." }),
        { status: 400 }
      );
    }
    let id: number = 1;
    const dernierUtilisateur = await prisma.utilisateur.findFirst({
      orderBy: {
        id: 'desc', // Trier de manière décroissante
      },
    });
    if (dernierUtilisateur) {
      id += dernierUtilisateur.id;
    }
    // Hacher le mot de passe
    const mdpHash = await bcrypt.hash(mdp, 10);

    // Créer l'utilisateur dans la base de données
    const x = await prisma.utilisateur.create({
      data: {
        id,
        pseudo,
        nom,
        prenom,
        anniversaire: new Date(anniversaire),
        email,
        mdp: mdpHash,
        description,
        date_creation: new Date(),
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Utilisateur créé avec succès.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}

