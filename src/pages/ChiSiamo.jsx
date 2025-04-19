import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const ChiSiamoContainer = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
`;

const HeaderSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StorySection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-bottom: 5rem;
  align-items: center;
`;

const StoryImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const StoryContent = styled.div``;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const SectionText = styled.p`
  color: #34495e;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const TeamSection = styled.div`
  margin-top: 5rem;
`;

const TeamTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 3rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamCard = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
`;

const TeamImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const TeamInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const TeamName = styled.h3`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const TeamRole = styled.p`
  color: #3498db;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const TeamBio = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
`;

const ChiSiamo = () => {
    // Dati fittizi del team
    const teamMembers = [
      {
        id: 1,
        name: 'Laura Bianchi',
        role: 'Presidente',
        bio: 'Fondatrice di Kampè, Laura ha una passione per l\'arte e la cultura che ha guidato la sua visione per l\'associazione sin dall\'inizio.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 2,
        name: 'Marco Rossi',
        role: 'Direttore Artistico',
        bio: 'Con un background in arti visive e teatro, Marco coordina le attività artistiche dell\'associazione e cura l\'allestimento degli eventi.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 3,
        name: 'Giulia Verdi',
        role: 'Responsabile Progetti',
        bio: 'Giulia si occupa della pianificazione e gestione dei progetti, con un focus particolare sulle iniziative di sostenibilità ambientale.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 4,
        name: 'Alessandro Neri',
        role: 'Comunicazione e Social Media',
        bio: 'Alessandro gestisce la comunicazione dell\'associazione, curando i contenuti web e la presenza sui social media.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ];
  
    return (
      <ChiSiamoContainer>
        <ContentSection>
          <HeaderSection>
            <AnimatedSection>
              <Title>Chi Siamo</Title>
              <Subtitle>
                Scopri la storia, la missione e le persone che rendono viva la nostra associazione culturale Kampè.
              </Subtitle>
            </AnimatedSection>
          </HeaderSection>

          <AnimatedSection>
          <StorySection>
            <StoryImage src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="La nostra storia" />
            <StoryContent>
              <SectionTitle>La Nostra Storia</SectionTitle>
              <SectionText>
                Kampè è nata nel 2018 dall'idea di un gruppo di amici con una passione comune per l'arte e la cultura. Quello che è iniziato come un semplice progetto per organizzare eventi culturali locali è cresciuto fino a diventare un'associazione riconosciuta e radicata nel territorio.
              </SectionText>
              <SectionText>
                Negli anni abbiamo ampliato le nostre attività, includendo iniziative di sostenibilità ambientale, laboratori artistici per tutte le età e collaborazioni con altre realtà culturali della zona, sempre mantenendo al centro la nostra missione originale: creare spazi di incontro e crescita per la comunità.
              </SectionText>
            </StoryContent>
          </StorySection>
        </AnimatedSection>

        <AnimatedSection>
          <StorySection>
            <StoryContent>
              <SectionTitle>La Nostra Missione</SectionTitle>
              <SectionText>
                La missione di Kampè è promuovere l'arte e la cultura come strumenti di coesione sociale, crescita personale e sviluppo della comunità. Crediamo fermamente nel potere trasformativo della creatività e dell'incontro tra diverse espressioni culturali.
              </SectionText>
              <SectionText>
                Ci impegniamo inoltre a sensibilizzare la comunità sull'importanza della sostenibilità ambientale e delle pratiche di vita responsabili, integrando questi valori in tutte le nostre attività.
              </SectionText>
            </StoryContent>
            <StoryImage src="https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="La nostra missione" />
          </StorySection>
        </AnimatedSection>
        
        <TeamSection>
          <AnimatedSection>
            <TeamTitle>Il Nostro Team</TeamTitle>
            <TeamGrid>
              {teamMembers.map((member) => (
                <TeamCard 
                  key={member.id}
                  whileHover={{ y: -10 }}
                >
                  <TeamImage src={member.image} alt={member.name} />
                  <TeamInfo>
                    <TeamName>{member.name}</TeamName>
                    <TeamRole>{member.role}</TeamRole>
                    <TeamBio>{member.bio}</TeamBio>
                  </TeamInfo>
                </TeamCard>
              ))}
            </TeamGrid>
          </AnimatedSection>
        </TeamSection>
      </ContentSection>
    </ChiSiamoContainer>
  );
};

export default ChiSiamo;
