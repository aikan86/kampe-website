import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 3rem 2rem;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  text-align: left;
`;

const FooterTitle = styled.h3`
  color: #3498db;
  margin-bottom: 1rem;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterItem = styled.li`
  margin-bottom: 0.5rem;
`;

const FooterLink = styled.a`
  color: #ecf0f1;
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: #3498db;
  }
`;

const Copyright = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #34495e;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Kampè</FooterTitle>
          <p>Associazione culturale dedicata alla promozione di arte, cultura e sostenibilità nella comunità locale.</p>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contatti</FooterTitle>
          <FooterList>
            <FooterItem>Email: info@kampe.org</FooterItem>
            <FooterItem>Telefono: +39 012 3456789</FooterItem>
            <FooterItem>Indirizzo: Via Roma 123, Milano</FooterItem>
          </FooterList>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Collegamenti</FooterTitle>
          <FooterList>
            <FooterItem><FooterLink href="/">Home</FooterLink></FooterItem>
            <FooterItem><FooterLink href="/chi-siamo">Chi Siamo</FooterLink></FooterItem>
            <FooterItem><FooterLink href="/eventi">Eventi e Progetti</FooterLink></FooterItem>
            <FooterItem><FooterLink href="/contatti">Contatti</FooterLink></FooterItem>
          </FooterList>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Social</FooterTitle>
          <FooterList>
            <FooterItem><FooterLink href="https://facebook.com" target="_blank">Facebook</FooterLink></FooterItem>
            <FooterItem><FooterLink href="https://instagram.com" target="_blank">Instagram</FooterLink></FooterItem>
            <FooterItem><FooterLink href="https://twitter.com" target="_blank">Twitter</FooterLink></FooterItem>
          </FooterList>
        </FooterSection>
      </FooterContent>
      <Copyright>
        <p>&copy; {new Date().getFullYear()} Associazione Kampè. Tutti i diritti riservati.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
