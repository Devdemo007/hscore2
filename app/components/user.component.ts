import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
@Component({
  selector: 'user',
  template: `
  <h1>{{name}}</h1>
  <p><strong>Email:</strong> {{email}}</p>
  <p><strong>Address:</strong> {{address.street}}, {{address.city}}, {{address.state}}</p>
 <button (click)="toggleHobbies()">{{showhobbies? "Hide Hobbies" : "Show Hobbies"}}</button>
  <div *ngIf="showhobbies">
    <h3>Hobbies</h3>
    <ul>
        <li *ngFor="let hobby of hobbies; let i = index">
        {{hobby}} <button (click)="deleteHobby(i)">x</button>
        </li>
    </ul>
    <form (submit)="addHobby(hobby.value)">
        <label>Add Hobby: </label><br />
        <input type="text" #hobby /><br/>
    </form>
  </div>
  <form>
  <label>Name: </label><br />
  <input type="text" name="name" [(ngModel)]="name"/><br/>
  <label>Email: </label><br />
  <input type="text" name="email" [(ngModel)]="email"/><br>
  <label>Street: </label><br />
  <input type="text" name="address.street" [(ngModel)]="address.street"/><br/>
  <label>City: </label><br />
  <input type="text" name="address.city" [(ngModel)]="address.city"/><br/>
  <label>State: </label><br />
  <input type="text" name="address.state" [(ngModel)]="address.state"/><br/>
  </form>
  <div *ngFor="let post of posts">
    <h3>{{post.title}}</h3>
    <p>{{post.body}}</p>
  </div>
  `,
  providers:[PostsService]

})
export class UserComponent  { 
  name: string;
  email:string;
  address:address;
  hobbies:string[];
  showhobbies:boolean;
  posts:Post[];

  constructor(private postsService:PostsService){
        this.name = 'Heman';
        this.email = 'heman@gmail.com';
        this.address = {
             street: '360 Collins Steet',
             city: 'Melbourne',
             state:'VIC Australia'
        }
        this.hobbies =['Music','Movies','Sports'];
        this.showhobbies=false;
        this.postsService.getPosts().subscribe(posts =>{console.log(posts);this.posts=posts});
  }

   toggleHobbies(){
        if(this.showhobbies == true){
            this.showhobbies = false;
        }else{
            this.showhobbies = true;
        }
   }

   addHobby(hobby:string){
       console.log(hobby);
       this.hobbies.push(hobby);
   }

   deleteHobby(i:number){
       this.hobbies.splice(i,1);
   }

 }

 interface address {
        street: string;
        city: string;
        state:string;
 }

 interface Post{
     id:number;
     title:string;
     body:string;
 }
