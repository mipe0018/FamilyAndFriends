
import Header from "./components/Header";
import BreedList from "./components/BreedList";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import "./globals.css";

export default async function ListView({ searchParams }) {
  const params = await searchParams;
  const search = params.search || "";

  console.log("Søgeord i page.js:", search);

  return (
    <>
      {/* Header med logo og notifikationer */}
      <Header />

      {/* Sidens overskrift */}
      <div className="mx-4">
        <h2>ListView</h2>
      </div>

      {/* Søgefelt */}
      <SearchBar search={search} />

      {/* Grid med hundekort */}
      <div className="mx-4 my-6 grid grid-cols-2 gap-4 w-auto overflow-hidden rounded-xl">
        <BreedList search={search} />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
