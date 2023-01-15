import { useEffect, useState, useContext } from 'react';
import { api } from '../utils/api';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

    const currentUser = useContext(CurrentUserContext);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api
          .getInitialCards()
          .then((res) => {
            setCards(res);
          })
          .catch((err) => console.log(err));
    }, []);

    function handleCardLike (card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
    
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(err));
    };

    function handleCardDelete (card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(items => items.filter(item => item._id !== card._id));
            })
    }

    return (
        <main className='content'>
            <section className='profile section content__section'>
                <div className='profile__avatar-container' onClick={onEditAvatar}>
                    <img 
                        className='profile__avatar' 
                        src={`${currentUser.avatar}`} 
                        alt='Изображение Жак-Ива Кусто'
                    />
                    <button className='profile__avatar-edit-button' type='button'></button>
                </div>
                <div className='profile__info'>
                    <h1 className='profile__title'>{currentUser.name}</h1>
                    <p className='profile__subtitle'>{currentUser.about}</p>
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
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Main;