import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ContactItem from '../ContactItem';
import { getFilteredContacts } from '../../redux/selectors';
import s from './ContactList.module.css';

const ContactsList = () => {
  const contacts = useSelector(getFilteredContacts);

  return (
    <ul className={s.contactsList}>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
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
