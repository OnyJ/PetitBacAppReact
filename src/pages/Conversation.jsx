import React, { useEffect, useState } from "react";
import { ActionCable } from 'react-actioncable-provider';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

const Conversation = () => {
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  // const [message, setMessage] = useState('')
  console.log(conversations)

  useEffect(()=> {
    fetch('http://localhost:3000/conversations', {
      method: 'get', 
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(conversations => setConversations(conversations))
    
  }, [])

  const handleClick = (id) => {
    setActiveConversation(id);
  };

  const handleReceivedConversation = response => {
    const { conversation } = response;
    setConversations([...conversations, conversation]);
    console.log(conversation)
  };

  // useEffect(() => {
  //   console.log(conversations)
  //   // const conversation = conversations.find(
  //   //   conversation => conversation.id === message.conversation_id
  //   // );
  //   // conversation.messages = [...conversation.messages, message];
  //   // setConversations(conversations);

  // }, [message])


  const handleReceivedMessage = (response) => {
    const { message } = response;

     const conversation = conversations.find(
        conversation => conversation.id === activeConversation
     );
     console.log(conversation.messages)
    conversation.messages = [...conversation.messages, message];
    setConversations(conversations);
  };

  return(
    <>
    <div className="conversationsList">
        <ActionCable
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={handleReceivedConversation}
        />
        {conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={handleReceivedMessage}
          />
        ) : null}
        <h2>Conversations</h2>
        <ul>{mapConversations(conversations, handleClick)}</ul>
        <NewConversationForm />
        {activeConversation ? (
          <MessagesArea
            conversation={findActiveConversation(
              conversations,
              activeConversation
            )}
          />
        ) : null}
      </div>
    </>
  )
}

export default Conversation;

// helper

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
        {conversation.title}
      </li>
    );
  });
};