"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

const LogoutPage = () => {
    const router = useRouter()
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const logoutUser = async (e: any) => {
        e.preventDefault()
        signOut({
            redirect: false,
        }).then(() => {
            router.push("/")
        }).catch((error) => {
            throw new Error(error)
        })
    }

    return (
        <div className="flex min-h-screen flex-col justify-center items-center bg-gray-100">
            <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
                Se déconnecter de votre compte
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={logoutUser}>
                    <div>
                        <p className="text-lg text-gray-700 text-center">Êtes-vous sûr de vouloir vous déconnecter ?</p>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Se déconnecter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogoutPage;
