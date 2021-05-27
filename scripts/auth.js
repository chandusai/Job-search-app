// Tracking auth state

auth.onAuthStateChanged(user=>{
  db.collection('Jobs').orderBy('Date').onSnapshot(snapshot=>{
    let jobs= snapshot.docChanges()
    console.log(jobs)
    if(user){
      setUI(user)
    jobs.forEach(job=>{
        if(job.type =='added'){
          renderjobs(job.doc)
          }
        else if(job.type == 'removed'){            
          const list= document.querySelector('#job-list')
           let mn =   list.querySelector(`[data-id = ${job.doc.id}]`)
           list.removeChild(mn)
           UI.showAlert("You successfully deleted the listing",'primary')
         }
      })
   } 
 else{
  setUI()
    // let ch = document.querySelector("#job-list")
    // ch.style.display = "none"
   const div = document.createElement('div')
   div.className = 'alert alert-success'
   const h4 = document.createElement('h4')
    h4.innerHTML = "Please login in to your account to see the job-listings"
   div.appendChild(h4)
  
 }
})
 
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
    console.log("user sign out")
  })

    // login the user

    const login = document.querySelector('#login-form')
    login.addEventListener('submit',(e)=>{
      e.preventDefault()
      const loginemail = login['login-email'].value
      const loginpassword = login['login-password'].value
      
      auth.signInWithEmailAndPassword(loginemail,loginpassword).then(cred=>{
        console.log(cred.user)
        login.reset()
         const close__button = document.querySelector('.logs')
         close__button.setAttribute('data-bs-dismiss','modal')
      })
    })


