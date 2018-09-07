var cardSuitNames = ["clubs", "diamonds", "hearts", "spades"];

export function calculateWinner(squares) {
    let names = ["tie", "Dealer", "Player"];
    
    let dealer = getDealerScore(squares);
    let player = getPlayerScore(squares);

    let winner = findWinner(dealer, player);
    console.log("Dealer Score is "+dealer);
    console.log("Player Score is "+player);
    return names[winner];
}

function getDealerScore(squares){
    return (extractNumber(squares[0]) + extractNumber(squares[1])+ extractNumber(squares[2])) % 10;
}

function getPlayerScore(squares){
    return (extractNumber(squares[3]) + extractNumber(squares[4])+ extractNumber(squares[5])) % 10;
}

export function canDrawOneMoreCard(squares, dealer, player){
    const NONE = "none";
    let turn;

    if (squares && squares[0] && squares[1] && squares[3] && squares[4] && squares[2] && squares[5]) {
        turn= NONE;
    } else if(dealer>=8 || player>=8){
        turn= NONE;
    } else if(player <=5 && !(squares[3] && squares[4] && squares[5])){
        turn= "player";
    } else if(dealer<=5 && !(squares[0] && squares[1] && squares[2])){
        turn= "dealer";
    }else{
        turn = NONE;
    }
    console.log("Next turn is "+turn);
    return turn;
}



export function getScore(card) {
    let sum = 0
    sum = extractNumber(card);
    return sum > 9 ? sum % 10 : sum;
}

function extractNumber(card) {
    if(!card){
        return 0;
    }
    const number = parseInt(card.split(":")[0], 10);
    return number > 10 ? 0 : number;
}

function findWinner(dealerScore, playerScore) {
    if (dealerScore > playerScore) {
        return 1;
    } else if (dealerScore < playerScore) {
        return 2;
    } else {
        return 0;
    }
}

export function pickCard() {
    let cardNumber = generateRandomNumber(13);
    let cardSuit = generateRandomNumber(4) - 1;
    let value = cardNumber.toString() + ":" + cardSuit.toString();
    return value;
}

function generateRandomNumber(maxNumber) {
    return Math.floor((Math.random() * maxNumber) + 1);
}

export function computeImageName(value) {
    if (!value) {
        return null;
    }
    const faceCards = ["jack", "queen", "king"];
    const constantString = "_of_"
    let number = parseInt(value.split(":")[0], 10);
    let cardSuit = parseInt(value.split(":")[1], 10);
    if (number > 10) {
        number = faceCards[number - 11];
    }
    return number + constantString + cardSuitNames[cardSuit];
}

export default generateRandomNumber;