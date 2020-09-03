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

const initialState = {
  collections: [
    {
      userName: "user",
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
      userName: "admin",
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
      userName: "bob",
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
      userName: "jane",
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
  currentUser: {
    name: "",
    isLoggedIn: false,
    id: -1,
    friendsPosts: []
  }
};

const getColIdx = (collections, name) => {
  return collections.findIndex((col) => {
    return col.userName === name;
  });
};

const friendsPostsReducer = (collections, id) => {
  let friendsPosts = [];
  if (collections[id].friends.length > 0) {
    collections[id].friends.forEach((friendsName) => {
      let friendIdx = getColIdx(collections, friendsName);
      let eachPosts = collections[friendIdx].posts;
      eachPosts.forEach((ea) => {
        ea.userName = friendsName;
      });
      friendsPosts = [...friendsPosts, ...eachPosts];
    });
  }
  return friendsPosts;
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: {
          name: action.payload.user,
          isLoggedIn: !state.currentUser.isLoggedIn,
          id: action.payload.id,
          friendsPosts: friendsPostsReducer(
            state.collections,
            action.payload.id
          )
        }
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: {
          name: "",
          isLoggedIn: !state.currentUser.isLoggedIn,
          id: -1,
          friendsPosts: []
        }
      };
    case ADD_USER:
      const { userName } = action.payload;
      return {
        ...state,
        collections: [
          ...state.collections,
          {
            userName,
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
      return {
        ...state,
        lastTen: [
          ...state.lastTen,
          {
            userId: action.payload.userId,
            postId: action.payload.postId
          }
        ]
      };
    case SEND_POST:
      const { post, date } = action.payload;
      let updatedCollections = { ...state };
      updatedCollections.collections[action.payload.userId].posts.push({
        post,
        date
      });
      return {
        ...state,
        updatedCollections
      };
    case REMOVE_FRIEND:
      return {
        ...state,
        collections: [
          ...state.collections.map((col, idx) => {
            if (idx === action.payload.userId) {
              return {
                ...col,
                friends: [
                  ...col.friends.filter(
                    (fr, id) => id !== action.payload.deletionId
                  )
                ]
              };
            }
            return col;
          })
        ]
      };
    case UPDATE_REMOVED_FRIENDS_POSTS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friendsPosts: action.payload.friendsPosts
        }
      };
    case UPDATE_ADDED_FRIENDS_POSTS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friendsPosts: [
            ...state.currentUser.friendsPosts,
            ...action.payload.friendsPosts
          ]
        }
      };
    case ADD_FRIEND:
      let addedFriends = { ...state };
      addedFriends.collections[action.payload.userId].friends.push(
        action.payload.friendName
      );
      return {
        ...state,
        addedFriends
      };
    default:
      return state;
  }
};
