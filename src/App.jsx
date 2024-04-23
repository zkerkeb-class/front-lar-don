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

  useEffect(() => {
    // Ajuster pour permettre l'accès à Home même quand déconnecté
    if (
      !isLogged &&
      location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/home" // Permettre d'accéder à Home
    ) {
      navigate("/login");
    }
  }, [isLogged, location.pathname]); // Écouter aussi les changements de location.pathname

  return (
    <div
      className={"p-6 bg-slate-200 min-h-screen " + (isLogged ? "mt-16" : "")}
    >
      <Navbar
        navigation={[
          { to: "/home", label: "Accueil" },
          { to: "/plans", label: "Plans" },
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
        <Route path="/champselect" element={<ChampSelect />} />
        <Route path="/champion/:championId" element={<ChampionChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
