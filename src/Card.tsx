import { useState } from "react";
import { generalStrings } from "./data/generalStrings";

const Card = (props: { title: string, key: (number | string), flipped?: boolean, mine?: boolean }) => {
  const { title = "I am a Card", key, flipped = false, mine } = props;
  const [cardFlipped, setCardFlipped] = useState(flipped);

  const cardStyle = {
    color: 'black',
    display: 'flex',
    backgroundColor: 'white',
    height: '250px',
    justifyContent: 'center',
    width: '175px',
  }
  const flip = () => {
    setCardFlipped(!cardFlipped);
  }

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
      (cardFlipped) ?
        <div style={{
          ...cardStyle,
          backgroundColor: mine ? 'white' : '#FFC1E1'
        }}
          key={key}
          onClick={() => flip()}
          className="card your-card"
        >
          <h2>{title}</h2>
        </div>
        :
        <div style={{
          ...cardStyle,
          backgroundColor: mine ? 'limegreen' : 'indigo',
          color: 'rgba(51 51 51 / 0.5)'
        }}
          key={key}
          onClick={() => flip()}
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
