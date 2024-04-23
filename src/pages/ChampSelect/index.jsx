import React, { useState, useEffect } from "react";

const ChampSelect = () => {
  const [champions, setChampions] = useState([]); // Stocker les champions ici
  const [loading, setLoading] = useState(true); // Gérer l'état de chargement

  // Fonction pour récupérer les données des champions
  useEffect(() => {
    const fetchChampions = async () => {
      const url =
        "https://ddragon.leagueoflegends.com/cdn/14.8.1/data/fr_FR/champion.json";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setChampions(Object.values(data.data)); // Les données des champions sont dans data.data
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des champions:", error);
        setLoading(false);
      }
    };

    fetchChampions();
  }, []);

  // Affichage des champions
  return (
    <div>
      <h1>Champions de League of Legends</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {champions.map((champion) => (
            <div
              key={champion.id}
              style={{ border: "1px solid gray", padding: "10px" }}
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champion.image.full}`}
                alt={champion.name}
                style={{ width: "100px" }}
              />
              <h2>{champion.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChampSelect;
