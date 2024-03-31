"use client"
import { client } from "../../lib/client";
import Player from "@madzadev/audio-player"
import "@madzadev/audio-player/dist/index.css";
import './style/timeline.css';
import { useEffect, useState } from "react";

interface ImusicaObjeto{
  url:string,
  title:string,
  tags: string[]
}
interface ItypeMusicas {
  id: string,
  nome: string,
  urlmusicas: ImusicaObjeto[]
}

export default function Page() {

  const [musica, setMusica] = useState<ItypeMusicas[]>([])
  const [musicaTocada, setMusicaTocada] = useState<ItypeMusicas[]>([{
    id: 'aaaaa',
    nome: 'samuel',
    urlmusicas: []
  }])
  const [timeLine, settimeLine] = useState(false)
  const [componentPlayer, setcomponentPlayer] = useState(carregarPlayer())
  let musicaFiltrada: ItypeMusicas[];
  
  

  useEffect(() => {

    async function getAllMuics() {
      try {
        const resolvedJson = await client.getEntries({ content_type: "bibliotecaMusicaIndividual" });
        let listaMusicas: ItypeMusicas[] = resolvedJson.items.map((x) => ({
          id: x.sys.id,
          nome: x.fields.title,
          urlmusicas: x.fields.url1.map((y) => ({ 
            url: "https:"+ y.fields.file.url, 
            title: y.fields.title,
            tags: ["Inutil"],
          })),
        }))

        setMusica(listaMusicas)
        setMusicaTocada(listaMusicas)

      }
      catch (err) {

        console.log(err);
      }
    }

    getAllMuics()
    

  }, [])

  

  // useEffect(() => {
  //   myRef.current.addEventListener('space', handleClick);
  //   return () => {
  //     myRef.current.removeEventListener('click', handleClick);
  //   };
  // }, []);

  const handleClick = (event) => {
    console.log('Clicked!');
  };

  //return <button ref={myRef}>Click me</button>;

  function carregarMusica(musicaP:ItypeMusicas){
    console.log(musicaP.id + " COMECOOOO")
    musicaFiltrada = musica.filter(a => (a.id == musicaP.id))
    setMusicaTocada(musicaFiltrada)
    
    settimeLine(true)
    

  }



  function carregarPlayer(){
    let array1: any = [];
    array1.push(musicaTocada[0].urlmusicas[0])
    let array2: any = [];
    array2.push(musicaTocada[0].urlmusicas[1])
    let array3: any = [];
    array3.push(musicaTocada[0].urlmusicas[2])
    
    return(
      <>
      <div className="player">
          <Player
            trackList={array1}
            includeTags={false}
            includeSearch={false}
            showPlaylist={false}
            sortTracks={false}
            autoPlayNextTrack={false} />
        </div>
        <div className="player">
          <Player
            trackList={array2}
            includeTags={false}
            includeSearch={false}
            showPlaylist={false}
            sortTracks={false}
            autoPlayNextTrack={false} />
        </div>
        <div className="player">
          <Player
            trackList={array3}
            includeTags={false}
            includeSearch={false}
            showPlaylist={false}
            sortTracks={false}
            autoPlayNextTrack={false} />
        </div>
        </>

    )
  }

  return (
    <div className="conteiner">
      <div className="listamusicas">
        <p>Lista de Musicas</p>
        {musica.length >= 1 ? <ul>
          {
            musica.map((musica) => <li key={musica.id}>
              {musica.nome}

              <button onClick={
                () => {
                  carregarMusica(musica)
                }
              }>
                Adicionar
              </button>
            </li>)
          }
        </ul> : <p>Carregando....</p>}
      </div>
      <div className="timeline">
        {timeLine ? carregarPlayer() : <p>Adicione Uma musica</p>}
      </div>
    </div>
  )
}