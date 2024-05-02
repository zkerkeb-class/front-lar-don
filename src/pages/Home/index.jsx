import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

// Importez vos images (à remplacer par les chemins réels de vos images)
import characterImage1 from '../../assets/character1.jpg';
import characterImage2 from '../../assets/character2.jpg';
import characterImage3 from '../../assets/character3.jpg';

import UsersService from '../../services/users-service';

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
  // Get current user with users service
  const currentUser = UsersService.getCurrentUser();

  return (
    <>
      <div className='container mx-auto px-4'>
        <section className='hero bg-lolDark text-white py-20'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold'>
              Bienvenue dans le monde de League of Legends IA
            </h1>
            <p className='text-xl mt-4'>
              Dialoguez avec vos champions préférés grâce à notre IA avancée.
            </p>
          </div>
        </section>

        <section className='my-10'>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            className='carousel-container'
          >
            <div className='carousel-image-container'>
              <img
                src={characterImage1}
                alt='Character 1'
                className='carousel-image'
              />
            </div>
            <div className='carousel-image-container'>
              <img
                src={characterImage2}
                alt='Character 2'
                className='carousel-image'
              />
            </div>
            <div className='carousel-image-container'>
              <img
                src={characterImage3}
                alt='Character 3'
                className='carousel-image'
              />
            </div>
          </Carousel>
        </section>

        <section className='my-10'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold'>
              Découvrez l'IA League of Legends
            </h2>
            <p className='mt-4'>
              Interagissez avec une IA capable de simuler des conversations avec
              des personnages emblématiques du jeu. Apprenez-en plus sur leurs
              histoires, leurs compétences et plongez dans l'univers de LoL
              comme jamais auparavant.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='bg-gray-100 py-10'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-6'>FAQ</h2>
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
              <div className='text-center p-4 shadow-lg rounded-lg bg-white'>
                <p className='text-lg font-semibold'>
                  "L'expérience avec l'IA était incroyable, j'ai vraiment senti
                  que j'étais en train de parler à Ashe!"
                </p>
                <p className='mt-2 text-sm text-gray-600'>- Jean Dupont</p>
              </div>
              <div className='text-center p-4 shadow-lg rounded-lg bg-white'>
                <p className='text-lg font-semibold'>
                  "J'ai été surpris par la qualité des réponses, c'est comme si
                  le personnage était réel."
                </p>
                <p className='mt-2 text-sm text-gray-600'>- Marie Curie</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
