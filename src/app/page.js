import Header from "./components/Header";
import BreedList from "./components/BreedList";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import "./globals.css";

export default async function ListView({ searchParams }) {
  const params = await searchParams;
  const query = params.query || "";
  const hasSearched = Object.hasOwn(params, "query");

  console.log("Søgeord i page.js:", query);

  return (
    <>
      {/* Header med logo og notifikationer */}
      <Header />

      {/* Sidens overskrift */}
      <div className="mx-4">
        <h2>ListView</h2>
      </div>

      {/* Søgefelt */}
      <SearchBar query={query} />

      {/* Grid med hundekort */}
      <div className="mx-4 my-6 grid grid-cols-2 gap-4 w-auto overflow-hidden rounded-xl">
        <BreedList query={query} hasSearched={hasSearched} />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}