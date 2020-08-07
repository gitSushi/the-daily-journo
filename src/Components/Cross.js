//@ts-nocheck
import React from "react";

class Cross extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.big = this.big.bind(this);
  }

  componentDidMount() {}

  big() {
    document.getElementsByClassName("share")[0].classList.add("rotate-to-hide");
    document.getElementsByClassName("the-form")[0].classList.add("slide-down");
  }

  render() {
    return (
      <div className="form-container">
        <div className="share" onClick={this.big}>
          <span>
            <i className="fas fa-pen-nib fa-2x"></i>
          </span>
        </div>
        <div className="the-form">
          <form onSubmit={this.props.submit}>
            <label for="feel-like-sharing">Feel like sharing :</label>
            <input id="feel-like-sharing" type="text" name="changeInput" />
          </form>
        </div>
      </div>
    );
  }
}

export default Cross;