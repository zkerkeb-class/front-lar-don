import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importation de useNavigate pour la navigation programmée

const ChampSelect = () => {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredChampion, setHoveredChampion] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const navigate = useNavigate(); // Création de l'instance navigate pour rediriger

  useEffect(() => {
    const fetchChampions = async () => {
      const url =
        "https://ddragon.leagueoflegends.com/cdn/14.8.1/data/fr_FR/champion.json";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setChampions(Object.values(data.data));
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des champions:", error);
        setLoading(false);
      }
    };

    fetchChampions();
  }, []);

  if (loading) {
    return <div>Chargement des champions...</div>;
  }

  return (
    <div style={{ position: "relative" }}>
      {champions.map((champion) => (
        <div
          key={champion.id}
          onClick={() => navigate(`/champion/${champion.id}`)} // Ajout de la gestion du clic pour rediriger
          onMouseEnter={(e) => {
            setHoveredChampion(champion);
            const rect = e.target.getBoundingClientRect();
            setModalPosition({
              top: rect.top + window.scrollY + rect.height + 10,
              left: rect.left,
            });
          }}
          onMouseLeave={() => setHoveredChampion(null)}
          style={{ display: "inline-block", margin: "10px", cursor: "pointer" }}
        >
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champion.image.full}`}
            alt={champion.name}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      ))}
      {hoveredChampion && (
        <div
          style={{
            position: "absolute",
            width: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.9)", // Augmenter l'opacité
            border: "1px solid black",
            padding: "20px",
            top: modalPosition.top, // Utiliser la position calculée
            left: modalPosition.left, // Utiliser la position calculée
            color: "white",
            textAlign: "center",
          }}
        >
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${hoveredChampion.id}_0.jpg`}
            alt={hoveredChampion.name}
            style={{ width: "480px" }}
          />
          <h2 style={{ fontSize: "1.5em", fontWeight: "bold" }}>
            {hoveredChampion.name}
          </h2>
          <p style={{ fontSize: "1.2em" }}>{hoveredChampion.title}</p>
          <p style={{ maxWidth: "480px" }}>{hoveredChampion.blurb}</p>
        </div>
      )}
    </div>
  );
};

export default ChampSelect;
