import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Loader from 'react-loader-spinner';
import * as contactsOperations from '../../redux/contacts-operations';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const contacts = useSelector(state => state.phonebook.items);
  const isLoading = useSelector(state => state.phonebook.loading);

  const nameInputId = shortid.generate();
  const phoneNumberId = shortid.generate();

  const handleContactInputChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleContactSubmit = e => {
    e.preventDefault();

    if (name.trim() === '') {
      alert('Please enter the name');
      return;
    }

    if (number.trim() === '') {
      alert('Please enter the number');
      return;
    }

    if (getExistedContact(name)) {
      alert(`${name} is alredy in contacts.`);
      reset();
      return;
    }

    if (name && number) {
      dispatch(contactsOperations.addContact(name, number));
      reset();
    }
  };

  const getExistedContact = name => {
    return contacts.find(contact => contact.name === name);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <h1 className={s.phonebookTitle}>Phonebook</h1>
      <form className={s.form} onSubmit={handleContactSubmit}>
        <label htmlFor={nameInputId} className={s.label}>
          <span className={s.labelDescription}> Name</span>
          <input
            type="text"
            name="name"
            value={name}
            id={nameInputId}
            className={s.input}
            onChange={handleContactInputChange}
          />
        </label>

        <label htmlFor={phoneNumberId} className={s.label}>
          <span className={s.labelDescription}>Number</span>
          <input
            type="tel"
            name="number"
            value={number}
            id={phoneNumberId}
            className={s.input}
            onChange={handleContactInputChange}
          />
        </label>

        <button type="submit" className={s.addContactBtn}>
          Add contact
        </button>
      </form>
      <div className={s.loaderWrapper}>
        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={60}
            width={60}
            timeout={2000}
          />
        )}
      </div>
    </>
  );
};

ContactForm.propTypes = {
  onAddNewContact: PropTypes.func,
};

export default ContactForm;
