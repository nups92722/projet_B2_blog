"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

const LoginPage = () => {
  const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const loginUser = async (e: any) => {
    e.preventDefault()
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then(authenticated => {
      router.push("/gestionUtilisateur")
    }).catch((error) => {
      throw new Error(error)
    })
  }

  const redirectionInscription = () => {
    router.push('/inscription');  // Redirige vers la page d'inscription
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Logo redimensionné */}
        <img
          className="mx-auto h-60 w-auto"  // Taille du logo ajustée
          src="/logo.png"  // Logo dans le dossier public
          alt="Votre Entreprise"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
          Se connecter à votre compte
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={loginUser}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
              Adresse email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={data.email}
                onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
                Mot de passe
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={data.password}
                onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>

      {/* Texte et bouton d'inscription */}
      <div className="text-center mt-4">
        <p className="text-black">Pas encore inscrit ? <span className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={redirectionInscription}>Inscrivez-vous ici</span></p>
      </div>
    </div>
  );
};

export default LoginPage;
