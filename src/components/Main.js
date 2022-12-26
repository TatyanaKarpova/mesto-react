import React from 'react';
import profileAvatar from '../images/jak-iv_kusto.png';

function Main() {
    return (
        <main className='content'>
            <section className='profile section content__section'>
                <div className='profile__avatar-container'>
                    <img className='profile__avatar' src={profileAvatar} alt='Изображение Жак-Ива Кусто'></img>
                    <button className='profile__avatar-edit-button' type='button'></button>
                </div>
                <div className='profile__info'>
                    <h1 className='profile__title'></h1>
                    <p className='profile__subtitle'></p>
                    <button className='profile__edit-button' type='button' aria-label='Редактировать профиль'></button>
                </div>
                <button className='profile__add-button' type='button' aria-label='Добавить новую карточку'></button>
            </section>
            <section className='elements section content__section'>
                <div className='elements__items'></div>
            </section>
        </main>
    )
}

export default Main;