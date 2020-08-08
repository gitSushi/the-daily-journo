//@ts-nocheck
import React from "react";
import Friend from "./Friend";
import { connect } from "react-redux";

class Friends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendIdx: this.props.friendIdx,
      friends: this.props.collections[this.props.friendIdx].friends
    };
  }

  render() {
    const { friendIdx } = this.state;
    const hasFriends = this.props.collections[friendIdx].hasOwnProperty("friends");
    return (
      <div>
        {!hasFriends ||
        (hasFriends && this.props.collections[friendIdx].friends.length === 0) ? (
          <p>Your Sucky Friends ain't here or YOU are a LOSER !</p>
        ) : (
          <div>
            <ul>
              {this.props.collections[friendIdx].friends.map((e, i) => (
                <Friend name={e} key={i} unfollow={this.props.unfollow} />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Friends);