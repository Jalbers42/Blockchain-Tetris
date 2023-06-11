import React, { useState, useEffect } from 'react';

// WEB3
import { useStateContext } from '../context';

// Check collision
import { createStage, checkCollision } from '../gameHelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import Display2 from './Display2';
import Display3 from './Display3';
import StartButton from './StartButton';
import ConnectButton from './ConnectButton';
import Leaderboard from './Leaderboard';
import GameFinishScreen from './GameFinishScreen';

const Tetris = () => {

	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
	const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
	const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

	// WEB3
	const { connect, address, contract, getCampaigns } = useStateContext();

	console.log('re-render');
	
	const movePlayer = dir => {
		if (!checkCollision(player, stage, { x: dir, y: 0}))
		{
			updatePlayerPos({ x: dir, y: 0});
		}
	}

	const startGame = () => {
		// Reset everything
		console.log("Start Game");
		setStage(createStage());
		setDropTime(1000);
		resetPlayer();
		setGameOver(false);
		setScore(0);
		setRows(0);
		setLevel(0);
	}

	const drop = () => {
		// Increase level when player has cleared 10 rows
		if (rows > (level + 1) * 3) {
			setLevel(prev => prev + 1);
			// Increase speed
			setDropTime(700 / (level + 1));
		}

		if (!checkCollision(player, stage, { x: 0, y: 1}))
		{
			updatePlayerPos({ x:0, y:1, collided: false });
		} else {
			// Game Over
			if (player.pos.y < 1) {
				console.log("GAME OVER");
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPos({ x: 0, y: 0, collided: true });
		}
	}

	const keyUp = ({ keyCode }) => {
		if (!gameOver) {
			if (keyCode === 40) {
				setDropTime(1000 / (level + 1) + 200);
			}
		}
	}

	const dropPlayer = () => {
		setDropTime(null);
		drop();
	}

	const move = ({ keyCode }) => {
		if (!gameOver) {
			if (keyCode === 37) {
				movePlayer(-1);
			} else if (keyCode === 39) {
				movePlayer(1);
			} else if (keyCode === 40) {
				dropPlayer(0);
			} else if (keyCode === 32) {
				event.preventDefault();
				rotatePlayer(stage, 1);
			}
		}
	}

	useInterval(() => {
		drop();
	}, dropTime)

	return (
		<StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
			<StyledTetris>
				<Stage stage={stage}/>
				<div style={{width: '100%'}}>
					<Display2 text="Blockchain Tetris" />;
					<Display3 text="Play and save your score on the sepolia blockchain."/>;
					<div style={{ display: 'flex' }}>
						<aside>
							{ gameOver ? (
								<Display gameOver={gameOver} text="Game Over" />
							) : (
								<div>
									<Display text={`Score: ${score}`} />;
									<Display text={`Rows: ${rows}`} />;
									<Display text={`Level: ${level}`}/>;
								</div>
							)}
							<StartButton callback={address ? startGame : connect} text={address ? "Start Game" : "Connect Wallet"} />
						</aside>
						<aside style={{width: '100%', maxWidth: '2000px'}}>
							<Leaderboard />
						</aside>
					</div>
				</div>
				{ gameOver && <GameFinishScreen score={score} />}	
			</StyledTetris>
		</StyledTetrisWrapper>
	)
} 

export default Tetris;