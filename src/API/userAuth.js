export const UserRegister = (email, password, password_confirmation, username) => {
    console.log(process.env.REACT_APP_BASE_URL);
    const api_url = process.env.REACT_APP_BASE_URL
    const data = {
        user: {
            email: email, 
            password: password,
            password_confirmation: password_confirmation, 
            username: username
        }
    }

    fetch(`${api_url}signup`, {
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
    const api_url = process.env.REACT_APP_BASE_URL  
    const data2 = {
        user: {
            email: "lalala13@lalala.com",
            password: "lalala"
        }
    }

    fetch(`${api_url}login`, {
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