import './App.css';
import React from "react";
import config from "./config";

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
        return arrOfCards;
    }

    render() {
        console.log(this.state.cards);
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
                                <div className="card" key={item.id}>
                                    <img src={'/images/' + item.image} alt={item.name}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
