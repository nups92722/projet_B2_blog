import json
from faker import Faker
import datetime
import copy

# # Créer une instance de Faker pour des noms en français
fake = Faker('fr_FR')

def generateur_article(nb_article, donnee_compte):
    donnees = []

    for i in range(nb_article):
        donnee_auteur = donnee_compte[fake.random_int(0, len(donnee_compte)-1)]
        entree = {
            "id": i,
            "titre" : fake.text(max_nb_chars=20),
            "image": {
                "chemin" : "",
                "description" : ""
            },
            "article" : fake.text(max_nb_chars=200),
            "utilisateur" : {
                "id" : donnee_auteur["id"],
                "pseudo" : donnee_auteur["pseudo"]
            },
            "date" :fake.date_time_between(start_date=datetime.datetime.fromisoformat(donnee_auteur["date_creation"]["$date"].rstrip("Z")),end_date=datetime.datetime.now()).isoformat(),
        }
        donnees.append(entree)
    return  (donnees)


def generateur_compte(nb_compte) :
    donnees = []

    for i in range(nb_compte) :
        entree = {
                "id": i,
                "pseudo" : fake.text(max_nb_chars=20),
                "nom" : fake.last_name(),
                "prenom" : fake.first_name(),
                "anniversaire" : { "$date": fake.date_time_between(start_date='-100y', end_date='-18y').isoformat()+"Z"},
                "email": fake.email(),
                "mdp" : fake.password(),
                "date_creation" : { "$date": fake.date_time_between(start_date='-100y', end_date='-1y').isoformat()+"Z"},
                "description" : fake.text(max_nb_chars=200),
            }
        donnees.append(entree)
    return (donnees)


def generation_ficher(nom_ficher, donnee) :
    with open(f"{nom_ficher}.json", "w", encoding="utf-8") as fichier:
        json.dump(donnee, fichier, ensure_ascii=False, indent=4)
        print(f"Fichier '{nom_ficher}.json' généré avec succès !")

def generator ():
    collection = [
        {"nom" : "utilisateurs", "nb_exemplaire" : 0},
        {"nom" : "articles", "nb_exemplaire" : 0}
        ]
    for element in collection :
        print(f"combien dexemplaire pour l'élement : {element['nom']}")
        while element['nb_exemplaire'] < 1 :
            valeur = input()
            try:
                nb = int(valeur)
                element["nb_exemplaire"] = nb
            except ValueError:
                print("Ce n'est pas un nombre ou celui ci est inferieur a 1\nveillez reesayer")


    donnee = generateur_compte(collection[0]["nb_exemplaire"])
    generation_ficher(collection[0]['nom'], donnee)
    donnee = generateur_article(collection[1]["nb_exemplaire"], donnee)
    generation_ficher(collection[1]['nom'], donnee)
    print("fin generation")

generator()

