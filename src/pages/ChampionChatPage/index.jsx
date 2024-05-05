import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './ChampionChatPage.css';

const ChampionChatPage = () => {
  const { championId } = useParams();
  const [champion, setChampion] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState('');
  const chatboxRef = useRef(null);

  useEffect(() => {
    const fetchChampion = async () => {
      const url = `${process.env.REACT_APP_LOL_API}/champion/${championId}.json`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setChampion(Object.values(data.data)[0]);
        setDescription(Object.values(data.data)[0].lore);
        setLoading(false);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des données du champion:',
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
    setNewMessage('');
    if (trimmedMessage) {
      setMessages([...messages, { role: 'user', content: trimmedMessage }]);
      setIsTyping(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_URL_AI}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: trimmedMessage,
            champion: champion.id,
            chatId: chatId,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setMessages(
          data.messageHistory?.filter((message) => message.role !== 'system')
        );
        setChatId(data._id);
        setIsTyping(false);
        setTimeout(() => {
          handleNewMessage();
        });
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
      }
    }
  };

  const addNextString = (el, string) => {
    el.innerText += string;
  };

  const handleNewMessage = async () => {
    const messages = document.querySelectorAll('.message.assistant .text');
    const lastMessage = messages[messages.length - 1];
    const contentByWords = lastMessage.getAttribute('data-content')?.split(' ');

    if (contentByWords) {
      const interval = setInterval(() => {
        if (contentByWords.length) {
          addNextString(lastMessage, ` ${contentByWords.shift()}`);
        } else {
          clearInterval(interval);
        }
      }, 50);
    }
  };

  return (
    <div className='flex h-[calc(100vh-200px)] justify-center gap-14'>
      <div className='relative w-[800px] max-w-[75vw] bg-opacity-80 backdrop-blur-md'>
        {loading ? (
          <div>Chargement des données du champion...</div>
        ) : (
          champion && (
            <>
              <div className='flex items-center p-5 bg-lolGrey-black'>
                <img
                  className='h-16 w-16 mr-4'
                  src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champion.image.full}`}
                  alt={champion.name}
                />
                <div>
                  <h1 className='text-4xl font-bold text-lolGold-4 font-serif'>
                    {champion.name}
                  </h1>
                  <h2 className='text-lg text-lolGold-5'>{champion.title}</h2>
                </div>
              </div>
              <div className='messages pt-5 px-2' ref={chatboxRef}>
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.role}`}>
                    <div className='text' data-content={message.content}>
                      {message.role === 'user' && (
                        <span className='text-lolGrey-black'>
                          {message.content}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className='typing-indicator'>
                    Le champion est en train d'écrire...
                  </div>
                )}
              </div>
              <form onSubmit={handleSendMessage} className='send-message-form'>
                <input
                  type='text'
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder='Tapez votre message ici...'
                  className='outline-none text-lolGold-2 rounded-sm flex-grow mr-2 border-2 p-2 bg-lolBlue-5 border-lolGold-4'
                />
                <button
                  type='submit'
                  className=' border-lolGold-4 border-2 font-serif rounded-sm px-4 py-2 bg-lolBlue-5 text-lolGold-2'
                >
                  ENVOYER
                </button>
              </form>
              <div
                className='absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center filter blur-lg brightness-50 z-[-1]'
                style={{
                  backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg)`,
                }}
              ></div>
            </>
          )
        )}
      </div>
      <div className='w-[400px] max-w-[25vw] bg-lolGrey-black text-lolGold-2 p-5 font-serif text-lg overflow-y-auto h-[calc(100vh-200px)]'>
        {description}
      </div>
    </div>
  );
};

export default ChampionChatPage;
