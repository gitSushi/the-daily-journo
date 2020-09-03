import React from "react";
import { connect } from "react-redux";

function FriendsWall({ theWall }) {
  /*
   * returns when post was written in days
   * @param { int in milliseconds }
   * @return { string }
   */
  const when = (ms) => {
    let n = Date.now();
    // divided by 1 day in milliseconds
    let t = Math.floor((n - ms) / 86400000);
    return t < 1 ? "today" : t < 2 ? "Yesterday" : `${t} days ago`;
  };

  return (
    <div>
      {theWall.length === 0 && <p>No message on the board yet.</p>}
      <div className="the-wall">
        {theWall
          .slice()
          .sort(function (a, b) {
            return b.date - a.date;
          })
          .map((e, i) => (
            <div key={i} className="post-block">
              <h3 className="wall-post username">{e.userName}</h3>
              <p className="wall-post post">{e.post}</p>
              <p className="wall-post date">{when(e.date)}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { theWall: state.currentUser.friendsPosts };
};

export default connect(mapStateToProps)(FriendsWall);
