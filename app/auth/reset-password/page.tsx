"use client"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('/images/medical-ai-background.png');
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 2rem;

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

const BackLink = styled.a`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 10;
  transition: color 0.3s ease;

  &:hover {
    color: #29ABE2;
  }
`

const FormContainer = styled.div`
  width: 100%;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
  animation: ${fadeIn} 0.5s ease-out forwards;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 1rem;
  text-align: center;
`

const FormDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.5;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(41, 171, 226, 0.4);

  &:hover {
    background: #1C8CB8;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(41, 171, 226, 0.6);
  }
`

export default function ResetPasswordPage() {
  return (
    <Container>
      <Link href="/auth" passHref>
        <BackLink>
          <ArrowLeft size={20} style={{ marginRight: "0.5rem" }} />
          Back to Login
        </BackLink>
      </Link>

      <FormContainer>
        <FormTitle>Reset Password</FormTitle>
        <FormDescription>Enter your email address and we'll send you a link to reset your password.</FormDescription>

        <Form>
          <FormGroup>
            <IconWrapper>
              <Mail size={18} />
            </IconWrapper>
            <Input type="email" placeholder="Email" required />
          </FormGroup>
          <SubmitButton type="submit">Send Reset Link</SubmitButton>
        </Form>
      </FormContainer>
    </Container>
  )
}

