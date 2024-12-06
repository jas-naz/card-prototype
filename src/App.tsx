import { useState } from 'react'
import Card from './Card'
import './App.css'
import { names } from './data/names';
import { generalStrings } from './data/generalStrings';
import { getAllCardIds, getCardById } from './data/masterCards';

const versionNumber = "0.0.001";
const cardList = {
  opponentHandCards: [
    { title: '*****' },
    { title: '*****' },
    { title: '*****' },
    { title: '*****' },
    { title: '*****' },
  ],
  opponentCards: [
    { title: 'Zhala Ironmaw' },
    { title: 'Xaldrith Fireheart' },
    { title: 'Finnan Underbough' },
    { title: 'Ragnok Voidwalker' },
    { title: 'Darian Windmere' },
  ],
  playerCards: [
    { title: '' },
  ]
}
function App() {
  // const [count, setCount] = useState(0);
  const [opponentHandCards, setOpponentHandCards] = useState(cardList.opponentHandCards); 
  const [playerCards, setPlayerCards] = useState(cardList.playerCards);
  const [handCards, setHandCards] = useState([{ title: '' }]);
  const [characterNames] = useState(
    [
      names['Human Names'], names['Elf Names'], names['Dwarf Names'],
      names['Orc Names'], names['Dragonborn Names'], names['Tiefling Names'],
      names['Halfling Names'], names['Gnome Names'], names['Dark/Forgotten Names'],
      names['Celestial Names']
    ].flat());
  const numberOfHandCards = 7;
  const numberOfCards = 3;
  
  const cardListStyle = {
    display: 'flex', justifyContent: 'center',
    gap: '10px',
    marginBottom: '10px',
  }

  const pickCard = () => {
    const cards = getAllCardIds();
    //   [
    //   "chr001", "chr002", "chr003", "chr004", "chr005",
    //   "chr006", "chr007", "chr008", "chr009",
    //   "spl001", "spl002", "spl003", "spl004",
    //   "spl001", "spl002", "spl003", "spl004", "spl005", "spl006", "spl007"
    // ];
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    // return (playerCards.length <= 7) &&
    //   setPlayerCards([{ title: `${characterNames[Math.floor(Math.random() * characterNames.length)]}` }, ...playerCards]);
    // return (handCards.length <= numberOfHandCards) &&
    //   setHandCards([{ title: `${characterNames[Math.floor(Math.random() * characterNames.length)]}` }, ...handCards]);
    return (handCards.length <= numberOfHandCards) &&
      setHandCards([getCardById(randomCard), ...handCards]);
  }

  return (
    <>
      <h1>{generalStrings.gameName} v.{versionNumber}</h1>

      <div className="">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}

        {/* OPPONENT HAND */}
        <div style={cardListStyle}>
          {opponentHandCards.slice(0, numberOfHandCards).map((card, index) => (
            <Card key={index} title={card.title} />
          ))}
        </div>

        {/* BOARD */}
        <div className="board noselect">
          <div style={cardListStyle}>
            {cardList.opponentCards.slice(0, numberOfCards).map((card, index) => (
              <Card key={index} title={card.title} />
            ))}
          </div>
          <div style={cardListStyle}>
            {playerCards.slice(0, numberOfCards).map((card, index) => (
              card.title == '' ?
                <div
                  onClick={() => pickCard()}>
                  <Card
                    key={index}
                    title={card.title}
                    flipped={true} />
                </div>
                :
                <Card
                  key={index}
                  title={card.title}
                  flipped={false}
                  mine={true} />
            ))}
          </div>
        </div>

        {/* HAND */}
        <div className="noselect" style={cardListStyle}>
          {handCards.slice(0, numberOfHandCards).map((card, index) => (
            card.title == '' ?
              <div
                onClick={() => pickCard()}>
                <Card
                  key={index}
                  title={card.title}
                  flipped={true} />
              </div>
              :
                <Card
                  key={index}
                  title={card.title}
                  flipped={false}
                  mine={true} />
          ))}
        </div>

        {/* CHARACTER NAMES */}
        <div style={{
          columnCount: 5,
          columnGap: '10px',
          margin: '32px 0',
          textAlign: 'left'
        }}>
          {characterNames.map((name, index) => (
            <p key={index} style={{ fontSize: '1em', opacity: 0.35 }}>{name}</p>
          ))}
        </div>
      </div>

      <div>
        <p>
          Your game is just a few clicks away!
        </p>Version: {versionNumber}
      </div >
    </>
  )
}

export default App
