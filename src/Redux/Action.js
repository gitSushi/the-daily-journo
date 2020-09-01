// @ts-nocheck
import {
  CURRENT_USER,
  CLEAR_USER,
  ADD_USER,
  SHIFT_LAST_TEN,
  PUSH_LAST_TEN,
  SEND_POST,
  REMOVE_FRIEND,
  CREATE_AND_ADD_FRIEND,
  ADD_FRIEND
} from "./ActionType";

export const logCurrentUser = (user, id) => {
  return {
    type: CURRENT_USER,
    payload: {
      user,
      id
    }
  };
};

export const clearCurrentUser = () => {
  return {
    type: CLEAR_USER
  };
};

export const addUser = user => {
  return {
    type: ADD_USER,
    payload: {
      user
    }
  };
};

export const shiftLastTen = () => {
  return {
    type: SHIFT_LAST_TEN
  };
};

export const pushLastTen = ({ uId, pId }) => {
  return {
    type: PUSH_LAST_TEN,
    payload: {
      uId,
      pId
    }
  };
};

export const sendPost = ({ userId, post, date }) => {
  return {
    type: SEND_POST,
    payload: {
      userId,
      post,
      date
    }
  };
};

export const removeFriend = (urId, delIdx) => {
  return {
    type: REMOVE_FRIEND,
    payload: {
      urId,
      delIdx
    }
  };
};

export const createAndAddFriend = (uzerId, name) => {
  return {
    type: CREATE_AND_ADD_FRIEND,
    payload: {
      uzerId,
      name
    }
  };
};

export const addFriend = (uzrId, friendName) => {
  return {
    type: ADD_FRIEND,
    payload: {
      uzrId,
      friendName
    }
  };
};
