import { stringify } from '@angular/compiler/src/util';
import { Component  } from '@angular/core';
import { $ } from 'protractor';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  tasks : any =  [];
  tasksFilter : any = [];

  filterOwner : string = "";

  newTitle : string = "";
  newOwner : string = "";

  newTask : any = {};

  phrase : string = "";
  messageDelete : string = "";

  // alltasks : number = 0;
  // taskPending : number = 0;
  // taskChecked : number = 0;

  constructor( private tasksServices : HomeService ) {
    
    this.tasksServices.getAllTasks().then( e => {
      
      this.tasks = e;
      // console.log(this.tasks);

      this.tasksFilter = this.tasks;

      
    }).catch( error => {{
      
      console.log('No se ha podido cargar'); 
      console.log(error); 
    

    }});
    
    // this.updateDataTasks();

  }

  // function to post new tasks
  postTask(newTitle : string, newOwner : string) : void {

    if( this.newTitle != "" && this.newOwner != ""){
  
      this.newTask.title = newTitle;
      this.newTask.owner = newOwner;
  
      this.tasksServices.postNewTasks( this.newTask ).then( ( e : any ) => {
        
        this.tasks = e; 
  
        this.tasksFilter.push(this.tasks);

        // console.log(e);
        // console.log(this.tasks);
        // console.log(this.tasksFilter);


      });

      this.newTitle = "";
      this.newOwner = "";
      this.newTask = {};

      let message = document.querySelector('.message');
      this.phrase = "Task saved";
      message?.classList.add('show');
      setTimeout(()=>{
        message?.classList.remove('show');
      }, 2000)

    } else {

      let message = document.querySelector('.message');
      this.phrase = "You must fill all fields";
      message?.classList.add('showError');
      setTimeout(()=>{
        message?.classList.remove('showError');
      }, 2000)

    }

    // this.updateDataTasks();
    
  }
  
  // Function to mark task checked
  checkTask( id : number  ) : void {   

    this.tasksServices.patchTasks( id ).then( e => {
      
      this.tasksServices.getAllTasks().then( x => this.tasksFilter = x );
      
      console.log( 'Task ' + id + ' done');
    });

    // this.updateDataTasks();

  }

  // Function to delelte a task
  deleteAll() : void {

    this.tasksServices.deleteAllTasks().then( e => {
      
      this.tasks = []; 
      
      this.tasksFilter = this.tasks;    
      console.log( 'Delete all task ' );
    
    });

    // Show window 
    var messageDelete = document.querySelector('.messageDelete');
    messageDelete?.classList.toggle( 'showMessage' );

    // Message 
    let message = document.querySelector('.message');
    this.phrase = "All tasks deleted";
    message?.classList.add('show');
    setTimeout(()=>{
      message?.classList.remove('show');
    }, 2000)

    // this.updateDataTasks();
       
  }

  // Function to delelte a task
  deleteTask( id : number ) : void {

    console.log( 'Delete task ' + id );
    this.tasksServices.deleteTasks( id ).then( e => {

      this.tasksFilter = this.tasksFilter.filter( ( i : any) => i.id != id );

    });

    let message = document.querySelector('.message');
    this.phrase = "Task " + id + " deleted";
    message?.classList.add('show');
    setTimeout(()=>{
      message?.classList.remove('show');
    }, 2000)

    // this.updateDataTasks();

  }

  // Function to filter by Owner
  filterTask(filterOwner : string) : void {

    if( filterOwner != "" ){

      this.tasksServices.getAllTasks().then( e => this.tasksFilter = e.filter( a => a.owner == filterOwner) );
  
      this.filterOwner = "";
    } 

  }

  // Filter by checked
  filterTaskChecked(){

    this.tasksServices.getAllTasks().then( e => this.tasksFilter = e.filter( a => a.completed == true) );

  }

  // Filter by checked
  filterTaskPending(){

    this.tasksServices.getAllTasks().then( e => this.tasksFilter = e.filter( a => a.completed == false) );

  }

  // Get All tasks again
  showAllTasks(){

    this.tasksServices.getAllTasks().then( e => this.tasksFilter = e );

    // this.updateDataTasks();

  }

  // Show Message to delete all
  showMessage(){

    if( this.tasksFilter.length == 0 ){
      
      let message = document.querySelector('.message');
      this.phrase = "There are no tasks to manage";
      message?.classList.add('showError');
      setTimeout(()=>{
        message?.classList.remove('showError');
      }, 2000)

    } else {

      var messageDelete = document.querySelector('.messageDelete');
      messageDelete?.classList.toggle( 'showMessage' );
    }

    console.log(this.tasksFilter);

  }

  // Function to update data tasks
  // updateDataTasks(){

  //   // this.alltasks = 0;
  //   // this.taskChecked = 0;
  //   // this.taskPending = 0;

  //   this.tasksServices.getAllTasks().then( e => {
      
  //     let all = 0;
  //     let chk = 0;
  //     let pnd = 0;
      
  //     this.tasksFilter.forEach( ( x : any) => {
        
  //       if( this.tasksFilter.lenght > 0 ){
          
  //         all ++; 
  //         if( x.completed == true ){ chk ++; };
  //       };
  //       if( x.completed == false ){ pnd ++; };

  //     } );

  //     this.alltasks = all;
  //     this.taskChecked = chk;
  //     this.taskPending = pnd;

  //   }).then( a => this.tasksFilter = a );

  // }
  
}
