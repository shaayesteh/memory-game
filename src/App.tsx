import { useEffect, useState } from 'react'
import Form from './components/form'
import MemoryCard, { type EmojiItemInterface } from './components/memoryCard'

export interface CardData {
    name: string
    index: number
}

export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState<EmojiItemInterface[]|undefined>([])
    const [selectedCards, setSelectedCards] = useState<CardData[] | []>([])
    const [matchedCards, setMatchedCards] = useState<CardData[]>([])
    const [isGameOver, setIsGameOver] = useState(false)

    console.log(isGameOver,selectedCards);

    useEffect(() => {
        if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name){
            setMatchedCards(prevMatchedCards => [...prevMatchedCards, ...selectedCards])
        }
    }, [selectedCards])

    useEffect(() => {
        if (emojisData?.length && matchedCards.length === emojisData?.length){
            setIsGameOver(true)
        }
    }, [emojisData?.length, matchedCards])

    async function startGame(e: React.SyntheticEvent) {
        e.preventDefault()

        try {
            const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature")
            if (!response.ok) {
                throw new Error("Could not fetch data from API")
            }
            const data = await response.json()
            const dataSlice = getDataSlice(data)
            const emojisArray = getEmojisArray(dataSlice)
            setEmojisData(emojisArray)
            setIsGameOn(true)
        } catch(err) {
            console.error(err)
        }
    }

    function getDataSlice(data: EmojiItemInterface[]){
        const randomIndices = getRandomIndices(data)
        const dataSlice =  randomIndices?.map(i => data[i])
        return dataSlice
    }
    function getRandomIndices(data: EmojiItemInterface[]) {
        const randomIndicesArray: number[] =[]
        for(let i=0; i < 5; i++){
            const randomIndex = Math.floor(Math.random() * data.length)
            if(!randomIndicesArray.includes(randomIndex)){
                randomIndicesArray.push(randomIndex)
            } else {
                i--
            }
        }
        return randomIndicesArray
    }

    function getEmojisArray(data: EmojiItemInterface[]) {
    const pairedEmojisArray = [...data, ...data]
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairedEmojisArray[i], pairedEmojisArray[j]] = [pairedEmojisArray[j], pairedEmojisArray[i]]
    }
    return pairedEmojisArray
}


    function turnCard(name: string, index: number) {
        const selectedCardEntry = selectedCards.find(emoji => emoji.index === index)
        if(!selectedCardEntry && selectedCards.length < 2){
            setSelectedCards(prevSelectedCards => [...prevSelectedCards, { name, index }])
        } else if (!selectedCardEntry && selectedCards.length === 2) {
            setSelectedCards([{ name, index }])
        }
    }

    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn &&
                <MemoryCard
                    handleClick={turnCard}
                    emojisData={emojisData}
                    selectedCards={selectedCards}
                    matchedCards={matchedCards}/>
            }
        </main>
    )
}