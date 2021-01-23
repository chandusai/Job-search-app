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
        static displayjobs(){
           
            const jobs =Store.getjobs();

            jobs.forEach((job)=> UI.addJobToList(job));
        }

     static addJobToList(job){
         const list = document.querySelector('#job-list')
         const row = document.createElement('tr');
         row.innerHTML=  `
         <td> ${job.company}</td>
         <td> ${job.location}</td>
         <td> ${job.title}</td>
         <td> ${job.status}</td>
         <td> ${job.Person}</td>
         <td> ${job.Pnumber}</td>
         <td> <a href ="#" class ="btn btn-danger btn-sm delete">X </a></td>`;

         list.appendChild(row);
        
     }
static deletejob(el){
if(el.classList.contains('delete')){
    el.parentElement.parentElement.remove();
}
}

static showAlert(message,className){
    const div =document.createElement('div');
    div.className=`alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#job-form');
    container.insertBefore( div,form);
    setTimeout(()=>document.querySelector('.alert').remove(),3000);
}


     
     static clearfields(){
        document.querySelector('#title').value='';
        document.querySelector('#location').value='';
        document.querySelector('#jobtitle').value='';
       document.querySelector('#status').value='';
       document.querySelector('#Person').value='';
       document.querySelector('#Contact').value='';
       
    }
}


// Storage class : Handles storage

class Store{
 static getjobs(){
  let jobs;
  if(localStorage.getItem('jobs') === null){
      jobs=[];
  }
  else{
      jobs=JSON.parse(localStorage.getItem('jobs'));
  }
  return jobs;
}
 static addJob(job){
  const jobs = Store.getjobs();
  jobs.push(job);
  localStorage.setItem('jobs',JSON.stringify(jobs));
}
 static removejob(Pnumber){
 const jobs = Store.getjobs();
 jobs.forEach((job,index)=>{
   if(job.Pnumber===Pnumber){
       jobs.splice(index,4);
   }

 })
 localStorage.setItem( 'jobs',JSON.stringify(jobs));
}

}




// Events : Display jobs
document.addEventListener('DOMContentLoaded',UI.displayjobs);
document.querySelector('#job-form').addEventListener('submit', (e)=>{
    e.preventDefault();


 const Company = document.querySelector('#title').value;
 const location = document.querySelector('#location').value;
 const jobtitle = document.querySelector('#jobtitle').value;
 const status = document.querySelector('#status').value;
 const Person = document.querySelector('#Person').value;
 const Pnumber = document.querySelector('#Contact').value;

// validate 
if(Company === '' || location === '' || jobtitle === '' || status === '' || Person === ''){
    UI.showAlert ('Please fill all the fields','danger');
}
else {
    const job = new Job(Company,location,jobtitle,status,Person,Pnumber);
    UI.addJobToList(job);
    
    Store.addJob(job);  
   
UI.showAlert('You filled the form successfully','success')
    // clear fields
    UI.clearfields();  
      
}

})
// Event : Add a job, Delete a job
document.querySelector('#job-list').addEventListener('click',(e)=>{
    UI.deletejob(e.target)

    Store.removejob(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('you deleted the list successfully', 'success')
})