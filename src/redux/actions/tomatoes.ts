import {ADD_TOMATO, INIT_TOMATO} from '../actionTypes';

export const addTomato = (payload: any) => {
  return {
    type: ADD_TOMATO,
    payload
  };
};

export const initTomato = (payload: any[]) => {
  return {
    type: INIT_TOMATO,
    payload
  };
};