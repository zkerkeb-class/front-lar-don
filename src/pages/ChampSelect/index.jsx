import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersService from '../../services/users-service';

const ChampSelect = () => {
  const [champions, setChampions] = useState([]);
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredChampion, setHoveredChampion] = useState(null);
  const [modalPosition, setModalPosition] = useState({
    x: 0,
    y: 0,
  });
  const [hasSubscription, setHasSubscription] = useState(false);

  const navigate = useNavigate();

  const fetchChampions = async () => {
    const url = `${process.env.REACT_APP_LOL_API}/champion.json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setChampions(Object.values(data.data));
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des champions:', error);
      setLoading(false);
    }
  };

  const getSubscription = async () => {
    UsersService.getUserSubscription().then((response) => {
      setHasSubscription(response.id == 'prod_PZcx0WcDVQLyfr');
    });
  };

  useEffect(() => {
    fetchChampions();
    getSubscription();
  }, []);

  useEffect(() => {
    const filtered = champions.filter((champion) => {
      const inCategory =
        selectedCategory === 'All' || champion.tags.includes(selectedCategory);
      const inSearch = champion.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return inCategory && inSearch;
    });

    setFilteredChampions(filtered);
  }, [searchTerm, selectedCategory, champions]);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setModalPosition({ y: clientY, x: clientX });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type='text'
          placeholder='Rechercher...'
          value={searchTerm}
          onChange={handleSearchChange}
          className='bg-lolBlue-5 text-lolGold-2 border-2 border-lolGold-4 rounded mr-4 py-2 px-4 outline-none'
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className='bg-lolBlue-5 text-lolGold-2 border-2 border-lolGold-4 rounded py-2 px-4 outline-none'
        >
          <option value='All'>Toutes les catégories</option>
          <option value='Fighter'>Combattant</option>
          <option value='Mage'>Mage</option>
          <option value='Marksman'>Tireur</option>
          <option value='Assassin'>Assassin</option>
          <option value='Tank'>Tank</option>
          <option value='Support'>Support</option>
        </select>
      </div>
      {filteredChampions.map((champion) => (
        <div
          key={champion.id}
          onClick={() => navigate(`/champion/${champion.id}`)}
          onMouseEnter={(e) => {
            setHoveredChampion(champion);
          }}
          onMouseLeave={() => setHoveredChampion(null)}
          style={{
            display: 'inline-block',
            margin: '10px',
            cursor: 'pointer',
            pointerEvents:
              hasSubscription || champion.id == 'Aatrox' ? 'auto' : 'none',
          }}
        >
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champion.image.full}`}
            alt={champion.name}
            className='w-24 h-24 shadow-lg bg-lolBlue-6'
            style={{
              width: '100px',
              height: '100px',
              filter:
                hasSubscription || champion.id == 'Aatrox'
                  ? 'none'
                  : 'grayscale(100%)',
            }}
          />
        </div>
      ))}
      {hoveredChampion && (
        <div
          className='fixed touch-none pointer-events-none text-lolGold-2 p-5 text-center z-50 bg-lolGrey-black bg-opacity-95 border-lolBlue-2 rounded-lg shadow-lg'
          style={{
            border: '1px solid lolBlue-2',
            top: modalPosition.y,
            left: modalPosition.x,
            transform:
              modalPosition.x > window.innerWidth / 2 &&
              modalPosition.y > window.innerHeight / 2
                ? 'translate(-100%, -100%)'
                : modalPosition.x > window.innerWidth / 2
                ? 'translate(-100%, 0)'
                : modalPosition.y > window.innerHeight / 2
                ? 'translate(0, -100%)'
                : 'none',
          }}
        >
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${hoveredChampion.id}_0.jpg`}
            alt={hoveredChampion.name}
            height={283}
            width={480}
            style={{ width: '480px', maxWidth: 'unset', minWidth: '480px' }}
          />
          <h2 style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
            {hoveredChampion.name}
          </h2>
          <p style={{ fontSize: '1.2em' }}>{hoveredChampion.title}</p>
          <p style={{ maxWidth: '480px' }}>{hoveredChampion.blurb}</p>
        </div>
      )}
    </div>
  );
};

export default ChampSelect;
