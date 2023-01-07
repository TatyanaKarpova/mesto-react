import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup-image-background ${props.isOpen && 'popup_opened'}`}>
            <figure className='popup__figure'>
                <img 
                    className='popup__image' 
                    src={`${props.card.link}`} 
                    alt={props.card.name}
                />
                <button 
                    type='button' 
                    className='popup__close-icon' 
                    aria-label='Закрыть попап' 
                    onClick={props.onClose}
                ></button>
                <figcaption className='popup__figcaption'>{props.card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;