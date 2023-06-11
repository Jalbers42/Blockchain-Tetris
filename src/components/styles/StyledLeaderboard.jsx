import styled from 'styled-components';

export const StyledLeaderboard = styled.div`
 box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Justify text to the left */
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${props => (props.gameOver ? 'red' : '#999')};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #333;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }
`;