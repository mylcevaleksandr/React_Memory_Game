import './App.css';
import React from "react";
import config from "./config";
import {Card} from "./components/Card";
import Popup from 'reactjs-popup';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cards: [],
            clicks: 0,
            seconds: 0,
            isPopupOpen: false
        };
    }

    componentDidMount() {
        this.startGame();
    }

    startGame() {
        this.setState({
            cards: this.prepareCards(),
            clicks: 0,
            seconds: 0,
            isPopupOpen: false
        });
        this.startTimer();
    }

    startTimer() {
        try {
            clearInterval(window.interval);
        } catch (e) {
            console.log(`interval not initialized yet`);
        }
        window.interval = setInterval(() => {
            this.setState({seconds: this.state.seconds + 1});
        }, 1000);
    }

    // Fisher-Yates method is more reliable to get randomly sorted data
    prepareCards() {
        let arrOfCards = [...config.cards, ...config.cards];
        let currentIndex = arrOfCards.length;

        while (currentIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arrOfCards[currentIndex], arrOfCards[randomIndex]] = [arrOfCards[randomIndex], arrOfCards[currentIndex]];

        }
        return arrOfCards.map((obj, index) => ({...obj, id: index + 1, isOpen: false, isComplete: false}));
    }

    // A simpler method for getting randomly sorted data
    // prepareCardsTwo() {
    // let id = 1
    //     return [...config.cards, ...config.cards]
    //     .sort(() => Math.random() - 0.5)
    //         .map((item)=>{...item,id:id++});
    // }

    choiceCardHandler(card) {
        if (card.isComplete || this.state.cards.filter(item => item.isOpen).length >= 2) {
            return;
        }
        this.setState({
            cards: this.state.cards.map((item) => {
                return item.id === card.id ? {...item, isOpen: true} : item;
            })
        }, () => {
            this.processChoosingCards();
        });

        this.setState({clicks: this.state.clicks + 1});
    }

    processChoosingCards() {
        const openCards = this.state.cards.filter(item => item.isOpen);
        if (openCards.length === 2) {
            if (openCards[0].name === openCards[1].name) {
                this.setState({
                    cards: this.state.cards.map(item => {
                        if (item.id === openCards[0].id || item.id === openCards[1].id) {
                            item.isComplete = true;
                        }
                        item.isOpen = false;
                        return item;
                    })
                }, () => {
                    this.checkForAllComplete();
                });
            } else {
                setTimeout(() => {
                    this.setState({
                        cards: this.state.cards.map(item => {
                            item.isOpen = false;
                            return item;
                        })
                    });
                }, 1000);
            }
        }
    }

    checkForAllComplete() {
        if (this.state.cards.every(item => item.isComplete)) {
            clearInterval(window.interval);
            this.setState({isPopupOpen: true});
        }
    }

    closePopup() {
        this.setState({isPopupOpen: false});
        this.startGame();
    }

    render() {
        return (
            <div className="App">
                <header className="header">
                    Memory Game
                </header>
                <div className="game">
                    <div className="score">
                        Нажатий: {this.state.clicks}. Таймер: {this.state.seconds}.
                    </div>
                    <div className="cards">
                        {
                            this.state.cards.map(item => (
                                <Card item={item} key={item.id} isOpen={item.isOpen || item.isComplete}
                                      onChoice={this.choiceCardHandler.bind(this)}/>
                            ))
                        }
                    </div>
                </div>
                <Popup open={this.state.isPopupOpen} closeOnDocumentClick onClose={this.closePopup.bind(this)}>
                    <div className="modal">
                        <span className="close" onClick={this.closePopup.bind(this)}>
                            &times;
                        </span>
                        Игра завершена! Ваш результат: {this.state.clicks} кликов за {this.state.seconds} секунд!
                    </div>
                </Popup>
            </div>
        );
    }
}

export default App;
