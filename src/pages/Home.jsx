import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import heroBackground from '../assets/images/sfongo_home.jpg';

const HomeContainer = styled.div`
  padding-top: 80px; // Per compensare la navbar fissa
`;

const HeroSection = styled.section`
  height: 80vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBackground});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 0 20px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  max-width: 800px;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
`;

const Button = styled(motion.button)`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #2980b9;
  }
`;
const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
`;

const ContentSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #3498db;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #2c3e50;
`;

const FeatureDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
`;

const CtaSection = styled.section`
  background-color: #3498db;
  color: white;
  padding: 5rem 2rem;
  text-align: center;
`;

const CtaTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const CtaDescription = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const Home = () => {
    return (
      <HomeContainer>
        <HeroSection>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Benvenuti in Kampè
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Un'associazione culturale dedicata alla promozione di arte, cultura e sostenibilità nella nostra comunità.
          </HeroSubtitle>
          <Button
            as={Link}
            to="/chi-siamo"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Scopri di più
          </Button>
        </HeroSection>
  
        <ContentSection>
          <AnimatedSection>
            <SectionTitle>Chi Siamo</SectionTitle>
            <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem', color: '#7f8c8d', lineHeight: '1.6' }}>
              Kampè è un'associazione culturale nata dalla passione condivisa per l'arte, la cultura e l'impegno sociale. 
              Il nostro obiettivo è creare spazi di incontro, dialogo e crescita per tutta la comunità.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
          <Features>
            <FeatureCard whileHover={{ y: -10 }}>
              <FeatureIcon>🎨</FeatureIcon>
              <FeatureTitle>Arte e Cultura</FeatureTitle>
              <FeatureDescription>
                Promuoviamo espressioni artistiche e culturali in tutte le loro forme, creando opportunità per artisti emergenti e consolidati.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard whileHover={{ y: -10 }}>
              <FeatureIcon>🌱</FeatureIcon>
              <FeatureTitle>Sostenibilità</FeatureTitle>
              <FeatureDescription>
                Sviluppiamo progetti che promuovono uno stile di vita sostenibile, attento all'ambiente e al benessere della comunità.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard whileHover={{ y: -10 }}>
              <FeatureIcon>🤝</FeatureIcon>
              <FeatureTitle>Comunità</FeatureTitle>
              <FeatureDescription>
                Crediamo nel potere della collaborazione e lavoriamo per costruire una comunità inclusiva, aperta e solidale.
              </FeatureDescription>
            </FeatureCard>
          </Features>
        </AnimatedSection>
      </ContentSection>

      <CtaSection>
        <AnimatedSection>
          <CtaTitle>Partecipa ai nostri eventi</CtaTitle>
          <CtaDescription>
            Scopri il calendario degli eventi e dei progetti che abbiamo programmato per i prossimi mesi. Ogni occasione è un'opportunità per crescere insieme.
          </CtaDescription>
          <Button
            as={Link}
            to="/eventi"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Esplora gli eventi
          </Button>
        </AnimatedSection>
      </CtaSection>
    </HomeContainer>
  );
};

export default Home;
  