import './index.scss';
import React, { useState, useRef, useEffect } from "react";
import ResultBox from "../ResultBox";
import BottomResultBox from "../BottomResultBox";
import { pronouns } from "../../data/pronouns";

const TextArea = () => {
    // result-box
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [wordCount, setWordCount] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);
    const [sentenceCount, setSentenceCount] = useState(0);
    const [paragraphCount, setParagraphCount] = useState(0);
    const [pronounCount, setPronounCount] = useState(0);
    // bottom result-box
    const [readTime, setReadTime] = useState(0);
    const [longestWord, setLongestWord] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const trimmedText = text.trim();
        const regex = new RegExp(`\\b(${pronouns.join('|')})\\b`, 'gi');
        const matches = trimmedText.match(regex) || [];

        setWordCount(trimmedText === "" ? 0 : trimmedText.split(/\s+/).length);
        setCharacterCount(text.length);
        setSentenceCount(trimmedText === "" ? 0 : trimmedText.split(/[.!?]+/).filter(Boolean).length);
        setParagraphCount(trimmedText === "" ? 0 : trimmedText.split("\n\n").length);
        setPronounCount(matches.length);

        const averageWordsPerMinute = 225;
        const readingTime = Math.ceil(wordCount / averageWordsPerMinute);
        setReadTime(readingTime);

        const words = trimmedText.split(/\b(?![0-9]+\b)\W+\b/).filter(word => word !== "");
        const longestWord = words.sort((a, b) => b.length - a.length)[0];
        setLongestWord(longestWord);
    };


    return (
        <>
            <ResultBox
                wordCount={wordCount}
                characterCount={characterCount}
                sentenceCount={sentenceCount}
                paragraphCount={paragraphCount}
                pronounCount={pronounCount}
            />
            <textarea
                className="text-area"
                ref={textAreaRef}
                onChange={handleChange}
                placeholder="Paste your text here..."
            />
            <BottomResultBox
                readTime={readTime}
                longestWord={longestWord}
            />
        </>
    );
};

export default TextArea;