import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isShowFullImagePopupOpen, setShowFullImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleUpdateUser (newProfileInfo) {
    api
      .editProfileInfo(newProfileInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar (newAvatar) {
    api
      .updateAvatar(newAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
 
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

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setShowFullImagePopupOpen(false);
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
          />

          <Footer/>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />                       

          <PopupWithForm
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            name='popup-add-place'
            title='Новое место'
            buttonName='Создать'>
              <label className='popup__form-field'>
                <input 
                  type='text' 
                  id='card-name' 
                  name='name' 
                  placeholder='Название' 
                  className='popup__item popup__item_input_card-name' 
                  required 
                  minLength='2' 
                  maxLength='30'
                />
                <span className='error' id='card-name-error'></span>
              </label>
              <label className='popup__form-field'>
                <input 
                  type='url' 
                  id='card-photo-url' 
                  name='link' 
                  placeholder='Ссылка на картинку' 
                  className='popup__item popup__item_input_card-photo-url' 
                  required
                />
                <span className='error' id='card-photo-url-error'></span>
              </label>
          </PopupWithForm>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            isOpen={isShowFullImagePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />
          
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;