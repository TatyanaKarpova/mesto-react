import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  function handleEditProfileClick () {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
  }

  return (
    <div className='page'>
      <div className='page__container'>
        <Header/>

        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}/>

        <Footer/>

        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          name='popup-edit-profile'
          title='Редактировать профиль'
          buttonName='Сохранить'>
            <label className='popup__form-field'>
              <input type='text' id='name' name='name' defaultValue='Жак-Ив Кусто' placeholder='Имя' className='popup__item popup__item_input_name' required minLength='2' maxLength='40'/>
              <span className='error' id='name-error'></span>
            </label>
            <label className='popup__form-field'>
              <input type='text' id='occupation' name='about' defaultValue='Исследователь океана' placeholder='О себе' className='popup__item popup__item_input_occupation' required minLength='2' maxLength='200'/>
              <span className='error' id='occupation-error'></span>
            </label>
        </PopupWithForm>

        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          name='popup-add-place'
          title='Новое место'
          buttonName='Создать'>
            <label className='popup__form-field'>
              <input type='text' id='card-name' name='name' placeholder='Название' className='popup__item popup__item_input_card-name' required minLength='2' maxLength='30'/>
              <span className='error' id='card-name-error'></span>
            </label>
            <label className='popup__form-field'>
              <input type='url' id='card-photo-url' name='link' placeholder='Ссылка на картинку' className='popup__item popup__item_input_card-photo-url' required/>
              <span className='error' id='card-photo-url-error'></span>
            </label>
        </PopupWithForm>

        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          name='popup-edit-avatar'
          title='Обновить аватар'
          buttonName='Сохранить'>
            <label className='popup__form-field'>
              <input type='url' id='avatar-image-link' name='avatar' placeholder='Ссылка на новое фото' className='popup__item popup__item_input-avatar-link' required/>
              <span className='error' id='avatar-image-link-error'></span>
            </label>
        </PopupWithForm>

        <ImagePopup/>
        
      </div>
    </div>
  );
}

export default App;