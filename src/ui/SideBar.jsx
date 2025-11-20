import styled from "styled-components";

const StyledSideBar = styled.aside`
  background-color: var(--color-grey-0);
  grid-row: 1 / -1;
`;

export default function SideBar() {
  return (
    <StyledSideBar>
      <h1>SIDEBAR</h1>
    </StyledSideBar>
  );
}
