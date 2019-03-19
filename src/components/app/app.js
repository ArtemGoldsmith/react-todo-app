import React, { Component } from 'react';

import AppHeader from '../app-header/index';
import SearchPanel from '../search-panel/index';
import TodoList from '../todo-list/index';
import ItemStatusFilter from '../item-status-filter/index';
import ItemAddForm from '../item-add-form/index';

import './app.css';

class App extends Component {

  minId = 100;

  state = {
    items: [
      this.createItem('Drink Coffee'),
      this.createItem('Learn React'),
      this.createItem('Make Awesome App')
    ],
    term: '',
    filter: 'all'
  };

  createItem(label) {
    return {
      id: ++this.minId,
      label,
      important: false,
      done: false
    }
  }

  onItemAdded = (label) => {
    this.setState(({ items }) => {
      const item = this.createItem(label);
      return { items: [...items, item] };
    })
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value } ;
    return [
      ...arr.slice(0, idx),
      item,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleDone = (id) => {
    this.setState(({ items }) => {
      const array = this.toggleProperty(items, id, 'done');
      return { items: array };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ items }) => {
      const array = this.toggleProperty(items, id, 'important');
      return { items: array };
    });
  };

  onDelete = (id) => {
    this.setState(({ items }) => {
      const idx = items.findIndex((item) => item.id === id);
      const array = [
        ...items.slice(0, idx),
        ...items.slice(idx + 1)
      ];
      return { items: array };
    });
  };

  search = (items, term) => {
    if ( term.length === 0 ) {
      return items;
    }

    return items.filter((item) => {
      return item.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1;
    });
  };

  filter = (items, filter) => {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { items, term, filter } = this.state;
    const doneCount = items.filter((el) => el.done).length;
    const todoCount = items.length - doneCount;
    const visibleItems = this.filter(this.search(items, term), filter);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter onFilterChange={this.onFilterChange} filter={filter} />
        </div>

        <TodoList
          todos={visibleItems}
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
