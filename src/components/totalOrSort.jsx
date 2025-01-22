import { useState } from "react";
import { PokemonInfo } from "./PokemonInfo";
export function TotalOrSort({ filteredPokemon, sortedPokemon }) {
  const [sortCriteria, setSortCriteria] = useState("name");

  sortedPokemon = [...filteredPokemon].sort((a, b) => {
    if (sortCriteria === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === "height") {
      return a.height - b.height;
    } else if (sortCriteria === "weight") {
      return a.weight - b.weight;
    } else if (sortCriteria === "speed") {
      return (
        a.stats.find((stat) => stat.stat.name === "speed").base_stat -
        b.stats.find((stat) => stat.stat.name === "speed").base_stat
      );
    } else if (sortCriteria === "attack") {
      return (
        a.stats.find((stat) => stat.stat.name === "attack").base_stat -
        b.stats.find((stat) => stat.stat.name === "attack").base_stat
      );
    }
    return 0;
  });

  function notFoundError() {
    if (!sortedPokemon.length)
      return <h3 className="container text-center mt-5">Not Found</h3>;
  }

  return (
    <>
      <div className="py-4 p-5 text-secondary d-flex justify-content-between">
        <div> Total : {sortedPokemon.length}</div>
        <div>
          <select
            className="form-control py-1"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}>
            <option value="name">Name</option>
            <option value="height">Height</option>
            <option value="weight">Weight</option>
            <option value="speed">Speed</option>
            <option value="attack">Attack</option>
          </select>
        </div>
      </div>
      <ul className="container">
        <div className="cards">
          {sortedPokemon.map((currPokemon) => (
            <PokemonInfo key={currPokemon.id} currPokemon={currPokemon} />
          ))}
        </div>
        {notFoundError()}
      </ul>
    </>
  );
}
