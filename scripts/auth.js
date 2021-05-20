// Tracking auth state

auth.onAuthStateChanged(user=>{
  
 
})


const signup = document.querySelector('#signup-form')
signup.addEventListener('submit',(e)=>{
    e.preventDefault()
    // getting users data 
    
    const email = signup['email'].value
    const password = signup['password'].value
    

// creating the user

auth.createUserWithEmailAndPassword(email,password).then(cred=>{
  console.log(cred)
  signup.reset()
   const close__button = document.querySelector('#sub')
   close__button.setAttribute('data-bs-dismiss','modal')
   
  })
})

// signing out the user

const logout = document.querySelector('#logout')
logout.addEventListener('click',(e)=>{
    e.preventDefault()
    auth.signOut()
  })

    // login the user

    const login = document.querySelector('#login-form')
    login.addEventListener('submit',(e)=>{
      e.preventDefault()
      const loginemail = login['login-email'].value
      const loginpassword = login['login-password'].value
      
      auth.signInWithEmailAndPassword(loginemail,loginpassword).then(cred=>{
        // console.log(cred.user)
        login.reset()
         const close__button = document.querySelector('.logs')
         close__button.setAttribute('data-bs-dismiss','modal')
      })
    })


