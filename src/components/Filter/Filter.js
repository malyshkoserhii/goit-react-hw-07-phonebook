import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { getFilter } from '../../redux/selectors';
import * as actions from '../../redux/actions';
import s from './Filter.module.css';

const Filter = () => {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  const filterInputId = shortid.generate();

  return (
    <section className={s.contactsSection}>
      <h2 className={s.contactsTitle}>Contacts</h2>
      <label htmlFor={filterInputId} className={s.label}>
        <span className={s.findDescription}>Find contact by name:</span>
        <input
          type="text"
          name="filter"
          value={value}
          id={filterInputId}
          className={s.input}
          onChange={e => dispatch(actions.changeFilter(e.target.value))}
        />
      </label>
    </section>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  changeFilter: PropTypes.func,
};

export default Filter;
