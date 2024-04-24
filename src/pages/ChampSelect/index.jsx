import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChampSelect = () => {
  const [champions, setChampions] = useState([]);
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredChampion, setHoveredChampion] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();

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

  useEffect(() => {
    const filtered = champions.filter((champion) => {
      const inCategory =
        selectedCategory === "All" || champion.tags.includes(selectedCategory);
      const inSearch = champion.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return inCategory && inSearch;
    });

    setFilteredChampions(filtered);
  }, [searchTerm, selectedCategory, champions]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (loading) {
    return <div>Chargement des champions...</div>;
  }

  return (
    <div style={{ position: "relative" }}>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ margin: "10px" }}
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ margin: "10px" }}
        >
          <option value="All">Toutes les catégories</option>
          <option value="Fighter">Combattant</option>
          <option value="Mage">Mage</option>
          <option value="Marksman">Tireur</option>
          <option value="Assassin">Assassin</option>
          <option value="Tank">Tank</option>
          <option value="Support">Support</option>
        </select>
      </div>
      {filteredChampions.map((champion) => (
        <div
          key={champion.id}
          onClick={() => navigate(`/champion/${champion.id}`)}
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
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            border: "1px solid black",
            padding: "20px",
            top: modalPosition.top,
            left: modalPosition.left,
            color: "white",
            textAlign: "center",
            zIndex: 1000, // Assurez-vous que le popup est au-dessus des autres éléments
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
