import {useEffect, useState} from 'react';
import {api} from '../utils/api';
import Card from './Card';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    const [cards, setCards] = useState([]);

    useEffect(() => {
        api
          .getUserProfileInfo()
          .then((res) => {
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar);
          })
          .catch((err) => console.log(err));
        api
          .getInitialCards()
          .then((res) => {
            setCards(res);
          })
          .catch((err) => console.log(err));
    }, []);

    return (
        <main className='content'>
            <section className='profile section content__section'>
                <div className='profile__avatar-container' onClick={onEditAvatar}>
                    <img 
                        className='profile__avatar' 
                        src={`${userAvatar}`} 
                        alt='Изображение Жак-Ива Кусто'
                    />
                    <button className='profile__avatar-edit-button' type='button'></button>
                </div>
                <div className='profile__info'>
                    <h1 className='profile__title'>{userName}</h1>
                    <p className='profile__subtitle'>{userDescription}</p>
                    <button 
                        className='profile__edit-button' 
                        type='button' 
                        aria-label='Редактировать профиль' 
                        onClick={onEditProfile}
                    ></button>
                </div>
                <button 
                    className='profile__add-button' 
                    type='button' 
                    aria-label='Добавить новую карточку' 
                    onClick={onAddPlace}
                ></button>
            </section>
            <section className='elements section content__section'>
                <div className='elements__items'>
                    {cards.map(card => (
                        <Card
                        card = {card}
                        key = {card._id}
                        onCardClick={onCardClick}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Main;