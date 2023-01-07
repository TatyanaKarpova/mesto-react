import React from 'react';

function Card (props) {

    function handleClick () {
        props.onCardClick(props.card);
    }  
    
    return (
        <article className='element'>
            <img
                className="element__image"
                src={props.card.link}
                onClick={handleClick}
                alt={props.card.name}
            />
            <div className='element__bottom-item'>
                <h2 className='element__text'>{props.card.name}</h2>
                <div className='element__like-container'>
                    <button className='element__like'></button>
                    <p className='element__like-number'>{props.card.likes.length}</p>
                </div>
            </div>
            <button className='element__delete-button'></button>
        </article>
    )
}

export default Card;