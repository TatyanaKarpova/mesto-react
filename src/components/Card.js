import React from 'react';

function Card ({card}) {
    return (
        <article className='element'>
            <img className='element__image' src={card.link}/>
            <div className='element__bottom-item'>
                <h2 className='element__text'>{card.name}</h2>
                <div className='element__like-container'>
                    <button className='element__like'></button>
                    <p className='element__like-number'>{card.likes.length}</p>
                </div>
            </div>
            <button className='element__delete-button'></button>
        </article>
    )
}

export default Card;