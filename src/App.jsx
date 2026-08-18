import React from"react";
import {useState,useEffect} from "react";
import {useDebounce} from "react-use";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { updateSearchCount } from "./appwrite";
import { testAppwrite } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept : 'application/json',
    Authorization : `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deBouncedSearchTerm, setDeBouncedSearchTerm] = useState('');

  useDebounce(() => setDeBouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try{
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint,API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();

       if(data.response === 'false'){
        setErrorMessage(data.Error || 'Falied to Fetch Movies');
        setMovieList([]);
        return;
       }

       setMovieList(data.results || []);

       if(query && data.results.length>0){
        await updateSearchCount(query, data.results[0]);

       }
       testAppwrite();


    } catch(error){
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error Fetching Movies. Try Again Later ')
    } finally {
      setIsLoading(false);
    }

  }
  useEffect( () => {
    fetchMovies(deBouncedSearchTerm);

  },[deBouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper"> 
        <header>
          <img src="./hero-img.png" alt="hero-img" />
          <h1>Welcome to <span className="text-gradient">Cine Nook</span></h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className="all-movies">
        <h2 className="mt-[50px]">All-Movies</h2>


        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>

        )
      
      
      
      }
        </section>
       
      </div>
    </main>

  )

}

export default App;