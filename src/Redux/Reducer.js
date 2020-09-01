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

const initialState = {
  collections: [
    {
      user: "user",
      posts: [
        {
          post: "still alive",
          date: "1589470081851"
        },
        {
          post: "alive and kicking",
          date: "1589642862204"
        }
      ],
      friends: ["admin", "bob"]
    },
    {
      user: "admin",
      posts: [
        {
          post: "working hard or ...",
          date: "1589470081851"
        },
        {
          post: "hardly working",
          date: "1589642862204"
        }
      ],
      friends: []
    },
    {
      user: "bob",
      posts: [
        {
          post: "singing all summer,",
          date: "1589470341051"
        },
        {
          post: "dying in winter",
          date: "1589642862204"
        }
      ],
      friends: []
    },
    {
      user: "jane",
      posts: [
        {
          post: "still looking for Tarzan ...",
          date: "70341051"
        },
        {
          post: "till the day I die",
          date: "1590396261640"
        }
      ],
      friends: []
    }
  ],
  lastTen: [],
  connectionStatus: {
    currentUser: "",
    connected: false,
    currentUserId: -1
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        connectionStatus: {
          currentUser: action.payload.user,
          connected: !state.connectionStatus.connected,
          currentUserId: action.payload.id
        }
      };
    case CLEAR_USER:
      return {
        ...state,
        connectionStatus: {
          currentUser: "",
          connected: !state.connectionStatus.connected,
          currentUserId: -1
        }
      };
    case ADD_USER:
      const { user } = action.payload;
      return {
        ...state,
        collections: [
          ...state.collections,
          {
            user,
            posts: [],
            friends: []
          }
        ]
      };
    case SHIFT_LAST_TEN:
      return {
        ...state,
        lastTen: [...state.lastTen.slice(1)]
      };
    case PUSH_LAST_TEN:
      const { uId, pId } = action.payload;
      return {
        ...state,
        lastTen: [
          ...state.lastTen,
          {
            uId,
            pId
          }
        ]
      };
    case SEND_POST:
      const { userId, post, date } = action.payload;
      let updatedCollections = { ...state };
      updatedCollections.collections[userId].posts.push({
        post,
        date
      });
      return {
        ...state,
        updatedCollections
      };
    case REMOVE_FRIEND:
      const { urId, delIdx } = action.payload;
      return {
        ...state,
        collections: [
          ...state.collections.map((col, idx) => {
            if (idx === urId) {
              return {
                ...col,
                friends: [...col.friends.filter((fr, id) => id !== delIdx)]
              };
            }
            return col;
          })
        ]
      };
    case CREATE_AND_ADD_FRIEND:
      const { uzerId, name } = action.payload;
      let createdFriends = { ...state };
      createdFriends.collections[uzerId].friends = [name];
      return {
        ...state,
        createdFriends
      };
    case ADD_FRIEND:
      const { uzrId, friendName } = action.payload;
      let addedFriends = { ...state };
      addedFriends.collections[uzrId].friends.push(friendName);
      return {
        ...state,
        addedFriends
      };
    default:
      return state;
  }
};
