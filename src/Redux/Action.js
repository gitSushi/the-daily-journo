import {
  CURRENT_USER,
  CLEAR_USER,
  ADD_USER,
  SHIFT_LAST_TEN,
  PUSH_LAST_TEN,
  SEND_POST,
  REMOVE_FRIEND,
  UPDATE_REMOVED_FRIENDS_POSTS,
  UPDATE_ADDED_FRIENDS_POSTS,
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

export const addUser = (userName) => {
  return {
    type: ADD_USER,
    payload: {
      userName
    }
  };
};

export const shiftLastTen = () => {
  return {
    type: SHIFT_LAST_TEN
  };
};

export const pushLastTen = ({ userId, postId }) => {
  return {
    type: PUSH_LAST_TEN,
    payload: {
      userId,
      postId
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

export const removeFriend = (userId, deletionId) => {
  return {
    type: REMOVE_FRIEND,
    payload: {
      userId,
      deletionId
    }
  };
};

export const updateRemovedFriendsPosts = (friendsPosts) => {
  return {
    type: UPDATE_REMOVED_FRIENDS_POSTS,
    payload: {
      friendsPosts
    }
  };
};

export const updateAddedFriendsPosts = (friendsPosts) => {
  return {
    type: UPDATE_ADDED_FRIENDS_POSTS,
    payload: {
      friendsPosts
    }
  };
};

export const addFriend = (userId, friendName) => {
  return {
    type: ADD_FRIEND,
    payload: {
      userId,
      friendName
    }
  };
};
