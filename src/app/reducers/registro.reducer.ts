import { Action } from '@ngrx/store';
import { registroInterface } from '../interfaces/data.interface';

export const ADD_REGISTRO = 'ADD_REGISTRO';
export const GET_REGISTRO = 'GET_REGISTRO';

export function addRegistroReducer(state: registroInterface[] = [], action) {
  switch (action.type) {
    case ADD_REGISTRO:
        return [...state, action.payload];
    default:
        return state;
    }
}
