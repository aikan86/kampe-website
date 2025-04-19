import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Componenti principali
const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 100;
  box-sizing: border-box;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #3a6ea5;
  text-decoration: none;
`;

// Hamburger menu
const MenuToggle = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 110;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  span {
    height: 2px;
    width: 25px;
    background-color: #333;
    margin-bottom: 4px;
    border-radius: 5px;
    transition: all 0.3s linear;
    
    &:nth-child(1) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)'};
    }
    
    &:nth-child(2) {
      opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
      transform: ${({ isOpen }) => isOpen ? 'translateX(-20px)' : 'translateX(0)'};
    }
    
    &:nth-child(3) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'rotate(0)'};
    }
  }
`;
// Overlay per sfondo scuro quando il menu è aperto
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  z-index: 90;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

// Container per i link di navigazione
const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => isOpen ? '0' : '-100%'};
    width: 250px;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start; /* Allinea i link in alto */
    align-items: flex-end; /* Allinea i link a destra */
    background-color: #fff;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease-in-out;
    gap: 1.5rem;
    padding: 4rem 2rem 2rem 2rem; /* Padding aumentato in alto */
    z-index: 100;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #3a6ea5;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;
const Navbar = () => {
  // Stato per l'apertura/chiusura del menu mobile
  const [isOpen, setIsOpen] = useState(false);

  // Funzione per gestire l'apertura/chiusura del menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Funzione per chiudere il menu quando si clicca su un link
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <Logo to="/">Kampè</Logo>
        
        {/* Hamburger menu visibile solo su mobile */}
        <MenuToggle isOpen={isOpen} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </MenuToggle>
        
        {/* Links di navigazione */}
        <NavLinks isOpen={isOpen}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/chi-siamo" onClick={closeMenu}>Chi Siamo</NavLink>
          <NavLink to="/eventi" onClick={closeMenu}>Eventi e Progetti</NavLink>
          <NavLink to="/contatti" onClick={closeMenu}>Contatti</NavLink>
        </NavLinks>
      </Nav>
      
      {/* Overlay di sfondo scuro visibile solo quando il menu è aperto */}
      <Overlay isOpen={isOpen} onClick={closeMenu} />
    </>
  );
};

export default Navbar;
