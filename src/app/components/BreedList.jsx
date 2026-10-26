import BreedCard from "./BreedCard";

export default async function BreedList({ search = "" }) {
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

  console.log("Søgeord i BreedList:", search);
  console.log("Antal hunde før filtrering:", breeds.length);

  const searchTerm = search.trim().toLowerCase();

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm)
  );

  console.log(
    "Antal hunde efter filtrering:",
    filteredBreeds.length
  );

  if (filteredBreeds.length === 0) {
    return <p>Ingen hunderacer matcher din søgning.</p>;
  }

  return (
    <>
      {filteredBreeds.map((breed) => (
        <BreedCard key={breed.id} breed={breed} />
      ))}
    </>
  );
}
