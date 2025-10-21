import type { CardData } from "../App"
import type { EmojiItemInterface } from "./memoryCard"

interface AssistiveTechInfoProps{
    emojisData?: EmojiItemInterface[]
    matchedCards:  CardData[]
}

export default function AssistiveTechInfo({ matchedCards, emojisData }: AssistiveTechInfoProps){
    return (
        <section className="sr-only" aria-live="polite" aria-atomic='true'>
            <h2>Game status</h2>
            <p>Number of matched pairs: {matchedCards.length / 2}</p>
            <p>Number of cards left to match: { emojisData ? emojisData?.length - matchedCards.length : ''}</p>
        </section>
    )
}