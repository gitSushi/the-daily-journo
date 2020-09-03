import React from "react";

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unfollowSpan: ""
    };

    this.showUnfollow = this.showUnfollow.bind(this);
    this.hideUnfollow = this.hideUnfollow.bind(this);
  }

  showUnfollow() {
    this.setState({
      unfollowSpan: "unfollow"
    });
  }
  hideUnfollow() {
    this.setState({
      unfollowSpan: ""
    });
  }

  render() {
    return (
      <div>
        <li
          className="friend-item"
          onMouseOver={this.showUnfollow}
          onMouseLeave={this.hideUnfollow}
        >
          {this.props.name}
          <span
            onClick={this.props.unfollow}
            className="unfollow"
            onMouseOver={(f) => {
              f.target.style.color = "red";
            }}
            onMouseLeave={(f) => {
              f.target.style.color = "#333";
            }}
          >
            {this.state.unfollowSpan}
          </span>
        </li>
      </div>
    );
  }
}

export default Friend;
