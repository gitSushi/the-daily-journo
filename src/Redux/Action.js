// @ts-nocheck
import { ADD_USER, SHIFT_LAST_TEN, PUSH_LAST_TEN, SEND_POST } from "./ActionType";

export const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: {
      user,
    }
  };
};

export const shiftLastTen = () => {
  return {
    type: SHIFT_LAST_TEN,
  };
};

export const pushLastTen = ({ uId, pId }) => {
  return {
    type: PUSH_LAST_TEN,
    payload: {
      uId,
      pId,
    }
  };
};

export const sendPost = ({ userId, post, date }) => {
  return {
    type: SEND_POST,
    payload: {
      userId,
      post,
      date,
    }
  };
};
