import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'suitcase-component',
    templateUrl: 'suitcase.component.html',
    styleUrls: ['./suitcase.component.css']

  })

  export class SuitcaseComponent implements OnInit {
    projectsArr: any[] = [];
    project: any = {
        id : 0,
        name: '',
        client: '',
        description: '',
        photo:""
    }

    isDisabled = true;
    hiddenProjectsArr: any[] = [];
    hiddenProject: any = {
        id : 0,
        name: '',
        client: '',
        description: ''
    }
    

    constructor(){
       
    }
    ngOnInit(): void{
        const localData = localStorage.getItem('projectList');
        if(localData != null){
            this.projectsArr = JSON.parse(localData);
        }
    }
    
    
    @ViewChild('myInput') myInput: ElementRef | undefined;

    addProject(){
        const modal = document.getElementById("projectModal");
        if(modal != null){
            modal.style.display = 'block';
        }
        if(this.project.id == 0){
            this.myInput!.nativeElement.value = "";

        }
        

        this.project = {
            id: 0,
            name: '',
            client: '',
            description: '',
            photo: ''
        }
        
        


    }

    closeModal(){
        const modal = document.getElementById("projectModal");
        if(modal != null){
          modal.style.display = 'none';
        }
        this.project = {
            id: 0,
            name: '',
            client: '',
            description: '',
            photo: ''
        }

    }

    saveProject(data: any){
        this.project.id = this.projectsArr.length + 1;
        this.projectsArr.push(this.project);
        this.closeModal();
        localStorage.setItem('projectList', JSON.stringify(this.projectsArr));
        this.project = {
            id: 0,
            name: '',
            client: '',
            description: '',
            photo: ''
            
        }
    }
    deleteProj(id:any){
        for(let i=0;i<this.projectsArr.length;i++){
            if(this.projectsArr[i].id == id){
                this.projectsArr.splice(i,1);
            }
        }
        localStorage.setItem('projectList', JSON.stringify(this.projectsArr));
    }

    editProj(proj:any){
        this.addProject();
        
        this.project = proj;
        
        
     } 
     updateProject(){
        const newProj = this.projectsArr.find(m => m.id == this.project.id);
        newProj.name = this.project.name;
        newProj.description = this.project.description;
        newProj.client = this.project.client;
        localStorage.setItem('projectList', JSON.stringify(this.projectsArr));
        this.closeModal();
     }
     hideProj(project:any){

        this.hiddenProject = project;
        this.hiddenProjectsArr.push(this.hiddenProject);
        
        console.log(this.hiddenProjectsArr);
        this.deleteProj(this.hiddenProject.id)
     }
     update(event: any){
        console.log(event)     
    }

    uploadPhoto(event: any){
        console.log(event.target.files[0]);  
        const reader = new FileReader();
        if(event.target.files[0].type == "image/jpeg"){
            reader.readAsDataURL(event.target.files[0])
            reader.addEventListener("load", () => {
            this.project.photo = reader.result;
            
            })
        } else {
            event.target.value = '';
            alert('Wrong file extension! File input is cleared.');
        }
        

    }
    viewProj(){
        console.log("test");
    }
  }
  