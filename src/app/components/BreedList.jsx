import Fuse from "fuse.js";
import BreedCard from "./BreedCard";

export default async function BreedList({
  query = "",
  hasSearched = false,
}) {
  const response = await fetch(
    "https://api.thedogapi.com/v1/breeds",
    {
      headers: {
        "x-api-key": process.env.ANIMAL_API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Kunne ikke hente hundedata: ${response.status}`
    );
  }

  const breeds = await response.json();
  const searchTerm = query.trim().toLowerCase();

  const fuse = new Fuse(breeds, {
    keys: ["name"],
    threshold: 0.4,
  });

  const exactMatch = breeds.some(
    (breed) => breed.name.toLowerCase() === searchTerm
  );

  const filteredBreeds = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : breeds;

  if (filteredBreeds.length === 0) {
    return <p>Ingen hunderacer matcher din søgning.</p>;
  }

  return (
    <>
      {hasSearched && !searchTerm && (
        <p className="col-span-2 mb-2 text-gray-600">
          Skriv noget i søgefeltet for at finde din favorit.
        </p>
      )}

      {searchTerm && !exactMatch && (
        <p className="col-span-2 mb-2 text-gray-600">
          Ingen præcise match på "{query}" — her er nogle racer,
          du måske mente:
        </p>
      )}

      {filteredBreeds.map((breed) => (
        <BreedCard key={breed.id} breed={breed} />
      ))}
    </>
  );
}