const logoutlinks =  document.querySelectorAll('.logout')
console.log(logoutlinks)
const loginlinks = document.querySelectorAll('.login')
console.log(loginlinks)
 


// conditional links 

const setUI = (user)=>{
 if(user){
     loginlinks.forEach(element=>{element.style.display = 'block'})
     logoutlinks.forEach(element=>{element.style.display = 'none'})
     const modal__body = document.querySelector('.modal-body__account')
     db.collection('users').doc(user.uid).get().then(doc =>{
        modal__body.innerHTML = `
         User email : <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="${user.email}">
         User Name: <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="${doc.data().name}">
        User Hometown:  <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="${doc.data().hometown}">
        `                       
     })
   
 }
 else{
    loginlinks.forEach(element=>{element.style.display = 'none'})
    logoutlinks.forEach(element=>{element.style.display = 'block'}) 
 }
}
// job class
class Job{
    constructor(company,location,title,status,Person,Pnumber){
        this.company = company,
        this.location =location,
        this.title=title,
        this.status =status,
        this.Person =Person,
        this.Pnumber=Pnumber
    }
}


// UI class: Handle UI class
class UI{
      
static showAlert(message,className){
    const div =document.createElement('div');
    div.className=`alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#job-form');
    container.insertBefore( div,form);
    setTimeout(()=>document.querySelector('.alert').remove(),4000);
}


     
     static clearfields(){
        document.querySelector('#title').value='';
        document.querySelector('#location').value='';
        document.querySelector('#jobtitle').value='';
       document.querySelector('#status').value='';
       document.querySelector('#Person').value='';
       document.querySelector('#Contact').value='';
       
    }

    static clear__class(){
     let clear=   document.querySelectorAll('form,.form-group,.form-control')
     clear.forEach((element)=>{
         if(element.classList.contains("is-valid")){
             element.classList.remove("is-valid")
         }
     })
      

    }
  
}

// Events : Display jobs
// document.addEventListener('DOMContentLoaded',UI.displayjobs);
document.querySelector('#job-form').addEventListener('submit', (e)=>{
    e.preventDefault();
 const Company = document.querySelector('#title').value;
 const location = document.querySelector('#location').value;
 const jobtitle = document.querySelector('#jobtitle').value;
 const status = document.querySelector('#status').value;
 const date = document.querySelector('#date').value;
 const Person = document.querySelector('#Person').value;
 const Pnumber = document.querySelector('#Contact').value;

 if(Company === '' || location === '' || jobtitle === '' ||date === '' || status === '' || Person === ''){
    UI.showAlert ('Please fill all the fields','danger');
}
else{
   
    // clear fields
    UI.clearfields(); 
    UI.clear__class();
    UI.showAlert('You filled the form successfully','success')
    
 db.collection('Jobs').add({
     Company:Company,
     Location:location,
     Role:jobtitle,
     Date:date,
     Status:status,
     Contactperson:Person,
     Contact:Pnumber

     
 })

  }
  

})


// Regex patterns


// Validation for fields 
const fields = document.querySelectorAll('input')


// Regex patterns

const patterns = {
    Name:/^[a-zA-Z\- ]+$/,
    Location: /^[a-zA-Z\- ]+$/,
    Title:/^[a-zA-Z\- ]+$/,
    status:/^[a-zA-Z]+$/,
    Person:/^[a-zA-Z\- ]+$/,
    Phonenumber: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/

}

 let Validation=(field,regex)=>{
     
if(regex.test(field.value)) {
     field.classList.add('is-valid')
     field.classList.remove('is-invalid')
    
} 
else{
     field.classList.add('is-invalid')
     field.classList.remove('is-valid')
     
} 
}

fields.forEach((input)=>{
 input.addEventListener('blur',(e)=>{
     Validation(e.target,patterns[e.target.attributes.name.value])
 })
})


// firebase


// firebase data to show in UI 

let renderjobs = (jobs)=>{
    
     console.log(jobs.data())
    
    const list = document.querySelector('#job-list')
    const row = document.createElement('tr');
    row.setAttribute('data-id',jobs.id)
    row.innerHTML=  `
    <td> ${jobs.data().Company}</td>
    <td> ${jobs.data().Location}</td>
    <td> ${jobs.data().Role}</td>
    <td> ${jobs.data().Status}</td>
    <td> ${jobs.data().Date}</td>
    <td> ${jobs.data().Contactperson}</td>
    <td> ${jobs.data().Contact}</td>
    <td> <a href ="#"  id = "job-button" class ="btn btn-danger btn-sm job__button" >X </a></td>`;
    list.appendChild(row);
    row.setAttribute('data-id',jobs.id)
    
    // document.querySelector('#job-button').addEventListener('click',(e)=>{
    //     let id =e.target.parentElement.parentElement.getAttribute('data-id')
    //     console.log(id)
    //     db.collection('Jobs').doc(id).delete()           
    // })
    document.querySelectorAll('.job__button').forEach((li) => {
        li.addEventListener('click', (e) => {
            let id =e.target.parentElement.parentElement.getAttribute('data-id')
                console.log(id)
                db.collection('Jobs').doc(id).delete() 
        });
    })
}

// Account popup

// const account = document.querySelector('#account')
//   account.addEventListener('click',(e)=>{
//     e.preventDefault()
    
//    const modal__body = document.querySelector('modal-body__account')
//    modal__body.innerHTML = `
//    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="${user.email}">
   
//    `                          
     
// })

 

// db.collection('Jobs').get().then(snapshots=>{
//     snapshots.docs.forEach((jobs)=>{
//       renderjobs(jobs)
//     })
// })
// db.collection('Jobs').orderBy('Date').onSnapshot(snapshot=>{
//     let jobs= snapshot.docChanges()
//     console.log(jobs)
//     jobs.forEach(job=>{
//         if(job.type =='added'){
//           renderjobs(job.doc)
//         }
//         else if(job.type == 'removed'){            
//           const list= document.querySelector('#job-list')
//            let mn =   list.querySelector(`[data-id = ${job.doc.id}]`)
//            list.removeChild(mn)
//            UI.showAlert("You successfully deleted the listing",'primary')
//          }
        
//     })
// })