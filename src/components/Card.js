import React from "react";

export class Card extends React.Component {
    constructor() {
        super();
        this.state = {isOpen: false};
    }

    cardClickHandler(card) {
        this.props.onChoice(card);
    }

    render() {
        return (
            <div className={'card ' + (this.state.isOpen ? 'open' : 'closed')}
                 onClick={this.cardClickHandler.bind(this, this.props.item)}>
                <div className="card-inner card-front">
                    <img src={'/images/' + this.props.item.image} alt={this.props.item.name}/>
                </div>
                <div className="card-inner card-back">
                    <img src={'/images/question.svg'} alt="question mark"/>
                </div>
            </div>
        );
    }
}