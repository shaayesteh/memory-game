import type { CardData } from "../App"

interface EmojiButtonProps {
    content: string,
    handleClick: () => void
    selectedCardEntry?: CardData
    matchedCardEntry?: CardData
}

export default function EmojiButton({ content, handleClick, selectedCardEntry, matchedCardEntry }: EmojiButtonProps){

    const btnContent = selectedCardEntry || matchedCardEntry ? content : '?'
    const btnStyle =
        matchedCardEntry ? "btn--emoji__back--matched" :
        selectedCardEntry ? "btn--emoji__back--selected" :
        "btn--emoji__front"


    return(
         <button
                className={`btn btn--emoji ${btnStyle}`}
                onClick={handleClick}
            >
                {btnContent}
         </button>
    )
}