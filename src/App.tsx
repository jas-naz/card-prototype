import React, { SetStateAction, useState, version } from 'react'
import Card from './Card'
import './App.css'
import { names } from './data/names';
import { generalStrings } from './data/generalStrings';
import { Character, getCardsById, makeADeck } from './data/masterCards';
import { shuffle } from 'lodash/fp';

import { DndContext, DragOverlay, MeasuringStrategy } from '@dnd-kit/core';

import Draggable from './Draggable';
import Droppable from './Droppable';

import ErrorBoundary from './ErrorBoundry';
import CharacterNames from './CharacterNames';
import DNDapp from './DNDapp';

const versionNumber = "0.0.004";
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
  // const dragItem = useRef<HTMLDivElement | null>(null);
  // const dragOverItem = useRef<HTMLDivElement | null>(null);
  const blankCard = cardList.playerCards[0];
  const [gameActive, setGameActive] = useState(false);
  const [opponentHandCards] = useState(cardList.opponentHandCards);
  const [playerDeckCards, setPlayerDeckCards] = useState(getCardsById(makeADeck(55)));
  const [handCards, setHandCards] = useState<Character[]>([blankCard]);
  const [boardCards, setBoardCards] = useState([{ title: '' }]);
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
  // DND
  const [parent, setParent] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const containers = ['A', 'B', 'C'];
  const measuringConfig = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    }
  };

  const startGame = (active: boolean) => {
    if (!active) {
      setHandCards([{ title: '', name: '' }]);
      setPlayerDeckCards(getCardsById(makeADeck(55)));
      setBoardCards([{ title: '' }]);
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

  function shuffleMyDeck(): void {
    setPlayerDeckCards(shuffle(playerDeckCards));
  }

  function moveCardToBoard(active: any, over: any): void { // boardCards: Character[], card: Character
    if (active === null) {
      setBoardCards([...boardCards.slice(0, -2), blankCard]);
      // return;
    }
    if (over === null) {
      return;
    }
    const bCard = handCards[Number(active)];
    setBoardCards([bCard, ...boardCards]);

    console.log("moveCardToBoard", active);

    // remove from hand
    const newHandCards = [...handCards];
    newHandCards.splice(Number(active), 1);

    setHandCards([...newHandCards]);
  }

  return (
    <DndContext measuring={measuringConfig}
      onDragStart={handleDragStart} onDragEnd={handleDragEnd}>

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
                  {containers.map((id) => (
                    // We updated the Droppable component so it would accept an `id`
                    // prop and pass it to `useDroppable`
                    <Droppable key={id} id={id}>
                      {parent === id ? <Card
                        key={index}
                        title={''}
                        flipped={false}
                        mine={true} /> : 'Drop here'}
                    </Droppable>
                  ))}
                  {(boardCards) && boardCards.slice(0, numberOfCards).map((card, index) => (
                    <div
                    // draggable={true}
                    // onDragStart={(e) => e.dataTransfer.setData('card', JSON.stringify(card))}
                    >
                      <Droppable id="droppable">
                        {parent === "droppable" ? <Draggable id={`draggable`}>Dropped</Draggable> : 'Drop here'}
                        {card.title == '' ?
                          <Card
                            key={index}
                            title={''}
                            flipped={false}
                            mine={true} />
                          :
                          <Draggable key={index} id={`dropable${index}`}>
                            <Card
                              key={index}
                              title={card.title}
                              // card={card}
                              flipped={false}
                              mine={true} />
                          </Draggable>
                          // <Card
                          //   key={index}
                          //   title={card.title}
                          //   flipped={false}
                          //   mine={true} />
                        }
                      </Droppable>
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
              {/* {React.Children.toArray(row)} */}
              {handCards.slice(0, numberOfHandCards).map((card, index) => (
                <div
                // onDragStart={e => dragStart(e)}
                // onDragEnter={e => dragEnter(e)}
                // onDragEnd={drop}
                // draggable={true}
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
                    <Draggable id={`${index}`} key={index}>
                      <Card
                        key={index}
                        title={card.title}
                        card={card}
                        flipped={false}
                        mine={true} />
                    </Draggable>
                  }
                </div>
              ))}
            </div>}
            <DragOverlay>
              {isDragging ? ( // activeId <Item value={`Item ${activeId}`} />
                <Card
                  key={activeId}
                  title={`Item ${activeId}`}
                  flipped={false}
                  mine={true} />
              ) : null}
            </DragOverlay>

            Deck:: {playerDeckCards.length} <button onClick={() => shuffleMyDeck()}>Shuffle my Deck</button>
            <div style={{
              columnCount: 5,
              columnGap: '10px',
              margin: '32px 0',
              textAlign: 'left'
            }}>
              <DNDapp cardNames={playerDeckCards.map((card, i) => `${i + 1}: ${card.title}`)} />
              {/* {playerDeckCards.map((card, index) => (
              <div style={{ border: '1px solid black', borderRadius: '3px',
                background: (index == 0) ? 'seagreen' : 'darkslategray', fontSize: '1em', padding: '3px 6px'
              }}><p key={index} style={{ fontSize: '1em', opacity: 0.35 }}>{card && card.title}</p>
              </div>))} */}
            </div>

            <hr />

            <CharacterNames names={characterNames} />
          </div>

          <div>
            <p>app version: {versionNumber}, react version: {version}</p>
          </div >
        </>
      </ErrorBoundary>
    </DndContext>
  )
  function handleDragStart(event: { active: { id: any } }): void {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event): void { // 
    const { active, over } = event;
    // setParent(over ? over.id : null); // 
    setActiveId(null);
    console.log('handleDragEnd', over, active);
    moveCardToBoard(active ? active.id : null, over ? over.id : null);
  }
}

export default App

// const draggable = (props: { title: string, card?: Character, key: (number | string), flipped?: boolean, mine?: boolean }) => (
//   <Draggable id={`draggable${props.key}`}>
//     <Card
//       key={props.key}
//       title={props.title}
//       card={props.card}
//       flipped={false}
//       mine={true} />
//   </Draggable>
// )
