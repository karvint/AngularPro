import {Role} from "./Role";

export class User{
  userName:string;
  password:string;
  id:string;
  token:string;
  role:Role;
  constructor(){
    this.role = new Role();
  }
}
