import React, {Component} from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';

class Todolist extends Component{
    // static defaultProps = {
    // }
    constructor(props){
        super(props);
        this.state = {
            todos : []
        }
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.update = this.update.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }
    addTodo(newTodo){
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    }
    removeTodo(id){
        // this filters out all the ids that are not the targeted id 
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    }
    update(id, updatedTask){
        const updatedTodos = this.state.todos.map(todo => {
            if(todo.id === id){
                return { ...todo, task:updatedTask};
            }
            return todo;
        })
        this.setState({ todos : updatedTodos })
    }
    toggleCompletion(id){
        const updatedTodos = this.state.todos.map(todo => {
            if(todo.id === id){
                return { ...todo, completed: !todo.completed}
            }
            return todo;
        })
        this.setState({ todos: updatedTodos })
    }
    render(){
        const todos = this.state.todos.map(todo => {
            return <Todo key={todo.id} 
                    id={todo.id} 
                    task={todo.task} 
                    completed={todo.completed} 
                    remove={this.removeTodo} 
                    updatedTodo={this.update}
                    toggleTodo={this.toggleCompletion}/>
        })
        return(
            <div>
                <h1>Todo List</h1>
                <NewTodoForm createTodo={this.addTodo} />
                <ul>
                    {todos}
                </ul>
            </div>
        )  
    }
}

export default Todolist;