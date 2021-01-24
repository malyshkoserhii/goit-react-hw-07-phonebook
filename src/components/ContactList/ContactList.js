import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredContacts } from '../../redux/selectors';
import * as contactsOperations from '../../redux/contacts-operations';
import s from './ContactList.module.css';

const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getFilteredContacts);

  return (
    <ul className={s.contactsList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.ContactsListItem}>
          <p className={s.contact}>
            <span className={s.name}>{name}:</span>
            <span className={s.number}>{number}</span>
          </p>
          <button
            className={s.deleteBtn}
            onClick={() => dispatch(contactsOperations.deleteContact(id))}
          >
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

ContactsList.defaultProps = {
  contacts: [],
};

export default ContactsList;
