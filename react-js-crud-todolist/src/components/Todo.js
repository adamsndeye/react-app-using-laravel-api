import React, { Component } from "react";
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import "./app.css";
class Todo extends Component {
  onDelete = () => {
    
    this.props.onDelete(this.props.todo.id);
  };

  onEdit = () => {
    
    this.props.onEdit(this.props.todo);
  };

  handleCompleted = () => {
    
    this.props.handleCompleted(this.props.todo);
  };

  render() {
    const { id, text,completed } = this.props.todo;
    return (
      <tr style={{ padding: "15px" }}>
        
        <td>{completed?  <strike>{text}</strike>: text }</td>
       
        <td>
        <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li class="page-item">
        <button className="page-link">
            <input type="radio" style={{backgroundColor:'blue' }}    value={completed ? 'done':''    } onClick={this.handleCompleted}/> 
             
          </button>
            </li>
        <li class="page-item">
        <button className="page-link" onClick={this.onEdit}>
          <BsPencil />
          </button>
          </li>
          <li class="page-item">
          <button className="page-link" onClick={this.onDelete}>
          <BsTrashFill />
          </button>
            </li>
           
        
         
          
          </ul>
          </nav>
        </td>
      </tr>
    );
  }
}

export default Todo;
