import React, { Component } from 'react'
import fetch from 'superagent';

export default class Signup extends Component {
    state = {
        email: '',
        password: ''
    }

    // Handles submit of email, password
    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);

        const user = await fetch
            .post('https://plant-dani-plant-2020.herokuapp.com/auth/signup')
            .send(this.state);
        this.props.changeTokenAndUsername(user.body.email, user.body.token);
        this.props.history.push('/todos');

        alert('You have submitted a signup! Taking You to Todo Home page now!');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <button>
                        Sign up!
                    </button>
                    <label>
                        Email:
                        <input
                            onChange={(e) => this.setState({ email: e.target.value })}
                            value={this.state.email} />
                    </label>
                    <label>
                        Password:
                        <input
                            onChange={(e) => this.setState({ password: e.target.value })}
                            value={this.state.password} type="password" />
                    </label>
                    <button>
                        Sign up!
                    </button>
                </form>
            </div>
        )
    }
}