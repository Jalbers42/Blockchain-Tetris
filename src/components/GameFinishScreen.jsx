import React, { useState, useEffect, useRef }  from 'react';
import { StyledGameFinishScreen } from './styles/StyledGameFinishScreen';
import StartButton from './StartButton';
// import { StyledScoreText } from './styles/StyledGameFinishScreen';

// WEB3
import { useStateContext } from '../context';
import { ethers } from 'ethers';

const GameFinishScreen = ({ score }) => {
	// WEB3
	const [isLoading, setIsLoading] = useState(false);
	const [highscores, setHighscores] = useState([]); 
	const { address, contract, getHighscores, createHighscore, collectPrize1 } = useStateContext();

    const [name, setName] = useState('');
    const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

    const callCreateHighscore = async () => {
        if (name === '') {
            alert('Please enter a name');
          } else {
              setIsLoading(true);
              const data = await createHighscore(name, score);
              setIsLoading(false);
          }
    }

    return (
        <StyledGameFinishScreen>
        
            <div style={{fontSize:'2em', marginBottom: '0.5em', color: '#FFAE42'}}>Congratulations</div>
            <div style={{fontSize:'1em', marginBottom: '0.5em'}}>Your Score: {score}</div>
            <div>
                <label htmlFor="name">Enter Name:</label>
                <input
                type="text"
                id="name"
                ref={nameInputRef}
                value={name}
                onChange={handleNameChange}
                style={{fontSize:'1em', outline: 'none', border: 'none', color: '#ffffff', backgroundColor: 'rgba(0, 0, 0, 0.5)', lineHeight: '1.5', fontFamily: 'Pixel, Arial, Helvetica, sans-serif'}}
                />
            </div>
            <div style={{ width: '100%', maxWidth:'200px', marginTop: '30px'}}>
		        <StartButton disabled={name === ''} callback={callCreateHighscore} style={{width: '100%', maxWidth:'200px', marginTop: '20px'}} text="Save Score on Blockchain" />
            </div>
        </StyledGameFinishScreen>
    )
}

export default GameFinishScreen;