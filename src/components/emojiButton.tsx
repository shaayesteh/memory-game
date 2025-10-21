import { decodeEntity } from "html-entities"
import type { CardData } from "../App"
import type { EmojiItemInterface } from "./memoryCard"

interface EmojiButtonProps {
    emoji:EmojiItemInterface
    handleClick: () => void
    selectedCardEntry?: CardData
    matchedCardEntry?: CardData
    index: number
}

export default function EmojiButton({  emoji, handleClick, selectedCardEntry, matchedCardEntry, index }: EmojiButtonProps){

    const btnContent = selectedCardEntry || matchedCardEntry ? decodeEntity(emoji.htmlCode[0]) : '?'
    const btnStyle =
        matchedCardEntry ? "btn--emoji__back--matched" :
        selectedCardEntry ? "btn--emoji__back--selected" :
        "btn--emoji__front"
    const btnAria = matchedCardEntry ?
        `${matchedCardEntry.name}. Matched.`
            : selectedCardEntry
                ?  `${decodeEntity(selectedCardEntry.name)}. Not matched yet.`
                   : 'Card Upside Down'


    return(
         <button
                className={`btn btn--emoji ${btnStyle}`}
                onClick={selectedCardEntry ? undefined : handleClick}
                disabled={!!matchedCardEntry}
                aria-label={`Position ${index+1} ${btnAria}`}
                aria-live="polite"
            >
                {btnContent}
         </button>
    )
}