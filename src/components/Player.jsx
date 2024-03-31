"use client"
import Player from "@madzadev/audio-player"
import "@madzadev/audio-player/dist/index.css";
import "./style/ContainerPlayer.css";
import { useEffect, useState } from "react";
import { client } from "../lib/client";


export default function ContainerPlayer() {

  const [musicas, setMusicas] = useState([]);
  const [carregado, setCarregado] = useState(false);
  let musicdataformatter = [];

  useEffect(() => {

    async function getAllTracks() {
      try {
        const resolvedJson = await client.getEntries({ content_type: "bibliotecaMusicas" });

        musicdataformatter = resolvedJson.items.map((x) => ({ 
          url: "https:" + x.fields.url.fields.file.url, 
          title: x.fields.title,
          tags: x.fields.tags 
        }));

        setMusicas(musicdataformatter);
        setCarregado(true)

        
      } catch (err) {
        console.log(err);
      }
    }

    getAllTracks();
  }, [])

  const handleClick = () => {
    getAllTracks(); // Aqui você pode ver as músicas após o setMusicas ser chamado
  };
  
  return (
    <>
      <div className="container">
        <div className="Teste">
          {carregado ? <Player trackList={musicas}/> : <span className="loader"></span>}
          {carregado ? <Player trackList={musicas}/> : <span className="loader"></span>}
        </div>
      </div>
      <button onClick={handleClick}>Verificar musicas</button>
    </>
  )
}