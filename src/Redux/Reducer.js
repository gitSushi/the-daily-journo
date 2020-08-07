// @ts-nocheck
import { ADD_USER, SHIFT_LAST_TEN, PUSH_LAST_TEN, SEND_POST } from "./ActionType";

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
  lastTen: []
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
            posts: [],
          }
        ]
       };
    case SHIFT_LAST_TEN:
      return {
        ...state,
        lastTen: [
          ...state.lastTen.slice(1)
        ]
      };
    case PUSH_LAST_TEN:
      const { uId, pId } = action.payload;
      return {
        ...state,
        lastTen: [
          ...state.lastTen,
          {
            uId,
            pId,
          }
        ]
      };
    case SEND_POST:
      const { userId, post, date } = action.payload;
      let updatedCollections = {...state};
      updatedCollections.collections[userId].posts = {
        post,
        date,
      };
      return {
        ...state,
        updatedCollections
      }
    default:
      return state;
  }
};
