import { connect } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import * as types from '../../redux/actions';
import s from './Filter.module.css';

const Filter = ({ value, changeFilter }) => {
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
          onChange={changeFilter}
        />
      </label>
    </section>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func,
};

const mapStateToProps = state => ({
  value: state.phonebook.filter,
});

const mapDispatchToProps = dispatch => ({
  changeFilter: e => dispatch(types.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
