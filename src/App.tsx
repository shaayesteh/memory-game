import { useEffect, useState } from "react";
import Form from "./components/form";
import MemoryCard, { type EmojiItemInterface } from "./components/memoryCard";
import AssistiveTechInfo from "./components/assistiveTechInfo";
import GameOver from "./components/gameOver";
import ErrorCard from "./components/errorCard";

export interface CardData {
  name: string;
  index: number;
}
interface FormDataType {
  category: string;
  number: number;
}

export default function App() {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const initialFormData = {
    category: "animals-and-nature",
    number: 10,
  };
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState<
    EmojiItemInterface[] | undefined
  >([]);
  const [selectedCards, setSelectedCards] = useState<CardData[] | []>([]);
  const [matchedCards, setMatchedCards] = useState<CardData[]>([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  const [isError, setIsError] = useState(false);

  console.log(areAllCardsMatched, selectedCards);

  useEffect(() => {
    if (
      selectedCards.length === 2 &&
      selectedCards[0].name === selectedCards[1].name
    ) {
      setMatchedCards((prevMatchedCards) => [
        ...prevMatchedCards,
        ...selectedCards,
      ]);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (emojisData?.length && matchedCards.length === emojisData?.length) {
      setAreAllCardsMatched(true);
    }
  }, [emojisData?.length, matchedCards]);

  async function startGame(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://emojihub.yurace.pro/api/all/category/${formData.category}`
      );
      if (!response.ok) {
        throw new Error("Could not fetch data from API");
      }
      const data = await response.json();
      const dataSlice = getDataSlice(data);
      const emojisArray = getEmojisArray(dataSlice);
      setEmojisData(emojisArray);
      setIsGameOn(true);
    } catch (err) {
      setIsError(true);
      console.error(err);
    } finally {
      setIsFirstRender(false);
    }
  }

  function getDataSlice(data: EmojiItemInterface[]) {
    const randomIndices = getRandomIndices(data);
    const dataSlice = randomIndices?.map((i) => data[i]);
    return dataSlice;
  }
  function getRandomIndices(data: EmojiItemInterface[]) {
    const randomIndicesArray: number[] = [];
    for (let i = 0; i < formData.number / 2; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomIndex)) {
        randomIndicesArray.push(randomIndex);
      } else {
        i--;
      }
    }
    return randomIndicesArray;
  }

  function getEmojisArray(data: EmojiItemInterface[]) {
    const pairedEmojisArray = [...data, ...data];
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairedEmojisArray[i], pairedEmojisArray[j]] = [
        pairedEmojisArray[j],
        pairedEmojisArray[i],
      ];
    }
    return pairedEmojisArray;
  }

  function turnCard(name: string, index: number) {
    if (selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { name, index },
      ]);
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
  }

  function resetGame() {
    setIsGameOn(false);
    setSelectedCards([]);
    setMatchedCards([]);
    setAreAllCardsMatched(false);
  }

  function resetError() {
    setIsError(false);
  }

  function handleFormChange(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value, e.target.name);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && !isError && (
        <Form
          handleSubmit={startGame}
          handleChange={handleFormChange}
          isFirstRender={isFirstRender}
        />
      )}
      {isGameOn && !areAllCardsMatched && (
        <AssistiveTechInfo
          emojisData={emojisData}
          matchedCards={matchedCards}
        />
      )}
      {areAllCardsMatched && <GameOver handleClick={resetGame} />}
      {isGameOn && (
        <MemoryCard
          handleClick={turnCard}
          emojisData={emojisData}
          selectedCards={selectedCards}
          matchedCards={matchedCards}
        />
      )}
      {isError && <ErrorCard handleClick={resetError} />}
    </main>
  );
}
