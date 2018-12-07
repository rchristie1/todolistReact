import React, { Component } from 'react';
import './TodoList.css'
import axios from 'axios';

const Title = ({todoCount}) => {
    return (
      <div>
         <div>
            <h1>to-do ({todoCount})</h1>
         </div>
      </div>
    );
}

const TodoForm = ({addTodo}) => {
    // Input Tracker
    let input;
    // Return JSX

    return (
      <form onSubmit={(e) => {
          e.preventDefault();
          addTodo(input.value);
          input.value = '';
        }}>
        <input className="form-control col-md-12" ref={node => {
          input = node;
        }} />
        <br />
      </form>
    );
};

const Todo = ({todo, remove}) => {
  // Each Todo
  return (    
  <a href="#" className="list-group-item" onClick={() => {remove(todo.id)}}>{todo.title}</a>);
}

const TodoList = ({todos, remove}) => {
    // Map through the todos
    const todoNode = todos.map((todo) => {      
      return (<Todo todo={todo} key={todo.id} remove={remove}/>)
    });
    return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);
}

window.id = 0;
  
  


class TodoListFull extends Component {

    constructor(props){
        // Pass props to parent class
        super(props);
        // Set initial state
        this.state = {
          data: []
        }
        // FireBase
        // this.apiUrl = 'https://todolist-17b04.firebaseio.com/'

        // JSON Placeholder 
        this.apiUrl = 'https://jsonplaceholder.typicode.com/posts';
        // this.addItem = this.addItem.bind(this);
    }

    // Lifecycle method
    componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });      
    }

    // Add todo handler
    addTodo(val){
        // Assemble data
        const todo = {title: val, id: Date.now()}
        // Update data

        axios.post(this.apiUrl, todo)
           .then((res) => {
              this.state.data.push(res.data);
              this.setState({data: this.state.data});
        });
    }

    // Handle remove fix
    handleRemove(id){

      console.log(id);
      
        // Filter all todos except the one to be removed
        const remainder = this.state.data.filter((todo) => {
          if(todo.id !== id) return todo;
        });
        // Update state with filter
        axios.delete(this.apiUrl+'/'+id)
        .then((res) => {
            this.setState({data: remainder});      
        })
    }

    render() {
        return(
        <div>
          <Title todoCount={this.state.data.length}/>
          <TodoForm addTodo={this.addTodo.bind(this)}/>
          <TodoList 
            todos={this.state.data} 
            remove={this.handleRemove.bind(this)}
          />
        </div>
        )
    };
}

export default TodoListFull;