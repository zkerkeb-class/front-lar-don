import React, { useState } from "react";
import Input from "../../components/Input";
import Title from "../../components/Title";
import Button from "../../components/Button";
import LardonLink from "../../components/LardonLink";
import AuthenticationService from "../../services/auth-service";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Renommez 'email' en 'identifier' pour plus de clarté
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Assurez-vous que la méthode login de AuthenticationService peut gérer un identifiant ou un email
    AuthenticationService.login(identifier, password).then((isLogged) => {
      if (isLogged) {
        // Si l'utilisateur est bien connecté, redirigez vers la page d'accueil
        window.location.href = "/";
      } else {
        // Gestion optionnelle de l'échec de la connexion
        alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
      }
    });
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit}>
        <Title level="2">Connexion</Title>

        <div className="mb-4">
          <Input
            label="Identifiant ou Email" // Mettez à jour le label pour refléter le changement
            type="text" // Modifiez le type en 'text' pour accepter les deux formats
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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

        <div className="flex items-center justify-between">
          <Button type="submit">Se connecter</Button>
          <LardonLink to="/register">
            Pas encore de compte ? S'inscrire
          </LardonLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
