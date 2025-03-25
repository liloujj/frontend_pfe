"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  background-image: url('/images/medical-ai-background.png');
  background-size: cover;
  background-position: center;
  position: relative;

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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    display: none;
  }
`

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 2rem;
  letter-spacing: 2px;
`

const FormContainer = styled.div`
  width: 100%;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out forwards;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
`

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

interface TabProps {
  $active: boolean
}

const Tab = styled.button<TabProps>`
  flex: 1;
  background: none;
  border: none;
  padding: 1rem;
  color: ${(props) => (props.$active ? "white" : "rgba(255, 255, 255, 0.6)")};
  font-size: 1rem;
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${(props) => (props.$active ? "#29ABE2" : "transparent")};
    transition: all 0.3s ease;
  }

  &:hover {
    color: white;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

const FormGroup = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #29ABE2;
    background: rgba(255, 255, 255, 0.15);
  }
`

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
`

const PasswordToggle = styled.button`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #29ABE2;
`

const CheckboxLabel = styled.label`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`

const ForgotPassword = styled.a`
  color: #29ABE2;
  font-size: 0.9rem;
  text-align: right;
  margin-top: 0.5rem;
  text-decoration: none;
  align-self: flex-end;
  transition: color 0.3s ease;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #29ABE2;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(41, 171, 226, 0.4);

  &:hover {
    background: #1C8CB8;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(41, 171, 226, 0.6);
  }
`

const InfoText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1.5rem;

  a {
    color: #29ABE2;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: white;
      text-decoration: underline;
    }
  }
`

const FeatureList = styled.div`
  max-width: 500px;
  padding: 2rem;
`

const FeatureTitle = styled.h2`
  font-size: 2.2rem;
  color: white;
  margin-bottom: 2rem;
`

const Feature = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.5s ease-out forwards;
`

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(41, 171, 226, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: #29ABE2;
`

const FeatureContent = styled.div`
  flex: 1;
`

const FeatureHeading = styled.h3`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 0.5rem;
`

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.5;
`

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const router = useRouter()

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  // Modifions la fonction handleSubmit pour ajouter des logs et s'assurer que la redirection fonctionne

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulation d'authentification
    // Dans une application réelle, vous feriez une requête à votre API

    if (isLogin) {
      // Ajoutons des logs pour déboguer
      console.log("Tentative de connexion avec:", email)

      // Simulation de connexion
      // Vérifiez le type d'utilisateur et redirigez en conséquence

      // Pour la démonstration, nous utilisons des emails spécifiques pour chaque type
      if (email === "admin@example.com") {
        console.log("Redirection vers admin dashboard")
        router.push("/dashboard/admin")
      } else if (email === "premium@example.com") {
        console.log("Redirection vers premium dashboard")
        router.push("/dashboard/premium")
      } else {
        console.log("Redirection vers patient dashboard")
        // Utilisons replace au lieu de push pour voir si cela résout le problème
        router.replace("/dashboard/patient")
      }
    } else {
      // Simulation d'inscription
      // Dans une vraie application, vous créeriez un nouvel utilisateur
      // Puis redirigeriez vers la page de connexion ou directement vers le dashboard
      alert("Account created successfully! Please log in.")
      setIsLogin(true)
    }
  }

  return (
    <Container>
      <LeftPanel>
        <Logo>DEEPVISION LAB</Logo>
        <FormContainer>
          <FormTitle>{isLogin ? "Login" : "Sign Up"}</FormTitle>
          <TabContainer>
            <Tab $active={isLogin} onClick={() => setIsLogin(true)}>
              Login
            </Tab>
            <Tab $active={!isLogin} onClick={() => setIsLogin(false)}>
              Sign Up
            </Tab>
          </TabContainer>

          {isLogin ? (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <IconWrapper>
                  <Mail size={18} />
                </IconWrapper>
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <Lock size={18} />
                </IconWrapper>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </FormGroup>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <CheckboxLabel htmlFor="remember">Remember me</CheckboxLabel>
              </CheckboxContainer>
              <ForgotPassword href="/auth/reset-password">Forgot password?</ForgotPassword>
              <SubmitButton type="submit">Login</SubmitButton>
              <InfoText>
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleForm()
                  }}
                >
                  Sign Up
                </a>
              </InfoText>
            </Form>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <IconWrapper>
                  <User size={18} />
                </IconWrapper>
                <Input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <Mail size={18} />
                </IconWrapper>
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <Lock size={18} />
                </IconWrapper>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <Lock size={18} />
                </IconWrapper>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </FormGroup>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  id="terms"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <CheckboxLabel htmlFor="terms">
                  I agree to the{" "}
                  <a href="/terms" style={{ color: "#29ABE2" }}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" style={{ color: "#29ABE2" }}>
                    Privacy Policy
                  </a>
                </CheckboxLabel>
              </CheckboxContainer>
              <SubmitButton type="submit">Sign Up</SubmitButton>
              <InfoText>
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleForm()
                  }}
                >
                  Login
                </a>
              </InfoText>
            </Form>
          )}
        </FormContainer>
      </LeftPanel>

      <RightPanel>
        <FeatureList>
          <FeatureTitle>Why join DEEPVISION LAB?</FeatureTitle>

          <Feature>
            <FeatureIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </FeatureIcon>
            <FeatureContent>
              <FeatureHeading>Access to Cutting-Edge Technology</FeatureHeading>
              <FeatureDescription>
                Use our advanced AI to detect diseases with unparalleled accuracy, based on the latest advances in deep
                learning.
              </FeatureDescription>
            </FeatureContent>
          </Feature>

          <Feature>
            <FeatureIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </FeatureIcon>
            <FeatureContent>
              <FeatureHeading>Security and Privacy</FeatureHeading>
              <FeatureDescription>
                Your medical data is protected by military-grade encryption and is never shared without your explicit
                consent.
              </FeatureDescription>
            </FeatureContent>
          </Feature>

          <Feature>
            <FeatureIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </FeatureIcon>
            <FeatureContent>
              <FeatureHeading>Fast and Reliable Results</FeatureHeading>
              <FeatureDescription>
                Get analyses in seconds, with detailed reports that you can share with your doctor.
              </FeatureDescription>
            </FeatureContent>
          </Feature>

          <Feature>
            <FeatureIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </FeatureIcon>
            <FeatureContent>
              <FeatureHeading>Medical Community</FeatureHeading>
              <FeatureDescription>
                Join a community of healthcare professionals and patients using technology to improve medical care.
              </FeatureDescription>
            </FeatureContent>
          </Feature>
        </FeatureList>
      </RightPanel>
    </Container>
  )
}

