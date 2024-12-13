import { shuffle } from "lodash/fp";

export type Character = {
  id?: string;
  name: string;
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
    {
      id: "chr001",
      name: "Name",
      title: "Ranger",
      description: "This is a ranger",
      dmg: "1",
      def: "2",
    },
    {
      id: "chr002",
      name: "Name",
      title: "Elf",
      description: "This is an elf",
      dmg: "1",
      def: "2",
    },
    {
      id: "chr003",
      name: "Name",
      title: "Barbarian",
      description: "This is a barbarian",
      dmg: "1",
      def: "2",
    },
    {
      id: "chr004",
      name: "Name",
      title: "Zombie",
      description: "This is a zombie",
      dmg: "1",
      def: "2",
    },
    {
      id: "chr005",
      name: "Name",
      title: "Pirate",
      description: "This is a pirate",
      dmg: "1",
      def: "2",
    },
    {
      id: "chr006",
      name: "Name",
      title: "Thief",
      description: "This is a thief",
      dmg: "1",
      def: "2",
    },
    {
      id: "chr007",
      name: "Name",
      title: "Knight",
      description: "This is a knight",
      dmg: "1",
      def: "2",
    },
    {
      id: "chr008",
      name: "Name",
      title: "Oglin",
      description: "This is an oglin",
      dmg: "1",
      def: "2",
    },
    {
      id: "chr009",
      name: "Name",
      title: "Faerie",
      description: "This is a faerie",
      dmg: "1",
      def: "2",
    },
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
    { id: "spl002", title: "Spell 2", description: "", dmg: "1", def: "2" },
    { id: "spl003", title: "Spell 3", description: "", dmg: "1", def: "2" },
    { id: "spl004", title: "Spell 4", description: "", dmg: "1", def: "2" },
    { id: "spl005", title: "Spell 5", description: "", dmg: "1", def: "2" },
    { id: "spl006", title: "Spell 6", description: "", dmg: "1", def: "2" },
    { id: "spl007", title: "Spell 7", description: "", dmg: "1", def: "2" },
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
