import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';

function App () {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isShowFullImagePopupOpen, setShowFullImagePopupOpen] = useState(false);
  const [isConfirmDeleteCardPopupOpen, setConfirmDeleteCardPopup] = useState(false);
  const [isRenderLoading, setRenderLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleUpdateUser (newProfileInfo) {
    setRenderLoading(true);

    api
      .editProfileInfo(newProfileInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setRenderLoading(false));
  };

  function handleUpdateAvatar (newAvatar) {
    setRenderLoading(true);

    api
      .updateAvatar(newAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setRenderLoading(false));
  };

  function handleAddPlaceSubmit (newPlace) {
    setRenderLoading(true);

    api
      .addNewCards(newPlace.name, newPlace.link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setRenderLoading(false));
  };
 
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
  };

  function handleCardClick (card) {
    setShowFullImagePopupOpen(true);
    setSelectedCard(card);
  };

  function handleDeleteCardClick (card) {
    setConfirmDeleteCardPopup(true);
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setShowFullImagePopupOpen(false);
    setConfirmDeleteCardPopup(false);
    setRenderLoading(false);
  };

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
        
      api
        .changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err));
  };

  function handleCardDelete (card) {
    setRenderLoading(true);

    api
      .deleteCard(card._id)
      .then(() => {
        setCards(items => items.filter(item => item._id !== card._id));
        closeAllPopups();
    })
      .catch((err) => console.log(err))
      .finally(() => setRenderLoading(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__container'>
          <Header/>

          <Main 
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
          />

          <Footer/>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isRenderLoading={isRenderLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isRenderLoading={isRenderLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isRenderLoading={isRenderLoading}
          />

          <ImagePopup
            isOpen={isShowFullImagePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />

          <ConfirmDeleteCardPopup
            isOpen={isConfirmDeleteCardPopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
            onDeleteCard={handleCardDelete}
            isRenderLoading={isRenderLoading}
          />
          
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;