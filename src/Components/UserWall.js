import React from "react";
import { connect } from "react-redux";

function UserWall(props) {
  const when = (ms) => {
    let n = Date.now();
    // divided by 1 day in milliseconds
    let t = Math.floor((n - ms) / 86400000);
    return t < 1 ? "today" : t < 2 ? "Yesterday" : `${t} days ago`;
  };

  let yourMsg = props.collections[props.currentUser.id].posts;
  return (
    <div>
      {yourMsg.length === 0 && <p>Your Most Intimate Thoughts</p>}
      <div className="your-msg-wall">
        {yourMsg
          .slice(0)
          .reverse()
          .map((e, i) => (
            <div key={i} className="your-msg">
              <p className="your-msg-post">{e.post}</p>
              <p className="date your-msg-date">at {when(e.date)}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(UserWall);
