import React from 'react';

function ImagePopup() {
    return (
        <div className='popup popup-image-background' id='popup-image'>
            <figure className='popup__figure'>
                <img className='popup__image' src='#' alt=''/>
                <button type='button' className='popup__close-icon' aria-label='Закрыть попап'></button>
                <figcaption className='popup__figcaption'></figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;