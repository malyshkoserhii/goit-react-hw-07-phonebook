import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import s from './ContactItem.module.css';
import * as contactsOperations from '../../redux/contacts-operations';

const ContactItem = ({ contact }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(contact);
  const dispatch = useDispatch();
  const { name, number, id } = contact;

  const contactEdit = () => {
    setIsEdit(true);
  };

  const onEditChange = (e, key) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const onCancel = () => {
    setIsEdit(false);
    setForm(contact);
  };

  const saveContact = e => {
    e.preventDefault();
    dispatch(contactsOperations.editContact(form));
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <li className={s.ContactsListItem}>
        <form className={s.contact} onSubmit={saveContact}>
          <input
            name="name"
            value={form.name}
            onChange={e => onEditChange(e, 'name')}
          />
          <input
            name="number"
            value={form.number}
            onChange={e => onEditChange(e, 'number')}
          />
          <button type="submit" className={s.deleteBtn}>
            Save
          </button>
          <button type="button" className={s.deleteBtn} onClick={onCancel}>
            Cancel
          </button>
        </form>
      </li>
    );
  }

  return (
    <li className={s.ContactsListItem}>
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
      <button className={s.deleteBtn} onClick={contactEdit}>
        Edit
      </button>
    </li>
  );
};

ContactItem.protoTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func,
};

ContactItem.defaultProps = {
  contacts: [],
};

export default ContactItem;
