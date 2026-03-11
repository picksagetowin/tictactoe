import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./App.css";


// 1. 개별 칸(Square)
function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      <span style={{color : value=="X" ? "#7842C0" : "#417093"}}>{value}</span>
    </button>
  );
}

// 2. 게임 판
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

 
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  useEffect(() => {
    if (winner && winner !== 'Draw') {
      // 폭죽 설정
      confetti({
        particleCount: 400,
        spread: 360,
        origin: { y: 0.6 },
        colors: winner == 'X' ? ['#7842C0', '#D4ADFF'] : ['#417093', '#ADF4FF']
      });
    }
  }, [winner]);
  let status;
  if(winner=='Draw'){
    status=`${winner}`;
  }
  else{
  status = winner? (
      <>
      Winner: <span style={{ color : winner == 'X' ? "#7842C0" : "#417093"}}>{winner=="X" ? "X" : "O"}</span>
      </>
    ) : (
    <>
    Next player:  <span style={{color : xIsNext ? "#7842C0" : "#417093"}}>{xIsNext ? "X" : "O"}</span>
    </>
    )

  }
  
  return (
    <div id="container" style={{backgroundColor: winner === 'Draw' ? '#cccccc' 
    : (winner === 'X' || (xIsNext && !winner) ? "rgb(212, 173, 255)" : "#ADF4FF") }}>
      <h1 style={{color: winner == 'Draw' ? '#000000': (winner == 'X' || (xIsNext && !winner) ? "#7842C0" : "#417093")}}>
        Tic-Tac-Toe
      </h1>
      <>
        <div className="status" >
          {status}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 60px)", border: "1px solid #000", borderRadius: "9px", overflow: "hidden"}}>
          {squares.map((value, i) => (
            <Square key={i} value={value} onSquareClick={() => handleClick(i)} />
          ))}
        </div>

        <button
          className="reset-button"
          onClick={reset}
        >
          Restart Game
        </button>
      </>
    </div>
  );
}



// 3. 승자 계산 로직
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] == squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (!squares.includes(null)){
      return 'Draw';
    }
  
  return null;
}