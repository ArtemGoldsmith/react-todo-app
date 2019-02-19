import React, { Component } from 'react';
import './todo-list-item.css';

class TodoListItem extends Component {

  render() {
    const { label, onDelete, onToggleImportant, onToggleDone, important, done } = this.props;

    return (
      <span className={`todo-list-item ${done ? 'done' : ''} ${important ? 'important' : ''}`}>
        <span
          className="todo-list-item-label"
          onClick={onToggleDone}
        >
          {label}
        </span>

        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDelete}
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}

export default TodoListItem;
