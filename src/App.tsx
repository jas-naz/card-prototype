import React from 'react';
import { useRef, useState, version } from 'react'
import Card from './Card'
import './App.css'
import { names } from './data/names';
import { generalStrings } from './data/generalStrings';
import { Character, getCardsById, makeADeck } from './data/masterCards';
import { shuffle } from 'lodash/fp';
import ErrorBoundary from './ErrorBoundry';

const versionNumber = "0.0.003";
const cardList = {
  opponentHandCards: [
    { title: '*****' },
    { title: '*****' },
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
    { title: '', name: '' },
  ]
}
function App() {
  const dragItem = useRef<HTMLDivElement | null>(null);
  const dragOverItem = useRef<HTMLDivElement | null>(null);
  const blankCard = cardList.playerCards[0];
  const [gameActive, setGameActive] = useState(false);
  const [opponentHandCards] = useState(cardList.opponentHandCards);
  const [playerDeckCards, setPlayerDeckCards] = useState(getCardsById(makeADeck(55)));
  const [handCards, setHandCards] = useState<Character[]>([blankCard]);
  const [boardCards] = useState([{ title: '' }]);
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

  const startGame = (active: boolean) => {
    if (!active) {
      setHandCards([{ title: '', name: '' }]);
      setPlayerDeckCards(getCardsById(makeADeck(55)))
    }
    setGameActive(active);
  }
  const pickCard = () => {
    if ((handCards.length) >= numberOfHandCards + 1) {
      return;
    }
    const nArr = [...handCards.filter(item => item.title !== '')];
    const newArray = [...nArr, drawCardFromDeck(), blankCard];

    return (handCards.length <= numberOfHandCards) &&
      setHandCards(newArray);
  }

  const drawCardFromDeck = () => {
    const card = playerDeckCards[0];

    setPlayerDeckCards(playerDeckCards.slice(1));
    return card;
  }

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // e.dataTransfer.setData('card', JSON.stringify(e.target.card));
    dragItem.current = JSON.stringify(e.target.card); // HTMLDivElement
  }
  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    dragOverItem.current = e.currentTarget as HTMLDivElement;
  }
  const drop = (): void => {
    console.log('dragItem', dragItem.current);
    console.log('dragOverItem', dragOverItem.current);

    const copyListItems = [...handCards];
    const dragItemContent = copyListItems[dragItem.current.id as number];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);

    console.log('copyListItems', copyListItems);
    console.log('dragItemContent', dragItemContent);
    console.log('dragOverItem', dragOverItem);

    // dragItem.current = null;
    // dragOverItem.current = null;
    // setHandCards(copyListItems);
  }

  function shuffleMyDeck(): void {
    setPlayerDeckCards(shuffle(playerDeckCards));
  }

  const row = handCards.slice(0, numberOfHandCards).map((card, index) => {
    return <div
      onDragStart={e => dragStart(e)}
      onDragEnter={e => dragEnter(e)}
      onDragEnd={drop}
      draggable={true}
      data-card={card}
    // (e) => e.dataTransfer.setData('card', JSON.stringify(card))}
    >
      {card && card.title == '' ?
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
          card={card}
          title={card.title}
          flipped={false}
          mine={true} />
      }
    </div>
  });

  return (
    <ErrorBoundary>
    <>
      <h1>{generalStrings.gameName} v.{versionNumber}</h1>

      <div className="">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}

        {/* OPPONENT HAND */}
        <div style={cardListStyle}>
          {gameActive && opponentHandCards.slice(0, numberOfHandCards).map((card, index) => (
            <Card key={index} title={card.title} />
          ))}
        </div>

        {/* BOARD */}
        <div className="board noselect">
          {!gameActive && <>
            <p>
              Your game is just a few clicks away!
            </p>
            <button onClick={() => startGame(true)}>join game</button></>
          }
          {gameActive && <>
            <div style={cardListStyle}>
              {cardList.opponentCards.slice(0, numberOfCards).map((card, index) => (
                <Card key={index} title={card.title} />
              ))}
            </div>
            <div style={cardListStyle}>
              {(boardCards) && boardCards.slice(0, numberOfCards).map((card, index) => (
                <div draggable={true} onDragStart={(e) => e.dataTransfer.setData('card', JSON.stringify(card))}
                >
                  {card.title == '' ?
                    <Card
                      key={index}
                      title={''}
                      flipped={false}
                      mine={true} />
                    :
                    <Card
                      key={index}
                      title={card.title}
                      flipped={false}
                      mine={true} />
                  }
                </div>
              ))}
            </div>
            <button onClick={() => startGame(false)}>end game</button>
          </>
          }

        </div>

        <div>Deck:
          {gameActive &&
              <div style={{
                ...(((handCards.length) < numberOfHandCards + 1) ? { cursor: 'pointer' } : null),
                border: '1px solid black', borderRadius: '6px',
                background: 'seagreen', fontSize: '1em', padding: '3px 6px', width: '140px'
              }}
                onClick={() => pickCard()}>Next Card:
              <p style={{ fontSize: '1em', opacity: 0.35 }}>{playerDeckCards[0].title}</p>
            </div>
            // <Card
            // key={1}
            // title={playerDeckCards[0].title}
            // flipped={false}
            //   mine={true} />
          }
        </div>

        {/* HAND */}
        {gameActive && <div className="noselect" style={cardListStyle}>
            {React.Children.toArray(row)}
            {/* {handCards.slice(0, numberOfHandCards).map((card, index) => (
            <div
              onDragStart={e => dragStart(e)}
              onDragEnter={e => dragEnter(e)}
              onDragEnd={drop}
              draggable={true}
            // (e) => e.dataTransfer.setData('card', JSON.stringify(card))}
            >
              {card && card.title == '' ?
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
                card={card}
                title={card.title}
                flipped={false}
                  mine={true} />
              }
            </div>
          ))} */}
        </div>}
        Deck:: {playerDeckCards.length} <button onClick={() => shuffleMyDeck()}>Shuffle my Deck</button>
        <div style={{
          columnCount: 5,
          columnGap: '10px',
          margin: '32px 0',
          textAlign: 'left'
        }}>
          {playerDeckCards.map((card, index) => (
            <div style={{
              border: '1px solid black', borderRadius: '3px',
              background: (index == 0) ? 'seagreen' : 'darkslategray', fontSize: '1em', padding: '3px 6px'
            }}>
              <p key={index} style={{ fontSize: '1em', opacity: 0.35 }}>{card && card.title}</p>
            </div>
          ))}
        </div>

        <hr />

        <CharacterNames names={characterNames} />
      </div>

      <div>
        <p>app version: {versionNumber}, react version: {version}</p>
      </div >
      </></ErrorBoundary >
  )
}

export default App

const CharacterNames = (props: { names: string[] }) => {
  const { names } = props;
  return (
    <div>
      <p>Character Names</p>
      <div style={{
        columnCount: 5,
        columnGap: '10px',
        margin: '32px 0',
        textAlign: 'left'
      }}>
        {names.map((name, index) => (
          <p key={index} style={{ fontSize: '1em', opacity: 0.35 }}>{name}</p>
        ))}
      </div>
    </div>
  )
}
