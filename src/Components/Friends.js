import React from "react";
import Friend from "./Friend";
import { connect } from "react-redux";

function Friends(props) {
  return (
    <div>
      {props.collections[props.currentUser.id].friends.length === 0 ? (
        <p>Your Sucky Friends ain't here or YOU are a LOSER !</p>
      ) : (
        <div>
          <ul>
            {props.collections[props.currentUser.id].friends.map((e, i) => (
              <Friend name={e} key={i} unfollow={props.unfollow} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Friends);
