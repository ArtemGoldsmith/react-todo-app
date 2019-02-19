import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

class App extends Component {

  // TODO fix removing element on event update
  minId = 100;

  constructor() {
    super();

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch'),
      ]
    };
  }

  createTodoItem = (label) => {
    return {
      label: label,
      important: false,
      done: false,
      id: this.minId++,
    }
  };

  onDelete = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.splice(0, index),
        ...todoData.splice(index + 1)
      ];

      return {
        todoData: newArray
      }
    });
  };

  onItemAdded = (item) => {
    const newItem = this.createTodoItem(item);

    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem]
      }
    });
  };

  toggleProperty = (arr, id, propName) => {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [
      ...arr.splice(0, index),
      newItem,
      ...arr.splice(index + 1)
    ];

  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  };
  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel/>
          <ItemStatusFilter/>
        </div>

        <TodoList
          todos={todoData}
          onDelete={this.onDelete}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm
          onItemAdded={this.onItemAdded}
        />
      </div>
    );
  }
}

export default App;
