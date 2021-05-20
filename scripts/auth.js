// Tracking auth state

auth.onAuthStateChanged(user=>{
  if(user){
    db.collection('Jobs').orderBy('Date').onSnapshot(snapshot=>{
      let jobs= snapshot.docChanges()
      console.log(jobs)
      jobs.forEach(job=>{
          if(job.type =='added'){
            renderjobs(job.doc)
          }
          else if(job.type == 'removed'){            
            const list= document.querySelector('.job__list')
             let mn =   list.querySelector(`[data-id = ${job.doc.id}]`)
             list.removeChild(mn)
             UI.showAlert("You successfully deleted the listing",'primary')
           }
          
      })
  })
  }
  else{
    
    UI.showAlert("Please login/signup in to your account",'primary')
  }
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


