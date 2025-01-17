import { useState } from "react";
import { generalStrings } from "./data/generalStrings";
import { Character } from "./data/masterCards";

interface CardProps {
  id?: (string | number),
  title: string, card?:
  Character,
  key?: (number | string),
  flipped?: boolean,
  mine?: boolean
}

const Card = (props: CardProps) => { // 
  const { title = "I am a Card", key = 'none', card, flipped = false, mine } = props;
  const [cardFlipped, setCardFlipped] = useState(flipped);

  const cardStyle = {
    color: 'black',
    backgroundColor: 'white',
    height: '250px',
    justifyContent: 'center',
    width: '175px',
  }
  const flip = () => {
    setCardFlipped(!cardFlipped);
  }
  const handleClick = (e: React.MouseEvent) => {
    switch (e.detail as number) {
      // case 1:
      //   console.log("click");
      //   break;
      case 2:
        console.log("double click");
        flip();
        break;
      // case 3:
      //   console.log("triple click");
      //   break;
    }
  };

  return (
    (title == '') ? // Placeholder for player's cards
      <div style={{
        ...cardStyle,
        backgroundColor: "transparent"
      }}
        key={key}
        className="card your-card pick" >
        <h1>{generalStrings.pickACard}</h1>
      </div>
      :
      // mine, draggable, backgroundColor, color, className
      (cardFlipped) ? // front of card
        <div style={{
          ...cardStyle,
          backgroundColor: mine ? 'white' : '#FFC1E1'
        }}
          key={key}
          onClick={handleClick}
          className="card your-card"
        >
          {(card) ? <>
            <h2>{card.name}</h2>
            <p>{card.title}</p>
            <p>{card.dmg}/{card.def}</p>
            <p>{card.description}</p>
          </> :
            <><h2>{title}</h2></>
          }
        </div>
        : // back of card
        <div style={{
          ...cardStyle,
          backgroundColor: mine ? 'mediumseagreen' : 'darkslateblue',
          color: 'rgba(51 51 51 / 0.5)'
        }}
          key={key}
          onClick={handleClick}
          className="card back-card"
        >
          {mine &&
            <h3>{title}</h3>
          }
          <h1>{generalStrings.backOfCard}</h1>
        </div>
  )
}

export default Card
