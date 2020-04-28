import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

class TimerController extends Component {
  render() {
    const {
      id,
      title,
      decrementButton,
      lengthID,
      length,
      incrementButton,
    } = this.props;
    return (
      <div className='time-controller'>
        <h2 id={id}>{title}</h2>
        <div className='btn-level'>
          <button onClick={this.props.onClick} id={decrementButton} name='-'>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
          <h2 id={lengthID}>{length}</h2>
          <button
            onClick={this.props.onClick}
            className='btn-level'
            id={incrementButton}
            name='+'
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>
    );
  }
}

export default TimerController;
