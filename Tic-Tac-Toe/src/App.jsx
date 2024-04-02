import { useState } from 'react';
import Player from "./components/player"
import GameBoard from "./components/GameBoard"
import Log from './components/Log';
import { WINNING_COMBINATIONS, initialGameBoard } from './winning-combinations';
import GameOver from './components/GameOver';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol 
      && secondSquareSymbol === thirdSquareSymbol
      ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array => [...array])];
    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col } = square;

        gameBoard[row][col] = player;
    }
    return gameBoard
}

function App() {
  const [gameTurns,setGameTurns] = useState([])
  const [players, setPlayers] =useState(PLAYERS)
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard,players)
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{
        square: { row: rowIndex, col: colIndex} 
        ,player: currentPlayer
      },...prevTurns];
      return updatedTurns
    });
  }

  function handleMatchRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player 
            initialName = {PLAYERS.X} 
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
            />
          <Player 
            initialName={PLAYERS.O} 
            symbol="O" 
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
            />
        </ol>
        {(winner||hasDraw) && <GameOver winner={winner} onRestart={handleMatchRestart}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board = {gameBoard}
          />
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
