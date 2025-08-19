import { decodeEntity } from "html-entities"
import EmojiButton from "./emojiButton"
import type { CardData } from "../App"

export interface EmojiItemInterface {
    name: string,
    category: string,
    group: string,
    htmlCode: string[],
    unicode: string[]
}
interface MemoryCardProps {
    handleClick: (name: string, index: number) => void
    emojisData?: EmojiItemInterface[]
    selectedCards: CardData[]
    matchedCards: CardData[]
}
export default function MemoryCard({ handleClick, emojisData, selectedCards, matchedCards }:MemoryCardProps) {

    const cardEl = emojisData?.map((emoji, index) => {
        const selectedCardEntry = selectedCards.find(emoji => emoji.index === index)
        const matchedCardEntry = matchedCards.find(emoji => emoji.index === index)

        const cardStyle =
            matchedCardEntry ? "card-item--matched" :
            selectedCardEntry ? "card-item--selected" :
            ""

        return (
            <li key={index} className={`card-item ${cardStyle}`}>
                <EmojiButton
                    handleClick={() => handleClick(emoji.name, index)}
                    content={decodeEntity(emoji.htmlCode[0])}
                    selectedCardEntry={selectedCardEntry}
                    matchedCardEntry={matchedCardEntry}
                />
            </li>
            )
    }
    )

    return <ul className="card-container">{cardEl}</ul>
}