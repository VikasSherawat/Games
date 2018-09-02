var cardSuitNames = ["clubs", "diamonds", "hearts", "spades"];

export function calculateWinner(squares) {
    let names = ["tie", "first", "second"];
    if (!squares || !squares[0] || !squares[1] || !squares[3] || !squares[4]) {
        return null;
    }

    let firstPlayer = (extractNumber(squares[0]) + extractNumber(squares[1])) % 10;
    let secondPlayer = (extractNumber(squares[3]) + extractNumber(squares[4])) % 10;
    let winner = findWinner(firstPlayer, secondPlayer);

    if (winner === 0) {
        if (!squares[2] || !squares[5]) {
            return null;
        }
        firstPlayer = (firstPlayer + extractNumber(squares[2])) % 10;
        secondPlayer = (secondPlayer + extractNumber(squares[5])) % 10;
        winner = findWinner(firstPlayer, secondPlayer);
    }
    return names[winner];
}
export function getScore(card) {
    let sum = 0
    sum = extractNumber(card);
    return sum > 9 ? sum % 10 : sum;
}

function extractNumber(card) {
    const number = parseInt(card.split(":")[0], 10);
    return number > 10 ? 0 : number;
}

function findWinner(firstPlayer, secondPlayer) {
    if (firstPlayer > secondPlayer) {
        return 1;
    } else if (firstPlayer < secondPlayer) {
        return 2;
    } else {
        return 0;
    }
}

export function pickCard() {
    let cardNumber = generateRandomNumber(13);
    let cardSuit = generateRandomNumber(4) - 1;
    let value = cardNumber.toString() + ":" + cardSuit.toString();
    console.log("Card Generated Is " + value);
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