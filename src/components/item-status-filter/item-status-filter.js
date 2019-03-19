import React, { Component } from 'react';
import './item-status-filter.css';

class ItemStatusFilter extends Component {
  state = {
    filter: ''
  };

  buttons = [
    {
      name: 'all',
      label: 'All',
    },
    {
      name: 'active',
      label: 'Active',
    },
    {
      name: 'done',
      label: 'Done',
    },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({name, label}) => {
      const isActive = filter === name;
      return (
        <button key={name}
                type="button"
                className={`btn ${isActive ? 'btn-info' : 'btn-outline-secondary'}`}
                onClick={() => onFilterChange(name)}>{label}
        </button>
      );
    });

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}

export default ItemStatusFilter;
