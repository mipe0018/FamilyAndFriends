import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default async function DetailView({ params }) {
  const { id } = await params;

  const response = await fetch(
    `https://api.thedogapi.com/v1/breeds/${id}`,
    {
      headers: {
        "x-api-key": process.env.ANIMAL_API_KEY,
      },
    }
  );

if (!response.ok) {
  const errorText = await response.text();

  throw new Error(
    `API-fejl: ${response.status} - ${errorText}`
  );
}

  const breed = await response.json();

  const traits = breed.temperament
    ? breed.temperament
        .split(",")
        .map((trait) => trait.trim())
        .slice(0, 4)
    : [];

  const colors = [
    "bg-(--color-blue)",
    "bg-(--color-pink)",
    "bg-(--color-green)",
    "bg-(--color-yellow)",
  ];

  return (
    <>
      <Header />

      <div className="mx-4">
        <h1 className="text-2xl font-bold text-foreground">
          {breed.name}
        </h1>

        <Link
          href="/"
          className="text-sm text-foreground transition-opacity duration-200 hover:opacity-60"
        >
          Back to ListView
        </Link>
      </div>

      {/* Hundens billede */}
      <div className="relative m-4">
        {breed.image?.url ? (
          <img
            src={breed.image.url}
            alt={breed.name}
            className="h-auto max-h-125 w-full rounded-xl object-cover shadow-lg"
          />
        ) : (
          <div className="flex h-64 items-center justify-center rounded-xl bg-gray-100">
            Intet billede tilgængeligt
          </div>
        )}

        {/* Tilbage-pil */}
        <Link
          href="/"
          aria-label="Tilbage til oversigten"
          className="absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-black transition-opacity duration-200 hover:opacity-70"
        >
          <IoIosArrowBack size={28} />
        </Link>

        {/* Stjerne */}
        <div className="absolute right-3 top-3 z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30">
            <FaRegStar size={24} className="text-white" />
          </div>
        </div>

        {/* Avatarboks */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-3 rounded-xl bg-white/75 p-3 backdrop-blur-sm">
          {breed.image?.url ? (
            <img
              src={breed.image.url}
              alt={breed.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-200" />
          )}

          <div>
            <p className="text-sm font-semibold text-gray-800">
              {breed.name}
            </p>
            <p className="text-xs text-gray-500">
              {breed.origin || "Oprindelse ikke angivet"}
            </p>
          </div>
        </div>
      </div>

      {/* Overskrift */}
      <div className="mx-4">
        <h2 className="my-2 text-2xl font-bold text-foreground">
          About the breed
        </h2>
      </div>

      {/* Temperament */}
      <div className="ml-4 mt-0 flex flex-wrap gap-3">
        {traits.length > 0 ? (
          traits.map((trait, index) => (
            <div
              key={trait}
              className={`${colors[index % colors.length]} rounded-full p-2 text-xs text-gray-700`}
            >
              {trait}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            Temperament ikke angivet.
          </p>
        )}
      </div>

      {/* Informationer */}
      <div className="mx-4 mt-6">
        <h2 className="mt-4 text-lg font-semibold">
          Bred for
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          {breed.bred_for || "Ingen beskrivelse tilgængelig."}
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          Levetid
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          {breed.life_span || "Ikke angivet"}
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          Vægt
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          {breed.weight?.metric
            ? `${breed.weight.metric} kg`
            : "Ikke angivet"}
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          Højde
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          {breed.height?.metric
            ? `${breed.height.metric} cm`
            : "Ikke angivet"}
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          Oprindelse
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          {breed.origin || "Oprindelse ikke angivet."}
        </p>

        <h2 className="mt-6 text-lg font-semibold">
          Historie
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          {breed.breed_group
            ? `Racen tilhører gruppen ${breed.breed_group}.`
            : "Der er ingen yderligere historie tilgængelig i API'et."}
        </p>
      </div>

      <Footer />
    </>
  );
}
