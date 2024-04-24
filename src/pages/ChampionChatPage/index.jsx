import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./ChampionChatPage.css";

const API_URL = "http://localhost:4004/chat";

const ChampionChatPage = () => {
  const { championId } = useParams();
  const [champion, setChampion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchChampion = async () => {
      const url = `https://ddragon.leagueoflegends.com/cdn/14.8.1/data/fr_FR/champion/${championId}.json`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      setMessages([...messages, { role: "user", content: trimmedMessage }]);
      setIsTyping(true);

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmedMessage,
            champion: champion.name,
            chatId: chatId,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setMessages(data.messageHistory);
        setChatId(data.chatId);
        setIsTyping(false);
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
      } finally {
        setNewMessage("");
      }
    }
  };

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
              {messages.slice(1).map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  <div className="text">{message.content}</div>
                </div>
              ))}
              {isTyping && (
                <div className="typing-indicator">
                  Le champion est en train d'écrire...
                </div>
              )}
              <div ref={messagesEndRef} />
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
