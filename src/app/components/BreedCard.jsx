import Link from "next/link";

export default function BreedCard({ breed }) {
  return (
    <Link
      href={`/detailview/${breed.id}`}
      className="mb-4 block w-full overflow-hidden rounded-xl bg-white shadow-lg transition-opacity duration-200 hover:opacity-80"
    >
      {breed.image?.url ? (
        <img
          src={breed.image.url}
          alt={breed.name}
          className="h-auto w-full rounded-xl object-cover shadow-lg"
        />
      ) : (
        <p className="p-2 text-gray-500">
          Intet billede tilgængeligt
        </p>
      )}

      <h3 className="p-1 pl-2 text-xl font-bold text-foreground">
        {breed.name}
      </h3>

      <p className="pl-2 text-base text-gray-500">
        {breed.bred_for || "Ingen beskrivelse tilgængelig"}
      </p>

      <p className="pb-2 pl-2 text-base text-gray-500">
        {breed.temperament || "Ikke angivet"}
      </p>
    </Link>
  );
}