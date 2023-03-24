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
        photo:"",
        hidden: false,
        photoSelected : false

    }

    isDisabled = true;
    emailError = false;
  
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
            hidden: false

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
            photo: '',
            hidden: false

        }

    }

    saveProject(data: any){
        this.project.id = this.projectsArr.length + 1;
       
        try {
            this.projectsArr.push(this.project);

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
        //localStorage.setItem('projectList', JSON.stringify(this.projectsArr));
        this.project = {
            id: 0,
            name: '',
            client: '',
            description: '',
            photo: '',
            hidden: false
            
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

        this.project = project;
        this.project.hidden = true;
        localStorage.setItem('projectList', JSON.stringify(this.projectsArr));
        this.getHiddenProjects();

     }
     update(event: any){
        console.log(event)     
    }

    uploadPhoto(event: any){
        
        const reader = new FileReader();
        const fileSize: number = event.target.files[0].size / 1024 / 1024;
        if(event.target.files[0].type == "image/jpeg"){
            reader.readAsDataURL(event.target.files[0])
            reader.addEventListener("load", () => {
            this.project.photo = reader.result;
            this.project.photoSelected = true;
            })
        } else if(fileSize > 1){
            event.target.value = '';
            alert('File must be less than 1mb');
        }
         else {
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
  