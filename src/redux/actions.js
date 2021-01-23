import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction(
  'types/addContact',
  function prepare(name, number) {
    return {
      payload: {
        id: uuidv4(),
        name,
        number,
      },
    };
  },
);

export const deleteContact = createAction('types/deleteContact');
export const changeFilter = createAction('types/changeFilter');
