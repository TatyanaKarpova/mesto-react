import React from 'react';

function PopupWithForm(props) {
    return (
        <>
            <div className={`popup ${props.name} ${props.isOpen && "popup_opened"}`}>
                <div className='popup__container' name={props.name}>
                    <h2 className='popup__heading'>{props.title}</h2>
                    <form name={`popup-form-${props.name}`} className='popup__form' noValidate>
                        {props.children}
                        <button type='submit' className='popup__button'>{props.buttonName}</button>
                    </form>
                    <button type='button' className='popup__close-icon' aria-label='Закрыть попап' onClick={props.onClose}></button>
                </div>
            </div>
        </>
    )
}

export default PopupWithForm;