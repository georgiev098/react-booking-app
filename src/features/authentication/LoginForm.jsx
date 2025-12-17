import { useState } from "react";
import styled from "styled-components";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import SpinnerMini from "../../ui/SpinnerMini";
import Logo from "../../ui/Logo";
import useLogin from "./useLogin";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background-color: var(--color-grey-50);
`;

const LoginBox = styled.div`
  width: 100%;
  max-width: 42rem;
  padding: 4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);

  overflow: visible;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3.2rem;

  p {
    margin-top: 0.8rem;
    color: var(--color-grey-500);
    font-size: 1.4rem;
  }
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

export default function LoginForm() {
  const [email, setEmail] = useState("test@admin.com");
  const [password, setPassword] = useState("password");
  const { mutate: login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    // login logic

    if (!email || !password) {
      return;
    }

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <LoginLayout>
      <Header>
        <Logo />
        <Heading as="h2">Log in to your account</Heading>
        <p>Enter your credentials to continue</p>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormRow label="Email address">
          <Input
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={isLoading}
          />
        </FormRow>

        <FormRow label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
          />
        </FormRow>

        <FormRow>
          <FullWidthButton
            variation="primary"
            size="large"
            disabled={isLoading}
          >
            {!isLoading ? "Login" : <SpinnerMini />}
          </FullWidthButton>
        </FormRow>
      </Form>
    </LoginLayout>
  );
}
