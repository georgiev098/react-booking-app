import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>HEADER</h1>
    </StyledHeader>
  );
}
