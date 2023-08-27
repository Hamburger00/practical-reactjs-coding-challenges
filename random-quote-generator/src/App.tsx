import classnames from "classnames";
import { ReactComponent as Button } from "../src/assets/icons/button.svg";
import { ReactComponent as Quotation } from "../src/assets/icons/quotation.svg";
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg";
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg";
import axios, { AxiosResponse } from 'axios';
import React, {useState, useEffect} from "react";
import "./App.css";

interface Quote {
    id: number;
    quote: string;
    author: string;
}

function App() {
    const [quoteList, setQuoteList] = useState<Quote[]>([])
    const [quoteIndex, setQuoteIndex] = useState<number>(0)
    const currentQuote = quoteList[quoteIndex]

    const randomSort = () => {
        return Math.random() - 0.5;
    }
    // json-server --watch db.json --port 4000
    useEffect(() => {
        axios.get('http://localhost:4000/quotes')
            .then((response: AxiosResponse) => {
                // Set the data state with the response data
                response.data.sort(randomSort);
                setQuoteList(response.data);
            })
            .catch((error: any) => {
                // Handle any errors
                console.error(error);
            });
    }, []); // Empty dependency array to run the effect only once

    const handleNext = () => {
        const maxIndex = quoteList.length -1
        setQuoteIndex((prevIndex) => (prevIndex + 1) % (maxIndex + 1));
    }

    const handlePrev = () => {
        const minIndex = 0;
        // Minimum index value (starting point)
        setQuoteIndex((prevIndex) =>
            prevIndex === minIndex ? minIndex : prevIndex - 1
        );
    };

    const shareOnTwitter = () => {
        const shareText = `${currentQuote.quote}\n\n${currentQuote.author}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        window.open(twitterUrl, '_blank');
    }

    const shareOnWhatsApp = () => {
        const shareText = `${currentQuote.quote}\n\n${currentQuote.author}`;
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
    }

    return (
        <>
            <header>
                <div className="top-strip" />
            </header>
            <div className="container">
                <div className="quotation-box ">
                    <Quotation />
                    <div className="quote">
                        {currentQuote ? (
                            <>
                                <h2>
                                    {quoteIndex + 1}
                                </h2>
                                <p>
                                    {currentQuote.quote}
                                </p>
                                <span>{currentQuote.author}</span>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}

                    </div>
                    <div className="bottom-navigation">
                        <div>
                            <Button className={classnames("rotate cp")} onClick={handlePrev} />
                            <Button className="cp" onClick={handleNext}/>
                            {/*<button onClick={testLog}>
                                testing
                            </button>*/}
                        </div>
                        <div className="share">
                            <span>Share At:</span>
                            <button onClick={shareOnTwitter}>
                                <Twitter title="Post this quote on twitter!" className="cp" />
                            </button>
                            <button onClick={shareOnWhatsApp}>
                                <Whatsapp title="Post this quote on WhatsApp!" className="cp" />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-strip" />
        </>
    );
}

export default App;
