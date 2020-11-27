import React, { Component } from "react";
import axios from "axios";
import MyForm from "./MyForm";
import TodoList from "./TodoList";
import Loader from "./Loader";
import "./app.css";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  state = {
    todos: [],
    loader: false,
    todo: {},
    url: "http://127.0.0.1:8000/api/todos",
    urlcompleted:"http://127.0.0.1:8000/api/todos/complete"
  };

  getCustomers = async () => {
    this.setState({ loader: true });
    const todos = await axios.get(this.state.url);
    this.setState({ todos: todos.data, loader: false });
  };

  deleteCustomer = async id => {
    this.setState({ loader: true });

    await axios.delete(`${this.state.url}/${id}`)
    .catch(e => {
      // console.log(e.message);
      alert(e.response.status === 404 ? "todo not found" : "");
    });

    this.getCustomers();
  };

  completedcostumer = async data => {
    this.setState({ loader: true });

    await axios.put(`${this.state.urlcompleted}/${data.id}`, {
      text: data.text,
      completed:1,
    })
         
    .catch(e => {
      // console.log(e.message);
      alert(e.response.status === 404 ? "todo not found" : "");
    });

    this.getCustomers();
  };
    
  createCustomer = async data => {
    this.setState({ loader: true });

    await axios
      .post(this.state.url, {
        text: data.text,
       
      })
      .catch(e => {
        // console.log(e.message)
        alert(e.response.status === 500 ? "todo already exists" : "");
      });

    this.getCustomers();
  };

  editCustomer = async data => {
    // clear todo obj
    this.setState({ todo: {} });

    this.setState({ loader: true });

    await axios
      .put(`${this.state.url}/${data.id}`, {
        text: data.text,
        
        
      })
      .catch(e => {
        console.log(e.message);
      });

    this.getCustomers();
  };

  componentDidMount() {
    this.getCustomers();
  }

  onDelete = id => {
     console.log("app ", id);
    this.deleteCustomer(id);
  };
  
  handleCompleted  = data => {
    // console.log("app ", id);
    this.completedcostumer(data);
  };

  onEdit = data => {
     console.log("app ", data.id);
    this.setState({ todo: data });
  };

  onFormSubmit = data => {
    // console.log("app ", data);
    // return;
    // console.log("app ", data);
    if (data.isEdit) {
      // if is edit true
      this.editCustomer(data);
    } else {
      // if is edit false
      this.createCustomer(data);
    }
  };

  render() {
    return (
      <div>
        <div className="ui fixed inverted menu">
          <div className="ui container">
            <a href="/#" className="header item">
             todo list
            </a>
          </div>
        </div>

        <div className="ui main container">
          <MyForm
            onFormSubmit={this.onFormSubmit}
            todo={this.state.todo}
          />
          {this.state.loader ? <Loader /> : ""}
          <TodoList
            todos={this.state.todos}
            onDelete={this.onDelete}
            onEdit={this.onEdit}
            handleCompleted={this.handleCompleted}
          />
        </div>
      </div>
    );
  }
}

export default App;
