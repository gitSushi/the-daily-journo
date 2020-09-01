//@ts-nocheck
import React from "react";
import { connect } from "react-redux";
import WallBtn from "./WallBtn";
import Cross from "./Cross";
import Friends from "./Friends";
import YourMsg from "./YourMsg";
import TheWall from "./TheWall";
import AddFriend from "./AddFriend";
import {
  sendPost,
  shiftLastTen,
  pushLastTen,
  removeFriend,
  createAndAddFriend,
  addFriend
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
      postIts: this.props.usersPosts,
      friendlyPosts: this.props.friendsPosts,
      activeIndex: 0,//this.props.activeIndex
      todaysDate: ""
    };

    this.submitForm = this.submitForm.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.addFriend = this.addFriend.bind(this);
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

  componentDidUpdate(prevProps) {
    /*
    Conventionally DO NOT MIRROR A STATE TO A PROPS !
    Just use the props.
    I only do it to allow the updated render when submit is used
    */
    if (this.props.usersPosts !== prevProps.usersPosts) {
      // mock get from server
      this.setState({
        postIts: this.props.usersPosts,
        friendlyPosts: this.props.friendsPosts,
        //activeIndex: this.props.activeIndex
      });
      console.log("componentDidUpdate friendlyPosts")
      console.log(this.state.friendlyPosts)
    }
  }

  submitForm(e) {
    e.preventDefault();
    const msg = e.target.changeInput.value;
    if (msg !== "") {
      let d = Date.now();
      // mock send to server
      const postObj = {
        userId: this.props.connectionStatus.currentUserId,
        post: msg,
        date: `${d}`
      };
      this.props.sendPost(postObj);

      const lastTenObj = {
        uId: this.props.connectionStatus.currentUserId,
        pId: this.props.collections[this.props.connectionStatus.currentUserId].posts.length - 1
      };
      if (this.props.lastTen.length === 10) {
        this.props.shiftLastTen();
        this.props.pushLastTen(lastTenObj);
      } else {
        this.props.pushLastTen(lastTenObj);
      }
      //console.log("send to server");
      // clear input
      e.target.changeInput.value = "";
      // to update the render method
      this.setState({ postIts: this.props.collections[this.props.connectionStatus.currentUserId].posts });
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
    let fArr = this.props.collections[this.props.connectionStatus.currentUserId].friends;
    let unfriended = e.target.previousSibling.textContent;
    let filteredFriends = this.state.friendlyPosts.filter(e => {
      return e.user !== unfriended;
    });
    let delIdx = fArr.indexOf(unfriended);
    
    this.props.removeFriend(this.props.connectionStatus.currentUserId, delIdx);
    this.setState({
      friendlyPosts: [...filteredFriends]
    });
  }

  getNewPosts(name) {
    let nameIdx = this.props.collections.findIndex(col => {
      return col.user === name;
    });
    let newPosts = this.props.collections[nameIdx].posts;
    newPosts.forEach(ea => {
      ea.user = name;
    });
    this.setState({
      friendlyPosts: [...this.state.friendlyPosts, ...newPosts]
    });
  }

  addFriend(e) {
    e.preventDefault();
    const name = e.target.friendChoice.value;
    e.target.friendChoice.value = "";
    let users = [];
    this.props.collections.forEach(eachUser => users.push(eachUser.user));
    // if part of collections.user and not user themselve
    if (
      users.includes(name) &&
      name !== this.props.collections[this.props.connectionStatus.currentUserId].user
    ) {
      // if you were still a LOSER
      if (!this.props.collections[this.props.connectionStatus.currentUserId].hasOwnProperty("friends")) {
        this.props.createAndAddFriend(this.props.connectionStatus.currentUserId, name)
        this.getNewPosts(name);
      } else {
        // if not already among friends
        let alreadyMyBFF = this.props.collections[
          this.props.connectionStatus.currentUserId
        ].friends.includes(name);
        if (!alreadyMyBFF) {
          this.props.addFriend(this.props.connectionStatus.currentUserId, name)
          this.getNewPosts(name);
        }
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
        {this.props.connectionStatus.connected && (
          <div>
            <p className="intro-user-account">
              <span>
                Hello <span className="username">{this.props.connectionStatus.currentUser}</span>
              </span>
              <span className="todays-date">{todaysDate}</span>
            </p>
            <div className="cross-container">
              <Cross submit={this.submitForm} />
              <AddFriend addFriend={this.addFriend} />
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
                {console.log("render friendlyPosts")}
                {console.log(this.props.friendsPosts)}
                <TheWall wallPosts={this.props.friendsPosts} />
              </div>
            ) : activeIndex === 1 ? (
              <YourMsg ownMsg={this.state.postIts} />
            ) : (
              <Friends friendIdx={this.props.connectionStatus.currentUserId} unfollow={this.unfollow} />
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  sendPost,
  shiftLastTen,
  pushLastTen,
  removeFriend,
  createAndAddFriend,
  addFriend
})(UserAccount);
