const processData = require('../helpers').processData;

const getCards = (rawCardData) => {
  let cardIndex = 0;

  return rawCardData.reduce((cards, row) => {
    if (row === '') {
      cardIndex++;
      cards[cardIndex] = [];
    } else {
      const newCard = cards[cardIndex].concat(row.trim().split(' ').filter(num => num !== ''));
      cards[cardIndex] = newCard;
    }

    return cards;
  },[[]]);
}

const markCards = (cards, calledNumber) => 
  cards.map(card => card.map(val => val === calledNumber ? 'X' : val));

const winConditions = [
  ...[0,5,10,15,20].map(num => [0,1,2,3,4].map(n => [num + n]).flat()),
  ...[0,1,2,3,4].map(num => [0,5,10,15,20].map(n => [num + n]).flat())
];

const cardIsWinner = card => 
  winConditions.some(condition => condition.every((pos) => card[pos] === 'X'));

const findWinner = (cards) => cards.find(card => cardIsWinner(card));

const playGame = (input, cards) => {
  let markedCards = [...cards];
  let round = 0;
  let winner;

  while (!winner && round < input.length) {
    const calledNumber = input[round];

    markedCards = markCards(markedCards, calledNumber);
    winner = findWinner(markedCards);

    if(!winner) {
      round++;
    }
  }

  return [winner, input[round]];
}

const solver = (data) => {
  const [input, ...rest] = data.split("\n");

  // remove the first empty line
  const cards = getCards(rest.slice(1));

  const [winningBoard, lastCalled] = playGame(input.split(','), cards);

  if (winningBoard) {
    const unmarkedNumbers = winningBoard
      .filter(val => val !== 'X')
      .reduce((b, a) => Number(a) + b, 0);
      
    return unmarkedNumbers * Number(lastCalled);
  } else {
    return 'no winner';
  }
}

processData("04/input.txt", solver);
