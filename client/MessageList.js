import React from 'react';

import styles from './MessageList.css';

const Message = props => (
    <div className={styles.MessageContainer}>
        <span className={styles.From} style={props.color}>{props.from} :</span>
        <span className={styles.Message}> {props.text}</span>
    </div>
);

const MessageList = props => (
    <div className={styles.MessageList}>
        {
            props.messages.map((message, i) => {
                return (
                    <Message key={i} from={message.from} text={message.text} color={{backgroundColor: `${message.color}`}} />
                )
            })
        }
    </div>
);

export default MessageList;