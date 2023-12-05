/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MovieGRID.css";

function Search(){
    const [searchParams] = useSearchParams()

    // eslint-disable-next-line no-unused-vars
    const [movies, setMovies] = useState([])
    const query = searchParams.get("q")
    console.log(query)

    const getSearchMovies = async (url) => {
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`Erro ao buscar dados: ${res.statusText}`);
          }
    
          const data = await res.json();
          setMovies(data.results); 
          console.log(data.results); 
        } catch (error) {
          console.error("Erro durante a busca de dados:", error.message);
        }
      };
    
      useEffect(() => {
        const topRateUrl = `${searchURL}?${apiKey}&query=${query}`;
        getSearchMovies(topRateUrl);
      }, [query]);

    return (<div className="container">
    <h2 className="title">Resultados para <span className="query-text">{query}</span></h2>
    <div className="movies-container">
        {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
            <p>Nenhum filme encontrado.</p>
        )}
    </div>
 
</div>)
}

export default Search