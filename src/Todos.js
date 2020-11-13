import React, { Component } from 'react'
import fetch from 'superagent';
import './App.css';

export default class Todos extends Component {
    state = {
        todos: [],
        todo: '',
        completed: false,
        loading: false,
    }

    componentDidMount = async () => {
        await this.fetchTodos()
    }

    fetchTodos = async () => {
        await this.setState({ loading: true });
        const { token } = this.props;
        const response = await fetch
            .get('https://sleepy-mesa-78351.herokuapp.com/api/todos')
            .set('Authorization', token)
        await this.setState({ todos: response.body, loading: false })
    }

    handleSubmit = async (e) => {
        const { todo } = this.state;
        const { token } = this.props;
        e.preventDefault();
        const newTodo = {
            todo: todo,
        };
        await this.setState({ loading: true });
        console.log(newTodo)
        await fetch.post('https://sleepy-mesa-78351.herokuapp.com/api/todos')
            .send(newTodo)
            .set('Authorization', token);

        await this.fetchTodos();
    }


    handleChangeCompleted = async (someId) => {
        const { token } = this.props;
        await fetch.put(`https://sleepy-mesa-78351.herokuapp.com/api/todos/${someId}`)
            .set('Authorization', token)

        await this.fetchTodos();
    }

    render() {
        const { todo, todos } = this.state;
        return (
            <>
                <div className="App">
                    Welcome to Todos!
                    {/* {
                        this.state.todos.length && this.state.todos.map(todo =>
                            <div>
                                todo: {todo.todo};
                                completed: {todo.completed.toString()}
                            </div>
                        )
                    } */}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h1>Create Your Own todo!</h1>
                        <h2>WHat is the name of your Todo?</h2>
                        <div>
                            {/* Name For Todo */}
                            <input value={todo} onChange={(e => this.setState({ todo: e.target.value }))} type="text" />
                        </div>
                        <div>
                            <h2>Is it Completed?</h2>
                            <select onChange={this.handleChangeCompleted}>
                                <option value={true}>TRUE</option>
                                <option value={false}>FALSE</option>
                            </select>
                        </div>
                        <button><h2>FINALIZE TODO</h2></button>
                    </label>
                </form>
                <form>
                    <label>
                        {
                            this.state.loading
                                ? 'Loading up the todo list!'
                                : todos.map(item => <div key={`${item.todo}${item.id}`} style={{
                                    textDecoration: item.completed ? 'line-through' : 'none'
                                }
                                }>
                                    TO DO! {item.todo}
                                    {
                                        item.completed ? '' : <button onClick={() => this.handleDoneClick(item.id)}> Click me to cross off! </button>
                                    }
                                </div>)
                        }
                    </label>
                </form>
            </>
        )
    }
}