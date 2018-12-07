import React, { Component } from 'react';
import './App.css';

import TodoListFull from './TodoList/TodoListFull';

class App extends Component {
  render() {
    return (
      <TodoListFull />
    //   <div>
    //     <title>To-Do</title>
    //     <div className="container">
    //       <div id="container" className="col-md-8 col-md-offset-2">  </div>
    //     </div>
    // </div>
    );
  }
}

export default App;
