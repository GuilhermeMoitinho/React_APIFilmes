// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import './MovieGRID.css'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function Home() {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRateMovies = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Erro ao buscar dados: ${res.statusText}`);
      }

      const data = await res.json();
      setTopMovies(data.results); 
      console.log(data.results); 
    } catch (error) {
      console.error("Erro durante a busca de dados:", error.message);
    }
  };

  useEffect(() => {
    const topRateUrl = `${moviesURL}top_rated?${apiKey}`;
    //console.log(topRateUrl)
    getTopRateMovies(topRateUrl);
  }, []);

  return (
    <div className="container">
        <h2 className="title">Melhores filmes:</h2>
        <div className="movies-container">
            {topMovies.length > 0 ? (
                topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
                <p>Nenhum filme encontrado.</p>
            )}
        </div>
     
    </div>
  );
}

export default Home;
