import React from 'react';
import { useState,useEffect } from 'react';
import './App.css'
import searchIcon from './SearchIcon.svg'
import MovieRender from './MovieRender.js';

const API_URL = 'http://www.omdbapi.com?apikey=575632c'
const App = () => {
	const [movies, setMovies] = useState([])
	const [searchTerm, setSearchTerm] = useState([])
	useEffect(() => {
		searchMovies('Iron Man')
	}, [])

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`)
		const data = await response.json();
		console.log(data)
		setMovies(data.Search);
	}

	
	return (
		<div className="app">
			<h1>MovieLand</h1>

			<div className="search">
				<input 
					placeholder='Search A Movie'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<img src={searchIcon} 
					alt="SearchIcon"
					onClick={() => searchMovies(searchTerm)} />
			</div>
			<div>
				{
					(movies && movies.length > 0) ? (
						<div className="container"> 
						{
							movies.map((movie) =>  <MovieRender key={movie.imdbID} movie={movie}/> )					    							
						}
						</div>				
					) :
					(
						<div className="empty">
							<h2>Movie Not found!</h2>
						</div>
					)
				}
			</div>
		</div>
	)
}

export default App;
