import React from "react";
import bgImage from "../../assets/bg-enviga.png";
//import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay with gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-0"></div>

      {/* Main content above overlay */}
      <div className="relative z-10 font-sans">
        {/* Navbar */}
        <header className="flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl font-bold text-green-400">EnviGa</h1>
          <nav className="space-x-4">
            <a href="/" className="hover:underline transition duration-300">Accueil</a>
            <a href="/login" className="hover:underline transition duration-300">Connexion</a>
            <a
              href="/register"
              className="bg-green-500 hover:bg-green-600 transition duration-300 px-4 py-2 rounded-full"
            >
              S’inscrire
            </a>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center text-center px-4 mt-20 md:mt-32">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Unissons nos efforts<br className="hidden md:block" /> pour un monde plus vert 🌍
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-200">
            EnviGa facilite la collaboration entre hôtels, restaurants et associations environnementales pour réduire la pollution.
          </p>
          <a
            href="/register"
            className="bg-green-600 hover:bg-green-700 transition duration-300 px-6 py-3 rounded-full text-white text-lg shadow-lg"
          >
            Rejoignez-nous
          </a>
        </main>

        {/* Footer */}
        <footer className="mt-24 text-center text-sm py-6 text-gray-300">
          © 2025 EnviGa. Tous droits réservés.
        </footer>
      </div>
    </div>
  );
};

export default Home;