import React, { useState, useEffect } from 'react';
import { StyledLeaderboard } from './styles/StyledLeaderboard';
// WEB3
import { useStateContext } from '../context';

const shortenAddress = (address) => {
  const start = address.substring(0, 4);
  const end = address.substring(address.length - 4);
  return `${start}...${end}`;
};

const Leaderboard = () => {
	// WEB3
	const [isLoading, setIsLoading] = useState(false);
	const [highscores, setHighscores] = useState([]); 
	const { address, contract, getHighscores } = useStateContext();
  
	const fetchHighscores = async () => {
	  setIsLoading(true);
	  const data = await getHighscores();
	  setHighscores(data);
	  setIsLoading(false);
	}
  
  // Sort highscores in descending order based on score/target
  const sortedHighscores = highscores.sort((a, b) => b.score - a.score);

	useEffect(() => {
	  if(contract) fetchHighscores();
	}, [address, contract]);
	// END WEB3
  
    return (
        <StyledLeaderboard>
            <table>
                <thead>
                     <tr>
                       <th>Name</th>
                       <th>Wallet</th>
                       <th>Score</th>
                     </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="2">Loading highscores...</td>
                      </tr>
                    ) : (
                      sortedHighscores.slice(0, 10).map((highscore, index) => (
                        <tr key={index}>
                          <td>{highscore.name}</td>
                          <td style={{ fontSize: '1em', fontFamily: 'Arial' }}>
                          <a href={`https://etherscan.io/address/${highscore.wallet}`} target="_blank" rel="noopener noreferrer">
                            {shortenAddress(highscore.wallet)}
                          </a>
                          </td>
                          <td>{highscore.score}</td>
                        </tr>
                      ))
                    )}
                </tbody>
            </table>
        </StyledLeaderboard>

    )
}

export default Leaderboard;