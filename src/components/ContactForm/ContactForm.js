import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import * as contactsOperations from '../../redux/contacts-operations';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: {
      value: '',
      error: false,
    },
    number: {
      value: '',
      error: false,
    },
  };

  static propTypes = {
    onAddNewContact: PropTypes.func,
    exsisted: PropTypes.func,
  };

  nameInputId = shortid.generate();
  phoneNumberId = shortid.generate();

  handleContactInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: {
        value,
        error: false,
      },
    });
  };

  handleContactSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    const valid = this.isValid(name.value, number.value);

    if (valid) {
      this.props.onAddNewContact(name.value, number.value);
      this.reset();
    }
  };

  isValid = (name, number) => {
    let validation = true;

    if (name.trim() === '') {
      this.setState(prevState => ({
        ...prevState,
        name: {
          ...prevState.name,
          error: true,
        },
      }));

      validation = false;
    }

    if (number.trim() === '') {
      this.setState(prevState => ({
        ...prevState,
        number: {
          ...prevState.number,
          error: true,
        },
      }));

      validation = false;
    }

    if (this.getExistedContact(name)) {
      alert(`${name} is alredy in contacts.`);

      validation = false;
    }

    return validation;
  };

  getExistedContact = name => {
    const { contacts } = this.props;
    return contacts.find(contact => contact.name === name);
  };

  reset() {
    this.setState({
      name: {
        value: '',
        error: false,
      },
      number: {
        value: '',
        error: false,
      },
    });
  }

  render() {
    const { name, number } = this.state;

    return (
      <>
        <h1 className={s.phonebookTitle}>Phonebook</h1>
        <form className={s.form} onSubmit={this.handleContactSubmit}>
          <label htmlFor={this.nameInputId} className={s.label}>
            <span className={s.labelDescription}> Name</span>
            <input
              type="text"
              name="name"
              value={name.value}
              id={this.nameInputId}
              className={s.input}
              onChange={this.handleContactInputChange}
            />
            {name.error && <span>Not valid</span>}
          </label>

          <label htmlFor={this.phoneNumberId} className={s.label}>
            <span className={s.labelDescription}>Number</span>
            <input
              type="tel"
              name="number"
              value={number.value}
              id={this.phoneNumberId}
              className={s.input}
              onChange={this.handleContactInputChange}
            />
            {number.error && <span>Not valid</span>}
          </label>

          <button type="submit" className={s.addContactBtn}>
            Add contact
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.phonebook.items,
});

const mapDispatchToProps = dispatch => ({
  onAddNewContact: (name, number) =>
    dispatch(contactsOperations.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
