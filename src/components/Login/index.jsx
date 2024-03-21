import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importez Link de react-router-dom

function Login() {
  const [identifier, setIdentifier] = useState(""); // Utilisez 'identifier' à la place de 'email'
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logique de connexion ici
    console.log("Connexion avec", identifier, password);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Connexion</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="identifier" // Changez 'email' par 'identifier'
          >
            Identifiant ou Email
          </label>
          <input // Assurez-vous que `Input` est un élément d'input valide ou importé correctement.
            label="Identifiant ou Email"
            type="text" // Changez le type en 'text' pour accepter les deux formats
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Mot de passe
          </label>
          <input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Se connecter
          </button>
          <Link
            to="/register"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Pas de compte ? S'inscrire
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
