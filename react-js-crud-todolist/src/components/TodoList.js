import React, { Component } from "react";
import Todo from "./Todo";

class TodoList extends Component {
  onDelete = id => {
    // console.log("customer list ", id);
    this.props.onDelete(id);
  };

  onEdit = data => {
     //console.log("customer list ");
    this.props.onEdit(data);
  };
  handleCompleted  = data => {
    //console.log("customer list ",data);
   this.props.handleCompleted (data);
 };

  render() {
    const todos = this.props.todos;
    return (
      <div className="data">
        <table className="ui celled table">
          <thead>
            <tr>
              
              <th>tache</th>
             
              <th style={{ width: "200px" }}>Action</th>

            </tr>
          </thead>

          <tbody>
            {todos.map(todo => {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                  handleCompleted ={this.handleCompleted }
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TodoList;
