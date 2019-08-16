import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';

import styles from './App.css';

import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';
const socket = io('/');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [], messages: [], text: '', name: '', colors: []};
    };

    componentDidMount() {
        socket.on('message', message => this.messageReceive(message));
        socket.on('update', ({ users }) => this.chatUpdate(users));
        socket.on('colors', ({ colors }) => this.colorUpdate(colors));
    };

    messageReceive(message) {
        const messages = [message, ...this.state.messages];
        this.setState({ messages });
    };

    chatUpdate(users) {
        this.setState({ users});
    };

    colorUpdate(colors) {
        this.setState({colors})
        console.log(this.state.colors)
    };

    handleMessageSubmit(message) {
        const messages = [message, ...this.state.messages];
        this.setState({ messages });
        socket.emit('message', message);
    };

    handleUserSubmit(name) {
        if (name == '') name = `Noname ${Math.floor(Math.random() * 999)}`;
        this.setState({ name });
        socket.emit('join', name);
        socket.emit('randomColor')
    };

    renderUserForm() {
        return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)} />)
    };

    renderLayout() {
        return (
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppTitle}> ChatApp </div>
                    <div className={styles.AppRoom}> App room </div>
                </div>
                <div className={styles.AppBody}>
                    <UsersList users={this.state.users} color={{ borderLeft: `3px solid ${this.state.colors}` }}/>
                    <div className={styles.MessageWrapper}>
                        <MessageList messages={this.state.messages}/>
                        <MessageForm onMessageSubmit={message => this.handleMessageSubmit(message)} name={this.state.name} />
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
    };
};
export default hot(module)(App);