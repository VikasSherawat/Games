import React from 'react';
import Card from './Square';
import { computeImageName } from './helper';
import { calculateWinner } from './helper';
import { pickCard } from './helper';
import { getScore } from './helper';
import { canDrawOneMoreCard } from './helper';
import Score from './Score';
import { Button } from 'reactstrap';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(6).fill(null),
            dealer: 0,
            player: 0,
        };

        this.reset = this.reset.bind(this);
    }

    reset() {
        this.setState({
            squares: Array(6).fill(null),
            dealer: 0,
            player: 0,
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
        return <Card
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
            src={imagePath}
        />;
    }

    handleClick(index) {
        const squares = this.state.squares.slice();
        let turn;

        if (squares[index]) {
            return;
        }

        if (squares && squares[0] && squares[1] && squares[3] && squares[4]) {
            turn = canDrawOneMoreCard(squares, this.state.dealer, this.state.player);
        }
        if (turn === "none") {
            return;
        }
        if ((index > 2 && turn === "dealer") || (index < 3 && turn === "player")) {
            return
        }

        let card = pickCard();
        let {
            dealer,
            player
        } = this.state;

        if (index < 3) {
            dealer += getScore(card);
            dealer = dealer > 9 ? dealer % 10 : dealer
        } else {
            player += getScore(card);
            player = player > 9 ? player % 10 : player
        }

        squares[index] = card;
        this.setState({
            squares,
            dealer,
            player,
        });
    }

    render() {
        let status = "";
        const squares = this.state.squares.slice();
        let turn;
        if (squares && squares[0] && squares[1] && squares[3] && squares[4]) {
            turn = canDrawOneMoreCard(squares, this.state.dealer, this.state.player);
        }
        if (turn === "none") {
            const winner = calculateWinner(this.state.squares);
            if (winner && winner !== "tie") {
                status += " Winner is " + winner;
            } else if (winner === "tie") {
                status += "Bloody hell. It's a tie!!";
            }
        }

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="scoreSection">
                    <Score class="score" value={this.state.player} />
                    <Score class="score" value={this.state.dealer} />

                </div>
                <div>
                    <Score class="result" value={status} />
                    <Button id ="btnReset" color="warning btn-lg" onClick={this.reset}>Play Again!</Button>
                </div>

            </div>
        );
    }
}
export default Board;