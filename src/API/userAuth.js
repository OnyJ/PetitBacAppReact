export const UserRegister = () => {
    console.log(process.env.REACT_APP_BASE_URL);
    const api_url = process.env.REACT_APP_BASE_URL
    const data = {
        user: {
            email: "lalala10@lalala.com", 
            password: "lalala", 
            password_confirmation: "lalala", 
            username: 'lalala10'
        }
    }

    fetch('http://localhost:3000/signup', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error))
  
     
} 

export const UserLogin = () => {     
    const data2 = {
        user: {
            email: "lalala10@lalala.com",
            password: "lalala"
        }
    }

    fetch('http://localhost:3000/login', {
            method: 'post',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data2)
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error))
    
} 

export const Zeubi = () => {
    console.log('lalala')
}