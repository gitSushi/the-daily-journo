import React from "react";
import { connect } from "react-redux";
import WallBtn from "./WallBtn";
import AddPost from "./AddPost";
import Friends from "./Friends";
import UserWall from "./UserWall";
import FriendsWall from "./FriendsWall";
import FollowFriend from "./FollowFriend";
import {
  sendPost,
  shiftLastTen,
  pushLastTen,
  removeFriend,
  addFriend,
  updateRemovedFriendsPosts,
  updateAddedFriendsPosts
} from "../Redux/Action";

const navBtns = [
  {
    title: "The Wall",
    key: 0
  },
  {
    title: "Your Messages",
    key: 1
  },
  {
    title: "Friends",
    key: 2
  }
];

class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      todaysDate: ""
    };

    this.submitPost = this.submitPost.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.methodAddFriend = this.methodAddFriend.bind(this);
  }

  componentDidMount() {
    let d = new Date();
    let year = d.getFullYear();
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december"
    ];
    let month = months[d.getMonth()];
    let dayNb = d.getDate();
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];
    let day = days[d.getDay()];
    this.setState({
      todaysDate: `${day}. ${month} ${dayNb}, ${year}`
    });
  }

  submitPost(e) {
    e.preventDefault();
    const msg = e.target.changeInput.value;
    if (msg !== "") {
      let d = Date.now();
      // mock send to server
      const postObj = {
        userId: this.props.currentUser.id,
        post: msg,
        date: `${d}`
      };
      this.props.sendPost(postObj);

      const lastTenObj = {
        userId: this.props.currentUser.id,
        postId:
          this.props.collections[this.props.currentUser.id].posts.length - 1
      };
      if (this.props.lastTen.length === 10) {
        this.props.shiftLastTen();
        this.props.pushLastTen(lastTenObj);
      } else {
        this.props.pushLastTen(lastTenObj);
      }
      e.target.changeInput.value = "";
    }
    // slides the form back up
    document
      .getElementsByClassName("the-form")[0]
      .classList.remove("slide-down");
    document
      .getElementsByClassName("share")[0]
      .classList.remove("rotate-to-hide");
  }

  clickWall(btnKey) {
    this.setState({ activeIndex: btnKey });
  }

  unfollow(e) {
    let fArr = this.props.collections[this.props.currentUser.id].friends;
    let unfriended = e.target.previousSibling.textContent;
    let filteredFriends = this.props.currentUser.friendsPosts.filter((e) => {
      return e.userName !== unfriended;
    });
    let delIdx = fArr.indexOf(unfriended);

    this.props.removeFriend(this.props.currentUser.id, delIdx);
    this.props.updateRemovedFriendsPosts(filteredFriends);
  }

  getNewPosts(name) {
    let nameIdx = this.props.collections.findIndex((col) => {
      return col.userName === name;
    });
    let newPosts = this.props.collections[nameIdx].posts;
    newPosts.forEach((ea) => {
      ea.userName = name;
    });
    this.props.updateAddedFriendsPosts(newPosts);
  }

  methodAddFriend(e) {
    e.preventDefault();
    const name = e.target.friendChoice.value;
    e.target.friendChoice.value = "";
    let users = [];
    this.props.collections.forEach((eachUser) => users.push(eachUser.userName));
    // if part of collections.user and not user themselve
    if (
      users.includes(name) &&
      name !== this.props.collections[this.props.currentUser.id].userName
    ) {
      // if not already among friends
      let alreadyMyBFF = this.props.collections[
        this.props.currentUser.id
      ].friends.includes(name);
      if (!alreadyMyBFF) {
        this.props.addFriend(this.props.currentUser.id, name);
        this.getNewPosts(name);
      }
    }
    // slide back up the form
    document
      .getElementsByClassName("the-form")[1]
      .classList.remove("slide-down");
    document
      .getElementsByClassName("share")[1]
      .classList.remove("rotate-to-hide");
  }

  render() {
    const { activeIndex, todaysDate } = this.state;
    return (
      <div>
        {this.props.currentUser.isLoggedIn && (
          <div>
            <p className="intro-user-account">
              <span>
                Hello{" "}
                <span className="username">{this.props.currentUser.name}</span>
              </span>
              <span className="todays-date">{todaysDate}</span>
            </p>
            <div className="cross-container">
              <AddPost submit={this.submitPost} />
              <FollowFriend attrAddFriend={this.methodAddFriend} />
            </div>

            <nav className="wall-nav">
              {navBtns.map((btn, btnIdx) => (
                <WallBtn
                  key={btn.key}
                  active={btnIdx === activeIndex}
                  onSetActive={() => this.clickWall(btnIdx)}
                  title={btn.title}
                />
              ))}
            </nav>
            {activeIndex === 0 ? (
              <div>
                <FriendsWall />
              </div>
            ) : activeIndex === 1 ? (
              <UserWall />
            ) : (
              <Friends unfollow={this.unfollow} />
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {
  sendPost,
  shiftLastTen,
  pushLastTen,
  removeFriend,
  addFriend,
  updateRemovedFriendsPosts,
  updateAddedFriendsPosts
})(UserAccount);
