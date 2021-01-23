import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import * as actions from '../../redux/actions';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
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
      [name]: value,
    });
  };

  handleContactSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    if (this.state.name.trim() === '') {
      alert('Enter the name');
      return;
    }

    if (this.getExistedContact(name)) {
      alert(`${name} is alredy in contacts.`);
      this.reset();
      return;
    }

    if (this.state.number.trim() === '') {
      alert('Enter the phone number');
      return;
    }

    if (name && number) {
      this.props.onAddNewContact(name, number);
      this.reset();
      return;
    }
  };

  getExistedContact = name => {
    const { contacts } = this.props;
    return contacts.find(contact => contact.name === name);
  };

  reset() {
    this.setState({ name: '', number: '' });
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
              value={name}
              id={this.nameInputId}
              className={s.input}
              onChange={this.handleContactInputChange}
            />
          </label>

          <label htmlFor={this.phoneNumberId} className={s.label}>
            <span className={s.labelDescription}>Number</span>
            <input
              type="tel"
              name="number"
              value={number}
              id={this.phoneNumberId}
              className={s.input}
              onChange={this.handleContactInputChange}
            />
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
  onAddNewContact: (name, number) => dispatch(actions.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
