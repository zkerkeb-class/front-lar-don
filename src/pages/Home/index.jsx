import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import Tutoriel from '../../assets/gif/tuto.gif';

import UsersService from '../../services/users-service';
import LardonLink from '../../components/LardonLink';

// Component for individual FAQ items with accordion behavior
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b last:border-b-0'>
      <button
        className='flex justify-between items-center w-full p-5 text-left'
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className='font-semibold text-gray-800'>{question}</h4>
        {isOpen ? (
          <ChevronUpIcon className='h-5 w-5 text-gray-500' />
        ) : (
          <ChevronDownIcon className='h-5 w-5 text-gray-500' />
        )}
      </button>
      {isOpen && (
        <div className='pb-5 px-5'>
          <p className='text-gray-600'>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const [user, setUser] = useState(null);
  const [isMailVerified, setIsMailVerified] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const getCurrentUser = async () => {
    const userData = await UsersService.getCurrentUser();

    if (!userData) return;

    setUser(userData);

    if (userData.isLive === true) {
      setIsMailVerified(true);
    } else if (userData.isLive === false) {
      setIsMailVerified(false);
    }

    setLoadingUser(false);
  };

  const sendConfirmEmail = async () => {
    await UsersService.sendConfirmEmail();
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className='container mx-auto px-4'>
      {!loadingUser && user && !isMailVerified && (
        <div>
          <div className='bg-red-500 text-lolGold-2 p-4 text-center'>
            <p>
              Votre email n'a pas encore été vérifié. Veuillez vérifier votre
              boîte de réception pour le lien de vérification.
            </p>

            <LardonLink
              className='font-bold text-lolGold-2'
              to='#'
              onClick={() => sendConfirmEmail()}
            >
              Cliquez ici pour renvoyer un email de confirmation
            </LardonLink>
          </div>
        </div>
      )}

      <section className='hero bg-lolDark text-lolGold-2'>
        <h1 className='text-6xl font-bold font-serif'>
          Bienvenue dans le monde de League of Legends IA
        </h1>
        <p className='text-xl mt-4'>
          Dialoguez avec vos champions préférés grâce à notre IA avancée.
        </p>
      </section>

      <section className='my-10'>
        <img src={Tutoriel} alt='Tutoriel' className='w-full' />
      </section>

      <section className='my-10'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold'>
            Découvrez l'IA League of Legends
          </h2>
          <p className='mt-4'>
            Interagissez avec une IA capable de simuler des conversations avec
            des personnages emblématiques du jeu. Apprenez-en plus sur leurs
            histoires, leurs compétences et plongez dans l'univers de LoL comme
            jamais auparavant.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='bg-lolGold-2 py-10'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center text-lolBlue-7 mb-6'>
            FAQ
          </h2>
          <div>
            <FAQItem
              question="Comment interagir avec l'IA?"
              answer='Vous pouvez parler aux champions en utilisant notre interface de chat en direct.'
            />
            <FAQItem
              question='Les conversations sont-elles réalistes?'
              answer='Oui, notre IA utilise des modèles avancés pour fournir des réponses réalistes basées sur le lore de League of Legends.'
            />
            {/* Add more FAQs as needed */}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-10'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-6'>Témoignages</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='text-center p-4 shadow-lg rounded-lg bg-lolGold-2'>
              <p className='text-lg font-semibold text-lolBlue-6'>
                "L'expérience avec l'IA était incroyable, j'ai vraiment senti
                que j'étais en train de parler à Ashe!"
              </p>
              <p className='mt-2 text-sm text-lolBlue-6'>- Jean Dupont</p>
            </div>
            <div className='text-center p-4 shadow-lg rounded-lg bg-lolGold-2'>
              <p className='text-lg font-semibold text-lolBlue-6'>
                "J'ai été surpris par la qualité des réponses, c'est comme si le
                personnage était réel."
              </p>
              <p className='mt-2 text-sm text-lolBlue-6'>- Marie Curie</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
