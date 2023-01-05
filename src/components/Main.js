import React from 'react';
import {api} from '../utils/api';
import Card from './Card';

function Main(props) {

    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();

    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserProfileInfo()
            .then(res => {
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar)
            })
            .catch(err => console.log(err))
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then(res => {
                setCards(res)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <main className='content'>
            <section className='profile section content__section'>
                <div className='profile__avatar-container' onClick={props.onEditAvatar}>
                    <img className='profile__avatar' src={`${userAvatar}`} alt='Изображение Жак-Ива Кусто'></img>
                    <button className='profile__avatar-edit-button' type='button'></button>
                </div>
                <div className='profile__info'>
                    <h1 className='profile__title'>{userName}</h1>
                    <p className='profile__subtitle'>{userDescription}</p>
                    <button className='profile__edit-button' type='button' aria-label='Редактировать профиль' onClick={props.onEditProfile}></button>
                </div>
                <button className='profile__add-button' type='button' aria-label='Добавить новую карточку' onClick={props.onAddPlace}></button>
            </section>
            <section className='elements section content__section'>
                <div className='elements__items'>
                    {cards.map(card => (
                        <Card
                        card = {card}
                        key = {card._id}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Main;