//@ts-nocheck
import React from "react";
// import { connect } from "react-redux";

class TheWall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wallPostIts: this.props.wallPosts
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.wallPosts !== prevProps.wallPosts) {
      // mock get from server
      this.setState({ wallPostIts: this.props.wallPosts });
    }
  }

  /*
   * returns when post was written in days
   * @param { int in milliseconds }
   * @return { string }
   */
  when(ms) {
    let n = Date.now();
    // divided by 1 day in milliseconds
    let t = Math.floor((n - ms) / 86400000);
    return t < 1 ? "today" : t < 2 ? "Yesterday" : `${t} days ago`;
  }

  render() {
    return (
      <div>
        {this.props.wallPosts.length === 0 && (
          <p>No message on the board yet.</p>
        )}
        <div className="the-wall">
          {this.props.wallPosts
            .slice()
            .sort(function (a, b) {
              return b.date - a.date;
            })
            .map((e, i) => (
              <div key={i} className="post-block">
                <h3 className="wall-post username">{e.user}</h3>
                <p className="wall-post post">{e.post}</p>
                <p className="wall-post date">{this.when(e.date)}</p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => state;

// export default connect(mapStateToProps)(TheWall);
export default TheWall;
