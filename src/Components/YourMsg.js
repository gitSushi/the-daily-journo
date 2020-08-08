//@ts-nocheck
import React from "react";

class YourMsg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      yourMsg: this.props.ownMsg
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.ownMsg !== prevProps.ownMsg) {
      // mock get from server
      this.setState({ yourMsg: this.props.ownMsg });
    }
  }

  when(ms) {
    let n = Date.now();
    // divided by 1 day in milliseconds
    let t = Math.floor((n - ms) / 86400000);
    return t < 1 ? "today" : t < 2 ? "Yesterday" : `${t} days ago`;
  }

  render() {
    return (
      <div>
        {this.state.yourMsg.length === 0 && <p>Your Most Intimate Thoughts</p>}
        <div className="your-msg-wall">
          {this.state.yourMsg
            .slice(0)
            .reverse()
            .map((e, i) => (
              <div key={i} className="your-msg">
                <p className="your-msg-post">{e.post}</p>
                <p className="date your-msg-date">at {this.when(e.date)}</p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default YourMsg;