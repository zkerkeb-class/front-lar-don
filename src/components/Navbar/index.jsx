import { useLocation } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import LardonLink from "../LardonLink";
import AuthenticationService from "../../services/auth-service";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faHome,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ navigation }) => {
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(
    AuthenticationService.isAuthenticated()
  );

  useEffect(() => {
    setIsLogged(AuthenticationService.isAuthenticated());
  }, [location]);

  const handleLogout = () => {
    AuthenticationService.logout();
  };

  return isLogged ? (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center bg-lolDark px-6 py-3 shadow-md h-20 z-30 text-white font-sans">
      <LardonLink
        to="/"
        className="flex items-center text-lolGold hover:text-white transition duration-300 ease-in-out"
      >
        <img src={logoImage} alt="Lardon Logo" className="h-12 mr-3" />{" "}
        {/* Adjust the size as needed */}
        Lardon
      </LardonLink>

      <div className="flex items-center">
        {navigation
          .filter((route) => route.nav !== false)
          .map((route) => (
            <LardonLink
              key={route.to}
              to={route.to}
              className="flex items-center text-lg text-white hover:text-lolGold ml-10 transition duration-300 ease-in-out"
              active={location.pathname === route.to}
            >
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              {route.label}
            </LardonLink>
          ))}

        <button
          onClick={handleLogout}
          className="flex items-center text-lg hover:text-lolGold ml-10 transition duration-300 ease-in-out"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Déconnexion
        </button>
      </div>
    </nav>
  ) : null;
};

export default Navbar;
