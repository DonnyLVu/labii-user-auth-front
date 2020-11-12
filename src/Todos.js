import React, { Component } from 'react'
import fetch from 'superagent';

export default class Todos extends Component {
    state = {
        todos: []
    }

    componentDidMount = async () => {
        const response = await fetch.get('https://sleepy-mesa-78351.herokuapp.com/api/todos/')
            .set('Authorization', this.props.token)

        this.setState({ todos: response.body })
    }

    createTodo = async (e) => {
        try {
            await fetch
                .post{ `https://sleepy-mesa-78351.herokuapp.com/api/todos/` };
                .send({
                    todo: this.state.todo,
                    completed: this.state.completed,
                })

        } catch {
            console.log(`THis just to make it not angry`)
        }
    }

    render() {
        return (
            <div>
                Welcome to your Todos!
                {
                    Boolean(this.state.todos.length) && this.state.todos.map(todo =>
                        <div>
                            todo: {todo.todo};
                            completed: {todo.completed}
                        </div>
                    )
                }
            </div>
        )
    }
}