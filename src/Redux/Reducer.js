// @ts-nocheck
import {
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
      ]
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
      ]
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
      ]
    }
  ],
  lastTen: [],
  currentUser: ""
};


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      const { user } = action.payload;
      return {
        ...state,
        collections: [
          ...state.collections,
          {
            user,
            posts: []
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
      /* 
      ADD ANOTHER REDUCER FUNCTION
      https://redux.js.org/basics/reducers
       */
      const { urId, delIdx } = action.payload
      return {
        ...state,
        collections: [
          ...state.collections.map((col, idx) => {
            if(idx === urId){
              return {
                ...col,
                friends: [
                  ...col.friends.filter((fr, id) => id !== delIdx)
                ]
              }
            }
            return col
          })
        ]
      };
    case CREATE_AND_ADD_FRIEND:
      const { uzerId, name } = action.payload;
      console.log("uzerId", uzerId)
      console.log("name", name)
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
