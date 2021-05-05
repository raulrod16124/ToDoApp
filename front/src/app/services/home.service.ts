import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  getAllTasks() : Promise<task[]> {

    return axios.get( 'http://localhost:5000/tasks' )
                .then( rest => rest.data )
                // Map data
                .then( tasksBeforeClean => tasksBeforeClean.map( ( m : any  ) => {


                  return {

                    id : m.id,
                    title : m.title,
                    owner : m.owner,
                    completed : m.completed

                  }

                } ));

  }

  postNewTasks( e : any ){

    return axios.post( 'http://localhost:5000/tasks', {

      title: e.title,
      owner: e.owner

    } ).then( rest => rest.data );

  }

  patchTasks( e : number ){

    return axios.patch( 'http://localhost:5000/tasks/'+ e , {

      completed: true

    } ).then( rest => rest.data, (error) => console.log(error) );

  }

  deleteAllTasks(){

    return axios.delete( 'http://localhost:5000/tasks', {} ).then( rest => rest.data );

  }

  deleteTasks( e : number ){

    return axios.delete( 'http://localhost:5000/tasks/'+ e ).then( rest => rest.data, (error) => console.log(error) );

  }


}

export interface task{

  id : string,
  title : string,
  owner : string,
  completed : boolean

}
