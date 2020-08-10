// @ts-nocheck
import React from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import "./App.css";
import UserAccount from "./Components/UserAccount";
import { addUser } from "./Redux/Action";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      id: "admin",
      usersPosts: [],
      friendsPosts: [],
      idx: -1,
      showModal: false,
      availability: true,
      availabilityClass: "",
      boolPotential: false,
      activeIndex: 0
    };

    this.logOut = this.logOut.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.signIn = this.signIn.bind(this);
    this.availableName = this.availableName.bind(this);
    this.logIn = this.logIn.bind(this);
    this.formLogIn = this.formLogIn.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  logOut() {
    this.setState(
      {
        auth: !this.state.auth
      },
      this.handleCloseModal()
    );
  }

  handleOpenModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleCloseModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  signIn(e) {
    e.preventDefault();
    const name = e.target.newUserName.value;
    if (this.state.boolPotential) {
      this.props.addUser(name);

      this.setState(
        {
          id: name,
          availability: ""
        },
        this.formLogIn
      );
    }
  }

  availableName(e) {
    e.preventDefault();
    const typedIn = e.target.value;
    const toRegex = new RegExp(`^${typedIn}`);
    const potential = this.props.collections
      .map(user => {
        return !toRegex.test(user.user);
      })
      .every(bool => bool);

    this.setState({ boolPotential: potential });

    if (typedIn === "") {
      this.setState({
        availability: "",
        availabilityClass: ""
      });
    } else if (!potential) {
      this.setState({
        availability: "username is not available",
        availabilityClass: "not-available"
      });
    } else {
      this.setState({
        availability: "this username is now yours",
        availabilityClass: "is-available"
      });
    }
  }

  logIn(e) {
    e.preventDefault();
    const name = e.target.userName.value;
    this.setState(
      {
        id: name,
        activeIndex: 0
      },
      this.formLogIn
    );
  }

  getColIdx(name) {
    console.log(this.props)
    return this.props.collections.findIndex(col => {
      return col.user === name;
    });
  }

  formLogIn() {
    let idx = this.getColIdx(this.state.id);

    if (idx >= 0) {
      /*
       * get index of each collections[idx].friends from collections
       * (like above but for each friends)
       * then get their posts and add it to the colPostOfUserAndFriends
       * let colPostOfUserAndFriends =
       *  collections[idx].posts + eachPostsFromFriends
       */
      let friendsPosts = [];
      if (this.props.collections[idx].hasOwnProperty("friends")) {
        this.props.collections[idx].friends.forEach(friendsName => {
          let friendIdx = this.getColIdx(friendsName);
          let eachPosts = this.props.collections[friendIdx].posts;
          eachPosts.forEach(ea => {
            ea.user = friendsName;
          });
          friendsPosts = [...friendsPosts, ...eachPosts];
        });
      }

      this.setState({
        auth: !this.state.auth,
        usersPosts: this.props.collections[idx].posts,
        friendsPosts: friendsPosts,
        idx: idx
      });
    } else {
      alert("unrecognized user");
    }
  }

  formatTime(ms) {
    const t = new Date(parseInt(ms));
    return t.toDateString();
  }

  render() {
    let lT = this.props.lastTen
    return (
      <div>
        <nav className="title-nav">
          <div className="ze-wall">
            <h1>THE DAILY JOURNO</h1>
            <p>You write the news</p>
          </div>
          <div className="class-btn">
            {this.state.auth ? (
              <button onClick={this.logOut}>log out</button>
            ) : (
              <div>
                <button onClick={this.handleOpenModal}>log in</button>
                <ReactModal
                  isOpen={this.state.showModal}
                  contentLabel="onRequestClose Example"
                  onRequestClose={this.handleCloseModal}
                  shouldCloseOnOverlayClick={true}
                  className="Modal"
                  overlayClassName="Overlay"
                  ariaHideApp={false}
                >
                  <div className="flex-row-form">
                    <div className="flex-row-item">
                      <p>Sign in</p>
                      <form onSubmit={this.signIn}>
                        <input
                          type="text"
                          name="newUserName"
                          onChange={this.availableName}
                          required
                        />
                      </form>
                      <p
                        className={`availability ${this.state.availabilityClass}`}
                      >
                        {this.state.availability}
                      </p>
                    </div>
                    <div className="flex-row-item">
                      <p>Log in</p>
                      <form onSubmit={this.logIn}>
                        <input type="text" name="userName" required />
                      </form>
                    </div>
                    <div className="flex-row-item">
                      <span className="close" onClick={this.handleCloseModal}>
                        &times;
                      </span>
                    </div>
                  </div>
                </ReactModal>
              </div>
            )}
          </div>
        </nav>
        {this.state.auth ? (
          <UserAccount {...this.state} getIndex={this.getColIdx} />
        ) : (
          <div>
            <h2>The Latest News</h2>
            <div className="posts-wall">
              {this.props.lastTen.length > 0 ? (
                  lT.slice(0)
                  .reverse()
                  .map((e, i) => (
                    <div key={i} className="post-block">
                      <h3 className="wall-post username">
                        {this.props.collections[e.uId].user}
                      </h3>
                      <p className="wall-post post">
                        {this.props.collections[e.uId].posts[e.pId].post}
                      </p>
                      <p className="wall-post date">
                        {this.formatTime(
                          this.props.collections[e.uId].posts[e.pId].date
                        )}
                      </p>
                    </div>
                  ))
              ) : (
                <p>We are a brand new website. Be the first to leave a post.</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { addUser })(App);
//export default App;
