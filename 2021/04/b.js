const processData = require('../helpers').processData;

const getCards = (rawCardData) => {
  let cardIndex = 0;

  return rawCardData.reduce((cards, row) => {
    if (row === '') {
      cardIndex++;
      cards[cardIndex] = [];
    } else {
      const newCard = cards[cardIndex].concat(row
        .trim()
        .split(' ')
        .filter(num => num !== ''));

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

const findWinners = (cards) => {
  const winners = [];

  // we need the index of the winning cards so that we can pull them out of the cards in play
  cards.forEach((card, index) => 
    cardIsWinner(card) ? winners.push(index) : null);

  return winners;
}

const pullOutWinningCards = (markedCards, calledNumber) => {
  const winnerIndexList = findWinners(markedCards);
  const newWinners = [];
  let newMarkedCards = [...markedCards]

  while (winnerIndexList.length) {
    // start at the end so we don't mess up the index as we splice out cards
    const winner = winnerIndexList.pop();

    newWinners.push({
      called: calledNumber,
      card: newMarkedCards[winner],
    });

    newMarkedCards.splice(winner, 1);
  }

  return {
    markedCards: newMarkedCards,
    newWinners
  };
}

const playGame = (input, cards) => {
  let markedCards = [...cards];
  let round = 0;
  let winners = [];

  // on each round the "won" cards are removed
  while (markedCards.length > 0 && round < input.length) {
    const calledNumber = input[round];
    let newWinners;

    markedCards = markCards(markedCards, calledNumber);
    ({ markedCards, newWinners } = pullOutWinningCards(markedCards, calledNumber))

    winners = [
      ...winners,
      ...newWinners,
    ];

    round++;
  }

  const {called: lastWinnerInput, card: lastWinner} = winners.pop();
  return [lastWinner, lastWinnerInput];
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
