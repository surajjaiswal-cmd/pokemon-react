export function PokemonInfo({ currPokemon }) {
  // both functions ues to generate random color

  function generateRandomHexString() {
    let length = 6;
    const characters = "0123456789ABCDEF";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  // function generateRandomHexString() {
  //   const length = 6;
  //   const characters = "0123456789ABCDEF";
  //   const resultArray = Array.from({ length }, () => {
  //     const randomIndex = Math.floor(Math.random() * characters.length);
  //     return characters.charAt(randomIndex);
  //   });
  //   return resultArray.join("");
  // }

  return (
    <li className="card-info">
      <div className="img-folder">
        <img
          src={currPokemon.sprites.other.dream_world.front_default}
          alt={currPokemon.name}
          className="pokemon-img"
        />
      </div>
      <div className="name">{currPokemon.name}</div>
      <div>
        <p
          className="type"
          style={{
            backgroundColor: `#${generateRandomHexString()}50`,
          }}>
          {currPokemon.types.map((curType) => curType.type.name).join(", ")}
        </p>
      </div>
      <div className="more-info">
        <p>
          Height <br />
          <span> {currPokemon.height}</span>
        </p>
        <p>
          Weight <br />
          <span> {currPokemon.weight}</span>
        </p>
        <p>
          Speed <br />
          <span> {currPokemon.stats[5].base_stat}</span>
        </p>
        <p>
          Experience <br />
          <span> {currPokemon.base_experience}</span>
        </p>
        <p>
          Attack <br />
          <span> {currPokemon.stats[1].base_stat}</span>
        </p>
        <p>
          Abilities <br />
          <span>
            {currPokemon.abilities
              .map((abiInfo) => abiInfo.ability.name)
              .slice(0, 1)
              .join(", ")}
          </span>
        </p>
      </div>
    </li>
  );
}
