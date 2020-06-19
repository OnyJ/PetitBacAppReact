import React, {useState} from 'react';

const NewConversationForm = () => {

  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    setTitle(e.target.value)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      conversation: {
        title: title
      }
    }

    fetch('http://localhost:3000/conversations', {
      method: 'post', 
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    body: JSON.stringify(data),

  })
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(error => console.log(error))
  console.log(title)
  
}

  return(
    <>
    <div className="newConversationForm">
        <form onSubmit={handleSubmit}>
          <label>New Conversation:</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    </>
  )
}

export default NewConversationForm;