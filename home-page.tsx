"use client"

import type React from "react"
import { useEffect, useState } from "react"
import styled, { keyframes, createGlobalStyle } from "styled-components"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

// Animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`

const glowEffect = keyframes`
  0% {
    text-shadow: 0 0 10px rgba(41, 171, 226, 0.5), 0 0 20px rgba(41, 171, 226, 0.3);
  }
  50% {
    text-shadow: 0 0 20px rgba(41, 171, 226, 0.8), 0 0 30px rgba(41, 171, 226, 0.5);
  }
  100% {
    text-shadow: 0 0 10px rgba(41, 171, 226, 0.5), 0 0 20px rgba(41, 171, 226, 0.3);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
`

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', 'Arial', sans-serif;
  }

  body {
    overflow: hidden;
  }
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('/images/medical-ai-background.png');
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg, 
      rgba(0, 32, 63, 0.85) 0%, 
      rgba(0, 62, 100, 0.9) 50%, 
      rgba(0, 32, 63, 0.85) 100%
    );
  }
`

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  color: white;
  text-align: center;
  z-index: 10;
  letter-spacing: 4px;
  animation: ${fadeIn} 2s ease-out forwards, ${float} 6s ease-in-out infinite, ${glowEffect} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 1rem;
  z-index: 10;
  opacity: 0;
  animation: ${fadeIn} 2s ease-out 0.5s forwards;
  max-width: 80%;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const ClickIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  z-index: 10;
  opacity: 0;
  animation: ${fadeIn} 2s ease-out 1.5s forwards;
`

const ClickText = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
`

const ChevronIcon = styled.div`
  animation: ${bounce} 2s infinite;
`

const InfoButton = styled.button`
  position: absolute;
  bottom: 40px;
  right: 40px;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid white;
  background-color: transparent;
  color: white;
  z-index: 20;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`

const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(41, 171, 226, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(41, 171, 226, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 1;
`

const ParticleContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
`

interface ParticleProps {
  top: string
  left: string
  size: string
  duration: string
  delay: string
}

const Particle = styled.div<ParticleProps>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: rgba(41, 171, 226, 0.6);
  border-radius: 50%;
  animation: ${float} ${(props) => props.duration} ease-in-out infinite;
  animation-delay: ${(props) => props.delay};
  filter: blur(1px);
`

const MedicalIcon = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  opacity: 0.15;
  z-index: 1;
  animation: ${pulse} 8s ease-in-out infinite;
  
  svg {
    width: 100%;
    height: 100%;
    fill: rgba(255, 255, 255, 0.8);
  }
`

export default function HomePage() {
  const [particles, setParticles] = useState<React.ReactNode[]>([])

  useEffect(() => {
    // Generate random particles
    const newParticles = []
    for (let i = 0; i < 50; i++) {
      const top = `${Math.random() * 100}%`
      const left = `${Math.random() * 100}%`
      const size = `${Math.random() * 6 + 2}px`
      const duration = `${Math.random() * 10 + 5}s`
      const delay = `${Math.random() * 5}s`

      newParticles.push(<Particle key={i} top={top} left={left} size={size} duration={duration} delay={delay} />)
    }
    setParticles(newParticles)
  }, [])

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent click from propagating to the entire page
    window.open("/about", "_blank")
  }

  return (
    <>
      <GlobalStyle />
      <Link href="/dashboard" passHref>
        <Container>
          <GridOverlay />
          <ParticleContainer>{particles}</ParticleContainer>
          <MedicalIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
            </svg>
          </MedicalIcon>
          <Title>DEEPVISION LAB</Title>
          <Subtitle>Advanced disease detection using artificial intelligence</Subtitle>
          <ClickIndicator>
            <ClickText>Click anywhere to continue</ClickText>
            <ChevronIcon>
              <ChevronDown size={24} />
            </ChevronIcon>
          </ClickIndicator>
          <InfoButton onClick={handleInfoClick}>Learn More</InfoButton>
        </Container>
      </Link>
    </>
  )
}

