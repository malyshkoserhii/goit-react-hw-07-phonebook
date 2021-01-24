import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import * as contactsOperations from '../../redux/contacts-operations';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const dispatch = useDispatch();

  const contacts = useSelector(state => state.phonebook.items);

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
    const valid = isValid(name, number);

    if (valid) {
      dispatch(contactsOperations.addContact(name, number));
      reset();
    }
  };

  const getExistedContact = name => {
    return contacts.find(contact => contact.name === name);
  };

  const isValid = (name, number) => {
    let validation = true;

    if (name.trim() === '') {
      setNameError(true);

      validation = false;
    }

    if (number.trim() === '') {
      setNumberError(true);

      validation = false;
    }

    if (getExistedContact(name)) {
      alert(`${name} is alredy in contacts.`);

      validation = false;
    }

    return validation;
  };

  const reset = () => {
    setName('');
    setNumber('');
    setNameError(false);
    setNumberError(false);
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
          {nameError && <span>Not valid</span>}
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
          {numberError && <span>Not valid</span>}
        </label>

        <button type="submit" className={s.addContactBtn}>
          Add contact
        </button>
      </form>
    </>
  );
};

ContactForm.propTypes = {
  onAddNewContact: PropTypes.func,
};

export default ContactForm;
