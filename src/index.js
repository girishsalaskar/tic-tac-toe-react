import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      history: [Array(9).fill(null)]
    }
  }

  boxClicked(i) {
    const squares = this.state.squares.slice();
    let history = this.state.history.slice();
    history.push(squares);
    if(calculateWinner(squares) || squares[i]) {
      history = [];
      return;
    }
    squares[i] = this.state.xIsNext?'X':'O';
    this.setState({ squares: squares, xIsNext:!this.state.xIsNext, history: history });
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]}
      onClick={() => this.boxClicked(i)} />;
  }

  jumpTo(number) {
    const squares = this.state.history[number];
    const xIsNext = number===0;
    const history = this.state.history.slice(0, number+1);
    this.setState({squares:squares, xIsNext:xIsNext, history:history});
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const status = (winner?("'" + winner + "' is winner"):(this.state.squares.indexOf(null)>-1?("'" + (this.state.xIsNext?'X':'O') + "'s Turn"):'Tie'));
    const moves = this.state.history.map((history, number) => {
      const label = 'Go to ' + (number?'# '+number:'Start');
      return (
        <li key={number}>
          <button onClick={() => this.jumpTo(number)}>{label}</button>
        </li>
      );
    });

    return (
      <div>
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        <div className="game-info">
            <div className='game-status'><span>{status}</span></div>
            {/* <ol>{moves}</ol>*/}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
