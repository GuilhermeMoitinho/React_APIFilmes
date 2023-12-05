/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import './Movie.css'

import {
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill,
  } from "react-icons/bs";


  
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function Movie(){

    const {id} = useParams()
    const [movie, setmovie] = useState(null)

    const getMovie = async(url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
              throw new Error(`Erro ao buscar dados: ${res.statusText}`);
            }
      
            const data = await res.json();
            setmovie(data); 
            console.log(data); 
          } catch (error) {
            console.error("Erro durante a busca de dados:", error.message);
          }
    }

    const formatCurrency = (number) => {
        return number.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      };

    useEffect(() => {
        const movieUrl = `${moviesURL}${id}?${apiKey}`;
        console.log(movieUrl); 
            getMovie(movieUrl);
      }, []);

      return (
        <div className="movie-page">
          {movie && (
            <>
              <MovieCard movie={movie} showLink={false} />
              <p className="tagline">{movie.tagline}</p>
              <div className="info">
                <h3>
                  <BsWallet2 /> Orçamento:
                </h3>
                <p>{formatCurrency(movie.budget)}</p>
              </div>
              <div className="info">
                <h3>
                  <BsGraphUp /> Receita:
                </h3>
                <p>{formatCurrency(movie.revenue)}</p>
              </div>
              <div className="info">
                <h3>
                  <BsHourglassSplit /> Duração:
                </h3>
                <p>{movie.runtime} minutos</p>
              </div>
              <div className="info description">
                <h3>
                  <BsFillFileEarmarkTextFill /> Descrição:
                </h3>
                <p>{movie.overview}</p>
              </div>
            </>
          )}
        </div>
      );
    }
         
      


export default Movie