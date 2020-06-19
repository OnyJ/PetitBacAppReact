import React, {useState, useEffect} from 'react';

const NewMessageForm = ({conversation_id}) => {

  const [text, setText] = useState('');
  const id = conversation_id

  // useEffect(() => {
  //   setConversation_id()
  // })
  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    const data = {
      message: {
        text: text, 
        conversation_id: id
      }
    }
    e.preventDefault()
    fetch('http://localhost:3000/messages', {
      method: 'post', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  
  }
  return(
    <>
    <div className="newMessageForm">
        <form onSubmit={handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={text}
            onChange={handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    </>
  )
}
export default NewMessageForm;