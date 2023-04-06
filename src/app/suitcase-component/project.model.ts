export class Project{
    public id: number;
    public name: string;
    public client: string;
    public description: string;
    public photo: string;
    public hidden: boolean;
    public photoSelected: boolean;
    constructor(id:number, name:string, client:string, description:string, photo:string, hidden:boolean,photoSelected:boolean){
        this.id = id;
        this.name = name;
        this.client = client;
        this.description = description;
        this.photo = photo;
        this.hidden = hidden;
        this.photoSelected = photoSelected;
    }
}

