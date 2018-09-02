import React from 'react';
import Square from './Square';
import { computeImageName } from './helper';
import { calculateWinner } from './helper';
import { pickCard } from './helper';
import { getScore } from './helper';
import Score from './Score';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(6).fill(null),
            dealer:0,
            banker:0,
        };

        this.reset = this.reset.bind(this);
    }

    reset() {
        this.setState({
            squares: Array(6).fill(null),
            dealer:0,
            banker:0,
        })
    }

    renderSquare(i) {
        let imageName = computeImageName(this.state.squares[i]);
        let imagePath;
        if (!imageName) {
            imagePath = `/images/back.png`;
        } else {
            imagePath = `/images/${imageName}.png`;
        }
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
            src={imagePath}
        />;
    }

    handleClick(index) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[index]) {
            return;
        }

        let card = pickCard();
        let dealerScore=this.state.dealer;
        let bankerScore=this.state.banker;
        if(index<3){
            dealerScore += getScore(card);
            dealerScore = dealerScore > 9 ? dealerScore % 10 : dealerScore
        }else{
            bankerScore += getScore(card);
            bankerScore = bankerScore > 9 ? bankerScore % 10 : bankerScore
        }
        squares[index] = card;
        this.setState({
            squares: squares,
            dealer:dealerScore,
            banker:bankerScore,  
        })
    }

    render() {
        let status = "Bacarrat Game:";
        const winner = calculateWinner(this.state.squares);

        if (winner && winner !== "tie") {
            status += " Winner is " + winner + " player!";
        } else if (winner === "tie") {
            status += "Oh no. It's a tie!!";
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    <Score value={this.state.dealer}/>
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    <Score value={this.state.banker}/>
                </div>
                <button onClick={this.reset}>Play Again</button>
            </div>
        );
    }
}

export default Board;