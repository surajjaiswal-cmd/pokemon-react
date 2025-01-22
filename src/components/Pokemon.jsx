import { useEffect, useState } from "react";
import { PokemonInfo } from "./PokemonInfo";
import "./Pokemon.css";

export function Pokemon() {
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [gotop, setGotop] = useState(true);
  const api = "https://pokeapi.co/api/v2/pokemon?limit=80";

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch(api);
        let data = await res.json();
        // got another API in API fetching it by nesting
        let detailedResponse = data.results.map(async (currPokemon) => {
          try {
            let res = await fetch(currPokemon.url);
            let data = await res.json();
            return data;
          } catch (error) {
            console.log(error);
          }
        });
        // got promises so we use promises constructor to get all data
        const detailedPokemonData = await Promise.all(detailedResponse);
        setPokemonData(detailedPokemonData);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  window.onscroll = function () {
    if (window.pageYOffset > 300) {
      setGotop(false);
    } else {
      setGotop(true);
    }
  };

const filteredPokemon = pokemonData.filter((pokemon) =>
  pokemon.name.toLowerCase().includes(search.toLowerCase())
);


  if (error) {
    return (
      <>
        <h1 className="container text-center mt-5"> {error.message} </h1>
      </>
    );
  }

  if (!pokemonData.length) {
    return <h3 className="container text-center mt-5">loading...</h3>;
  }

  function notFoundError() {
    if (!filteredPokemon.length)
      return <h3 className="container text-center mt-5">Not Found</h3>;
  }

  return (
    <div>
      <a href="#">
        <button className={`btn go-up-side ${gotop ? "hide" : ""}`}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>{" "}
      </a>
      <div className="container-fluid">
        <h1 className="text-center mt-3">
          <b>Pokemon</b>
        </h1>

        <div className="text-center py-4">
          <input
            type="text"
            className="search-bar"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ul className="container">
          <div className="cards">
            {filteredPokemon.map((currPokemon) => (
              <PokemonInfo key={currPokemon.id} currPokemon={currPokemon} />
            ))}
          </div>
          {notFoundError()}
        </ul>
      </div>
    </div>
  );
}
