import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importez useNavigate pour gérer la redirection
import LardonLink from "../../components/LardonLink";
import Button from "../../components/Button";
import Title from "../../components/Title";
import Input from "../../components/Input";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Créez une instance de navigate pour la redirection

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérification que les mots de passe correspondent
    if (password !== passwordConfirmation) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // Vérification que les emails correspondent
    if (email !== emailConfirmation) {
      alert("Les emails ne correspondent pas.");
      return;
    }

    // URL de votre API (ajustez selon votre configuration)
    const url = "http://localhost:3000/bdd-api/users";
    const userData = { username, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Une erreur s'est produite lors de l'inscription");
      }

      // Si l'inscription est réussie, redirection vers la page de connexion
      navigate("/login");
    } catch (error) {
      console.error(
        "Erreur lors de la création de l’utilisateur:",
        error.message
      );
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div id="register">
      <form onSubmit={handleSubmit}>
        <Title level="2">Inscription</Title>
        <div className="mb-4">
          <Input
            label="Nom d'utilisateur"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            label="Confirmation de l'email"
            type="email"
            value={emailConfirmation}
            onChange={(e) => setEmailConfirmation(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <Input
            label="Confirmation du mot de passe"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit">S'inscrire</Button>
          <LardonLink to="/login">
            Vous avez déjà un compte ? Se connecter
          </LardonLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
