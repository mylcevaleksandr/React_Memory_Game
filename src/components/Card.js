import React from "react";
import "./Card.css"

export class Card extends React.Component {

    cardClickHandler(card) {
        this.props.onChoice(card);
    }

    render() {
        return (
            <div className={'card ' + (this.props.isOpen ? 'open' : 'closed')}
                 onClick={this.cardClickHandler.bind(this, this.props.item)}>
                <div className="card-inner card-front">
                    <img src={process.env.PUBLIC_URL +'/images/' + this.props.item.image} alt={this.props.item.name}/>
                </div>
                <div className="card-inner card-back">
                    <img src={process.env.PUBLIC_URL +'/images/question.svg'} alt="question mark"/>
                </div>
            </div>
        );
    }
}