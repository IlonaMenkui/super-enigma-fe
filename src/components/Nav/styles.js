import styled from 'styled-components';

export const LinkButton = styled.button`
  font-family: 'Open Sans', sans-serif;
  border: 0;
  background: none;
  font-size: 15px;
  padding: 20px 30px;
  color: ${({ filter, value, theme }) => (filter === value ? theme.header.activeLink : theme.header.text)};

  &:focus {
    outline: none
  }
`;
