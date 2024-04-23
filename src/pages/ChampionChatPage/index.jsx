import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ChampionChatPage.css"; // S'assure que le fichier CSS est importé

const ChampionChatPage = () => {
  // On récupère l'ID du champion depuis les paramètres de l'URL
  const { championId } = useParams();

  // Les états pour gérer les informations du champion, le chargement, les messages et le nouveau message
  const [champion, setChampion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // useEffect pour charger les données du champion dès que le composant est monté
  useEffect(() => {
    // Fonction asynchrone pour charger les données du champion depuis l'API
    const fetchChampion = async () => {
      const url = `https://ddragon.leagueoflegends.com/cdn/14.8.1/data/fr_FR/champion/${championId}.json`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setChampion(Object.values(data.data)[0]);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du champion:",
          error
        );
        setLoading(false);
      }
    };

    fetchChampion();
  }, [championId]);

  // Fonction pour simuler l'envoi d'un message et recevoir une réponse automatique.
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage.trim(), sender: "user" }]);
      setIsTyping(true); // Commencer l'animation d'écriture

      setTimeout(() => {
        setIsTyping(false); // Arrêter l'animation d'écriture avant d'afficher le message
        const botMessage = {
          text: `Vous avez dit : "${newMessage.trim()}"? Intéressant.`,
          sender: "champion",
          profilePic: `https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champion.image.full}`,
        };
        setMessages((messages) => [...messages, botMessage]);
      }, 2000); // Laissez un délai de 2 secondes pour simuler l'écriture

      setNewMessage("");
    }
  };

  // Rendu du composant
  return (
    <div className="chat-container">
      {loading ? (
        <div>Chargement des données du champion...</div>
      ) : (
        champion && (
          <>
            <div className="chat-header">
              <img
                className="champion-icon"
                src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champion.image.full}`}
                alt={champion.name}
              />
              <div>
                <h1 className="champion-name">{champion.name}</h1>
                <h2 className="champion-title">{champion.title}</h2>
              </div>
            </div>
            <div
              className="chat-background"
              style={{
                backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg)`,
              }}
            ></div>
            <div className="messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  <div className="text">{message.text}</div>
                </div>
              ))}
              {isTyping && (
                <div className="typing-indicator">
                  Le champion est en train d'écrire...
                </div>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="send-message-form">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tapez votre message ici..."
                className="message-input"
              />
              <button type="submit" className="send-button">
                Envoyer
              </button>
            </form>
          </>
        )
      )}
    </div>
  );
};

export default ChampionChatPage;
