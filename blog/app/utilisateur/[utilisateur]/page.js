"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Utilisateur } from "@prisma/client";

export default function Auteur() {
  const idUtilisateur = 62;
  const [data,setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await axios.post('/api/utilisateur',{idUtilisateur});
        console.log(response);
      }
      catch (error)
      {
        console.log(JSON.stringify(error));
      }
      }
    fetchData();
   },[])

  // if (isLoading) return <p>Loading...</p>
  // if (!data) return <p>No Authors found</p>
  
  return (
    <span>pouet</span>
    // <div>
    //   <span>{data.id}</span><br/><span>{data.pseudo}</span>
    // </div>
      )
}