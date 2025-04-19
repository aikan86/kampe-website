import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const PopupContainer = styled(motion.div)`
  background: white;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const PopupHeader = styled.div`
  position: relative;
  height: 250px;
`;

const PopupImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 2px;
    background: #333;
  }
  
  &:before {
    transform: rotate(45deg);
  }
  
  &:after {
    transform: rotate(-45deg);
  }
`;

const PopupContent = styled.div`
  padding: 2rem;
  overflow-y: auto;
`;

const PopupTitle = styled.h2`
  margin: 0 0 1rem;
  color: #2c3e50;
  font-size: 2rem;
`;

const PopupMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  color: #7f8c8d;
  
  svg {
    margin-right: 10px;
  }
`;

const PopupDescription = styled.div`
  color: #34495e;
  line-height: 1.6;
`;

const EventType = styled.span`
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  background-color: ${({ type }) => (type === 'evento' ? '#3498db' : '#27ae60')};
  color: white;
`;
const EventPopup = ({ event, onClose }) => {
    if (!event) return null;
    
    const { attributes } = event;
    const imageUrl = attributes.immagine?.data?.attributes?.url 
      ? `http://localhost:1337${attributes.immagine.data.attributes.url}`
      : 'https://via.placeholder.com/800x400?text=Immagine+non+disponibile';
    
    // Formatta la data
    const formatDate = (dateString) => {
      const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('it-IT', options);
    };
  
    return (
      <AnimatePresence>
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <PopupContainer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <PopupHeader>
              <PopupImage src={imageUrl} alt={attributes.titolo} />
              <CloseButton onClick={onClose} />
            </PopupHeader>
            <PopupContent>
              <EventType type={attributes.tipo || 'evento'}>
                {attributes.tipo === 'progetto' ? 'Progetto' : 'Evento'}
              </EventType>
              <PopupTitle>{attributes.titolo}</PopupTitle>
              <PopupMeta>
                <MetaItem>
                  <span>📅</span> {formatDate(attributes.data)}
                </MetaItem>
                <MetaItem>
                  <span>📍</span> {attributes.luogo}
                </MetaItem>
              </PopupMeta>
              <PopupDescription>
                {attributes.descrizione || 'Nessuna descrizione disponibile.'}
              </PopupDescription>
            </PopupContent>
          </PopupContainer>
        </Overlay>
      </AnimatePresence>
    );
  };
  
  export default EventPopup;
  