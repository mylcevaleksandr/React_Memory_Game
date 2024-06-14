import './App.css';
import React from "react";
import config from "./config";
import {Card} from "./components/Card";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cards: this.prepareCards(),
            clicks: 0
        };
    }

    prepareCards() {
        let arrOfCards = [...config.cards, ...config.cards];
        let currentIndex = arrOfCards.length;

        while (currentIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arrOfCards[currentIndex], arrOfCards[randomIndex]] = [arrOfCards[randomIndex], arrOfCards[currentIndex]];
        }
        const sortedArrOfCards = arrOfCards.map((obj, index) => ({...obj, id: index + 1}));
        return sortedArrOfCards;
    }

    choiceCardHandler(card) {
        console.log(card.name);
    }

    render() {
        return (
            <div className="App">
                <header className="header">
                    Memory Game
                </header>
                <div className="game">
                    <div className="score">
                        Нажатий: {this.state.clicks}
                    </div>
                    <div className="cards">
                        {
                            this.state.cards.map(item => (
                                <Card item={item} key={item.id} onChoice={this.choiceCardHandler}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
