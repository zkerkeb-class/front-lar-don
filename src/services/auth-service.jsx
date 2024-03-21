const API_URL = "http://localhost:3000/bdd-api/users/login";

const AuthenticationService = {
  isAuthenticated: () => {
    // Vérifier si l'utilisateur est considéré comme connecté
    return localStorage.getItem("isAuthenticated") === "true";
  },

  login: async (usernameOrEmail, password) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      if (!response.ok) {
        // Si la réponse n'est pas ok, considérer cela comme une échec de connexion
        throw new Error(
          "Échec de la connexion. Veuillez vérifier vos identifiants."
        );
      }

      // Supposons que le backend renvoie un status 200 pour une connexion réussie
      // Ici, pas besoin de vérifier un token, on marque simplement l'utilisateur comme authentifié
      localStorage.setItem("isAuthenticated", "true");
      return true;
    } catch (error) {
      console.error("Erreur lors de la tentative de connexion:", error);
      // En cas d'erreur, vous pourriez vouloir gérer cela différemment, par exemple en montrant un message à l'utilisateur
      return false;
    }
  },

  logout: () => {
    // Supprimer le marqueur d'authentification pour déconnecter l'utilisateur
    localStorage.removeItem("isAuthenticated");
  },
};

export default AuthenticationService;
