import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as contactsOperations from '../../redux/contacts-operations';
import s from './ContactList.module.css';

const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={s.contactsList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.ContactsListItem}>
          <p className={s.contact}>
            <span className={s.name}>{name}:</span>
            <span className={s.number}>{number}</span>
          </p>
          <button className={s.deleteBtn} onClick={() => onDeleteContact(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactsList.protoTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func,
};

const getFilteredContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLocaleLowerCase();

  return allContacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = ({ phonebook: { items, filter } }) => ({
  contacts: getFilteredContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsOperations.deleteContact(id)),
});

ContactsList.defaultProps = {
  contacts: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
