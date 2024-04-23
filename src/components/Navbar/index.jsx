import { useLocation, useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import LardonLink from "../LardonLink";
import AuthenticationService from "../../services/auth-service";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faHome,
  faClipboardList,
  faSignInAlt,
  faUserPlus,
  faDragon, // Icône représentative pour les champions, s'assurer qu'elle est importée
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ navigation = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(
    AuthenticationService.isAuthenticated()
  );

  useEffect(() => {
    setIsLogged(AuthenticationService.isAuthenticated());
  }, [location]);

  const handleLogout = () => {
    AuthenticationService.logout();
    setIsLogged(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between w-full px-6 py-3 shadow-md bg-lolDark h-24">
      <LardonLink
        to="/"
        className="flex items-center text-white hover:text-lolGold transition duration-300 ease-in-out"
      >
        <img src={logoImage} alt="Lardon Logo" className="h-16 mr-4" />
        Lardon
      </LardonLink>

      <div className="flex items-center">
        {isLogged ? (
          navigation
            .filter((route) => route.nav !== false)
            .map((route) => (
              <LardonLink
                key={route.to}
                to={route.to}
                className="flex items-center text-lg text-white hover:text-lolGold ml-6 transition duration-300 ease-in-out"
                active={location.pathname === route.to}
              >
                {route.icon && (
                  <FontAwesomeIcon icon={route.icon} className="mr-2" />
                )}
                {route.label}
              </LardonLink>
            ))
        ) : (
          <>
            <LardonLink
              to="/login"
              className="flex items-center text-lg text-white hover:text-lolGold ml-6 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Connexion
            </LardonLink>
            <LardonLink
              to="/register"
              className="flex items-center text-lg text-white hover:text-lolGold ml-6 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Inscription
            </LardonLink>
          </>
        )}
        {isLogged && (
          <button
            onClick={handleLogout}
            className="flex items-center text-lg text-white hover:text-lolGold ml-6 transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
