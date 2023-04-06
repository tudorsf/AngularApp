import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Project } from './project.model';



@Component({
    selector: 'suitcase-component',
    templateUrl: 'suitcase.component.html',
    styleUrls: ['./suitcase.component.css']

  })

  export class SuitcaseComponent implements OnInit {
    
    projectsArr: Project[] = [];
    project: Project = {
        id : 0,
        name: '',
        client: '',
        description: '',
        photo:"",
        hidden: false,
        photoSelected : false

    }
    isDisabled = true;
    selectedFile: any;

    constructor(){
       
    }
    ngOnInit(): void{
        const localData = localStorage.getItem('projectList');
        if(localData != null){
            this.projectsArr = JSON.parse(localData);
        }
        
    }
    
    
    @ViewChild('myInput') myInput: ElementRef | undefined;
    @ViewChild('mySelect') mySelect: ElementRef | undefined;

    

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
            photo: '',
            hidden: false,
            photoSelected: false
        }
    }

    closeModal(){
       
        const modal = document.getElementById("projectModal");

        if(modal != null){
          modal.style.display = 'none';
        }
        const localData = localStorage.getItem('projectList');
        if(localData != null){
            this.projectsArr = JSON.parse(localData);
        }
        this.project = {
            id: 0,
            name: '',
            client: '',
            description: '',
            photo: '',
            hidden: false,
            photoSelected : false

        }
        

    }

    
    saveProject(data: any){
        this.project.id = this.projectsArr.length + 1;
       
        try {
           
            this.projectsArr.push(this.project);
            if(this.selectedFile){
                this.project.photo = this.selectedFile;
                this.project.photoSelected = true;
                this.selectedFile = "";
                this.myInput!.nativeElement.value = "";


            }

            localStorage.setItem('projectList', JSON.stringify(this.projectsArr));
            

            this.closeModal();

          } catch (e) {
            if (e instanceof DOMException && e.code === DOMException.QUOTA_EXCEEDED_ERR) {
                alert('Local storage is full');
                for(let i=0;i<this.projectsArr.length;i++){
                    if(this.projectsArr[i].id == this.project.id){
                        this.projectsArr.splice(i,1);
                    }
                }
            } 
          }
        
        this.project = {
            id: 0,
            name: '',
            client: '',
            description: '',
            photo: '',
            hidden: false,
            photoSelected: false
            
        }
    }

    deleteProj(id:number){
        for(let i=0;i<this.projectsArr.length;i++){
            if(this.projectsArr[i].id == id){
                this.projectsArr.splice(i,1);
            }
        }
        localStorage.setItem('projectList', JSON.stringify(this.projectsArr));
    }

    editProj(proj:Project){
        this.addProject();
        this.project = proj;
    } 

    updateProject(){
        const newProj = this.projectsArr.find(m => m.id == this.project.id);
        newProj!.name = this.project.name;
        newProj!.description = this.project.description;
        newProj!.client = this.project.client;
        if(this.selectedFile){
            newProj!.photo = this.selectedFile;
            newProj!.photo = this.project.photo;
            this.project.photoSelected = true;
            this.myInput!.nativeElement.value = "";

        } else {
            this.myInput!.nativeElement.value = "";
            newProj!.photo = "";
            this.project.photo = newProj!.photo;
            this.project.photoSelected = false;
        }
        

        localStorage.setItem('projectList', JSON.stringify(this.projectsArr));
        this.closeModal();
     }

     hideProj(project:Project){

        this.project = project;
        this.project.hidden = true;
        localStorage.setItem('projectList', JSON.stringify(this.projectsArr));
        this.getHiddenProjects();

     }
     
    uploadPhoto(event: any){
        
        const reader = new FileReader();
        const fileSize: number = event.target.files[0].size / 1024 / 1024;
        if(event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png"){
            reader.readAsDataURL(event.target.files[0])
            reader.addEventListener("load", () => {
            this.selectedFile = reader.result;
            })
        } else if(fileSize > 1){
            event.target.value = '';
            alert('File must be less than 1mb');
        } 
         else {
            console.log(event.target.files[0].type);

            event.target.value = '';
            alert('Wrong file extension! File input is cleared.');
        }
        

    }

    viewProj(project: any){
        const modal = document.getElementById("viewModal");
        if(modal != null){
            modal.style.display = 'block';
        }
        this.project = project;
    }

    getHiddenProjects() {
        return this.projectsArr.filter(project => project.hidden);
    }
    
    showProj(event: any) {
        const selectedValue = event.target.value;
        for(let i=0;i<this.projectsArr.length;i++){
            if(this.projectsArr[i].id == selectedValue){
                this.projectsArr[i].hidden = false;
            }
        }
        localStorage.setItem('projectList', JSON.stringify(this.projectsArr));
    }
   
    closeViewModal(){
        const modal = document.getElementById("viewModal");
        if(modal != null){
            modal.style.display = 'none';
        }
    }

    
  }
  