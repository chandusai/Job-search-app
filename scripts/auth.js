// Tracking auth state
const account = document.querySelector('#account')


auth.onAuthStateChanged(user=>{
  db.collection('Jobs').orderBy('Date').onSnapshot(snapshot=>{
    let jobs= snapshot.docChanges()
    console.log(jobs)
    if(user){
     setUI(user)
     account.addEventListener('click',(e)=>{
      e.preventDefault()
           
  })
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


    let ch = document.querySelector("#job-list")
    ch.style.display = "none"
   
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
  // console.log(cred)
  return db.collection('users').doc(cred.user.uid).set({
     name: signup['name'].value,
     hometown : signup['hometown'].value
  })
   }).then(()=>{
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


