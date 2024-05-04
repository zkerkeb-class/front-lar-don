import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Plans from "./pages/Plans";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthenticationService from "./services/auth-service";
import Home from "./pages/Home";
import ConfirmSubscription from "./pages/ConfirmSubscription";
import ChampSelect from "./pages/ChampSelect";
import ChampionChatPage from "./pages/ChampionChatPage";
import GoogleAuthSuccess from "./pages/GoogleAuthSuccess";
import DiscordAuthSuccess from "./pages/DiscordAuthSuccess";
import GithubAuthSuccess from "./pages/GithubAuthSuccess";
import ConfirmMail from "./pages/ConfirmMail";

const App = () => {
  return (
    <Router>
      <RouterContent />
    </Router>
  );
};

const RouterContent = () => {
  const [isLogged, setIsLogged] = useState(
    AuthenticationService.isAuthenticated()
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogged(AuthenticationService.isAuthenticated());
  }, [location]);

  return (
    <div
      className={"p-6 mt-24 bg-slate-200 " + (isLogged ? "mt-16" : "")}
    >
      <Navbar
        navigation={[
          { to: "/home", label: "Accueil" },
          { to: "/plans", label: "Tarifs" },
          { to: "/champselect", label: "Champions" },
        ]}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/login"
          element={isLogged ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLogged ? <Navigate to="/home" /> : <Register />}
        />
        <Route
          path="/home"
          element={<Home />} // Enlever la redirection conditionnelle pour toujours afficher Home
        />
        <Route path="/plans" element={<Plans />} />
        <Route path="/confirm-subscription" element={<ConfirmSubscription />} />
        <Route path="/confirm-email" element={<ConfirmMail />} />
        <Route path="/champselect" element={<ChampSelect />} />
        <Route path="/champion/:championId" element={<ChampionChatPage />} />
        <Route path="/google-auth-success" element={<GoogleAuthSuccess />} />
        <Route path="/discord-auth-success" element={<DiscordAuthSuccess />} />
        <Route path="/github-auth-success" element={<GithubAuthSuccess />} />
      </Routes>
    </div>
  );
};

export default App;
