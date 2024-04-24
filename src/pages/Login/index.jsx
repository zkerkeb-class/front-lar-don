import React, { useState } from "react";
import Input from "../../components/Input";
import Title from "../../components/Title";
import Button from "../../components/Button";
import LardonLink from "../../components/LardonLink";
import AuthenticationService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await AuthenticationService.login({
      usernameOrEmail: identifier,
      password: password,
    })
      .then(() => {
        navigate("/plans");
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
      });
  };

  const handleGoogleLogin = () => {
    // URL codée en dur pour l'authentification Google
    window.location.href = "http://localhost:3005/auth/google";
  };

  return (
    <div id="login">
      <form>
        <Title level="2">Connexion</Title>
        <div className="mb-4">
          <Input
            label="Identifiant ou Email"
            type="text"
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
        {error && <Alert type="error">{error}</Alert>}
        <div className="flex items-center justify-between">
          <Button type="button" onClick={() => handleSubmit}>
            Se connecter
          </Button>
          <Button
            type="button"
            onClick={() => handleGoogleLogin}
            style={{ backgroundColor: "#4285F4", color: "white" }}
          >
            Connexion avec Google
          </Button>
          <LardonLink to="/register">
            Pas encore de compte ? S'inscrire
          </LardonLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
