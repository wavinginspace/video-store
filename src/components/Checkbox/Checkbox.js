import React from 'react';
import './Checkbox.scss';

class Checkbox extends React.Component {
  render() {
    return (
      <div className="label-wrapper">
        <label className="checkbox-label" htmlFor={this.props.name}>
          {this.props.name}
        </label>
        <input
          className="checkbox-input"
          type={this.props.type}
          id={this.props.id}
          name={this.props.name}
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default Checkbox;
