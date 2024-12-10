import { shuffle } from "lodash/fp";

export type Character = {
  id?: string;
  title: string;
  description?: string;
  dmg?: string;
  def?: string;
  rarity?: string; // * out of 100
};

type Spells = Character & {
  id: string;
  title: string;
  description: string;
  dmg: string;
  def: string;
  rarity: string;
};

export const cardDataBase = {
  characters: <Character[]>[
    { id: "chr001", title: "Ranger", description: "", dmg: "", def: "" },
    { id: "chr002", title: "Elf", description: "", dmg: "" },
    { id: "chr003", title: "Barbarian", description: "", dmg: "", def: "" },
    { id: "chr004", title: "Zombie", description: "", dmg: "", def: "" },
    { id: "chr005", title: "Pirate", description: "", dmg: "" },
    { id: "chr006", title: "Thief", description: "", dmg: "", def: "" },
    { id: "chr007", title: "Knight", description: "", dmg: "", def: "" },
    { id: "chr008", title: "Oglin", description: "", dmg: "", def: "" },
    { id: "chr009", title: "Faerie", description: "", dmg: "", def: "" },
  ],
  spells: <Spells[]>[
    // TODO: add spells
    {
      id: "spl001",
      title: "Spell: Stun, no DMG this turn.",
      description: "No DMG this turn.",
      dmg: "",
      def: "",
    },
    { id: "spl002", title: "Spell 2", description: "", dmg: "", def: "" },
    { id: "spl003", title: "Spell 3", description: "", dmg: "", def: "" },
    { id: "spl004", title: "Spell 4", description: "", dmg: "", def: "" },
    { id: "spl005", title: "Spell 5", description: "", dmg: "", def: "" },
    { id: "spl006", title: "Spell 6", description: "", dmg: "", def: "" },
    { id: "spl007", title: "Spell 7", description: "", dmg: "", def: "" },
  ],
  scrolls: [{ title: "" }],
  potions: [{ title: "" }, { title: "" }, { title: "" }],
  weapons: [{ title: "" }],
  gold: 0,
};

const allCards = [
  ...cardDataBase.characters,
  ...cardDataBase.spells,
  // .concat(cardDataBase.scrolls)
  // .concat(cardDataBase.potions)
  //   .concat(cardDataBase.weapons);
];

export const makeADeck = (noOfCards: number) => {
  // TODO: need to use rarity to determine how many of each card to use
  const deckCards = getAllCardIds();
  const shuffledDeckCards = shuffle([
    ...deckCards,
    ...deckCards,
    ...deckCards,
    ...deckCards,
    ...deckCards,
  ]);
  return shuffledDeckCards.slice(0, noOfCards);
};

// const allCardsById = allCards.reduce((acc, card) => {
//   acc[card.id] = card;
//   return acc;
// }, {});

export const getAllCards = () => {
  return allCards;
};
export const getAllCardIds = (): string[] => {
  return allCards.map((card) => card.id) as string[];
};
// console.log("getAllCardIds", getAllCardIds());

export const getCardById = (id: string) => {
  if (allCards.find((card) => card.id === id)) {
    return allCards.find((card) => card.id === id);
  }
  return;
};
export const getCardsById = (ids: string[]): (Character | Spells)[] => {
  return ids.map((id) => {
    return allCards.find((card) => card.id === id) as Character;
  });
};
// function shuffle(deckCards: string[]) {
//   throw new Error("Function not implemented.");
// }

console.log("makeADeck", makeADeck(115));
