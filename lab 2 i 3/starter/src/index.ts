enum FieldType {
    poleTekstowe,
    poleWielolinijkowe,
    data,
    email
}

interface Field {
    name: string;
    label: string;
    type: FieldType;
    value: string;
    render(): any;
}

class FieldLabel {
    constructor(label:string){
        return '<label>'+label+'</label>'
    }
}

class InputField implements Field {
    name= "text";
    label= "poleTekstowe";
    type= FieldType.poleTekstowe;
    value: string;
    render = function() {  
        let myContainer = '<label>'+this.label+'</label>'+' <input type="text" id="inputField">';
        return myContainer;
    }
    
}


class TextAreaField implements Field {
    name= "pwl";
    label= "poleWielolinijkowe";
    type= FieldType.poleWielolinijkowe;
    value: string;
    render = function() {  
        let myContainer = '<label>'+this.label+'</label>'+'<textarea id="pwl"></textarea>';
        return myContainer;
    }

}

class DateField implements Field {
    name = "data";
    label= "data";
    type= FieldType.data;
    value: string;
    render = function() {   
        let myContainer = '<label>'+this.label+'</label>'+'<input type="date" id="dateField" >';
        return myContainer;
    }
}

class EmailField implements Field {
    name= "email";
    label= "email";
    type= FieldType.email;
    value: string;
    render = function() {   
        let myContainer='<label>'+this.label+'</label>'+'<input type="email" id="email" >';
        return myContainer;
    }

}

class Form{

     arr =[new EmailField().render(), new DateField().render(), new TextAreaField().render(), new InputField().render()];

    getValue= function(){
        
            let inputfieldValue = (<HTMLInputElement>document.getElementById("inputField")).value;
            let textAreaValue = (<HTMLInputElement>document.getElementById("pwl")).value;
            let dateFieldValue = (<HTMLInputElement>document.getElementById("dateField")).value;
            let emailValue = (<HTMLInputElement>document.getElementById("email")).value;  
    
        
         return {
            inputfieldValue,
            textAreaValue,
            emailValue,
            dateFieldValue
         }
        
    }

    innerHTML:string = new EmailField().render()+'<br>'+new DateField().render()+'<br>'+new TextAreaField().render()+'<br>'+new InputField().render()+'<br><button id="saveLS">Zapisz formularz</button><button id="return">Wstecz</button>';
    
    render = function() {   
        
        let myContainer= document.getElementById("form_place").innerHTML= this.innerHTML;
        let saveLS = document.getElementById("saveLS")
        saveLS.addEventListener("click",() =>{
            local.saveDoc();
            window.location.href= '../src/index.html';

        } );
        let back = document.getElementById("return");
        back.addEventListener("click",()=>{
            window.history.back();
        } );
    }
}



class App{
    form = new Form();
    value:any;
    renderNewForm= function() {
         
            let form = new Form().render();
               
        
    }
    
    getValueEvent = function(){
       
        this.value = new Form().getValue();
       return this.value;
    }

   viewFormData = ()=> {
       let formData = this.getValueEvent();
       let newDiv = document.createElement('div');
       newDiv.innerHTML="<br>E-mail: "+formData.emailValue+"<br>Data: "+formData.dateFieldValue+"<br>Pole Wielolinijkowe: "+formData.textAreaValue+"<br>Pole tekstowe: "+formData.inputfieldValue;
       document.body.appendChild(newDiv);
   }

   start = function () {
    
        var newForm =  document.getElementById('newForm');
        if (typeof(newForm) != 'undefined' && newForm != null)
        {
            newForm.addEventListener("click", this.renderNewForm)
        }

        var getValueBtn =  document.getElementById('getValueBtn');
        if (typeof(getValueBtn) != 'undefined' && getValueBtn != null)
        {
            getValueBtn.addEventListener("click", this.getValueEvent)
        }

        var viewFormValue =  document.getElementById('viewFormValue');
        if (typeof(viewFormValue) != 'undefined' && getValueBtn != null)
        {
            viewFormValue.addEventListener("click", this.viewFormData)
        }

        var docList =  document.getElementById('docList');
        if (typeof(docList) != 'undefined' && docList != null)
        {
            docList.addEventListener("click", ()=>{
                doc.render();
                app.start();
            })
        }

        var back =  document.getElementById('return');
        if (typeof(back) != 'undefined' && back != null)
        {
            back.addEventListener("click", ()=>{
                window.history.back();
            })
        }
        var remove =  document.getElementsByClassName('remove');
        for(let i=0; i<remove.length; i++){
            let j:any = i;
            j=document.getElementById(remove[i].id);
            j.addEventListener("click",()=>{

                let el = document.getElementById(remove[i].id).id
                local.removeDocument(el);
                window.location.reload();
            })
            
        }

        var load =  document.getElementById('load');
        if (typeof(load) != 'undefined' && load != null)
        {
            load.addEventListener("click", ()=>{
                let df = new DateField();
                
                app.renderNewForm();
                let parm = router.getParam();
                let prams = local.loadDocument(parm);
                let email = <HTMLInputElement>document.getElementById('email');
                email.value = prams.emailValue;
                let dateField = <HTMLInputElement>document.getElementById('dateField');
                dateField.value = prams.dateFieldValue;
                let pwl = <HTMLInputElement>document.getElementById('pwl');
                pwl.value = prams.textAreaValue;
                let inputField = <HTMLInputElement>document.getElementById('inputField');
                inputField.value = prams.inputfieldValue;
            })
        }
       
   }
}



interface DataStorage{
    saveDocument(object: any): string,
    loadDocument(string: string): object,
    getDocuments(): object[]
}

class LocalStorage implements DataStorage{

    saveDocument(){
       let docID: string = Date.now().toString();
       return docID;
    }

    loadDocument(string: string){
        const getDocument = localStorage.getItem(string);
        return JSON.parse(getDocument);
           }
    getDocuments(): object[]{
        let allDoc: Object[] = Object(localStorage); 
        return allDoc;
       
    }

    saveDoc=()=>{
        let paramCheck = router.getParam();
        let id: string;
        if(paramCheck==null){
             id= this.saveDocument();
        }
        else{
            id=paramCheck;
        }
         
        let formObj = app.getValueEvent();
        localStorage.setItem(id, JSON.stringify(formObj));

    }
    getDocumentKey=()=>{
        let allDoc : string[] = Object.keys(localStorage);
        return allDoc;
    }

    removeDocument(id:string){
        localStorage.removeItem(id);
    }
   
}

class DocumentList{
    allDocTab: string[];
    getDocumentList(){
        let getID = new LocalStorage;
        this.allDocTab = getID.getDocumentKey();
    }

    render=()=>{
        this.getDocumentList();
        if(this.allDocTab.length>0){
            let lilist: string = '';
            this.allDocTab.forEach(item =>{
                lilist+='<li><a href="edit-document.html?id='+item+'">'+ item+'</a><button class="remove" style="margin-left: 15px;" id="'+item+'">Usuń</button></li>';
                
            })
    
            let htmllist = '<ul>'+lilist+'</ul>'; 
            let myContainer= document.getElementById("docList_Place").innerHTML= htmllist;
            return myContainer;
        }
        else{
            let htmllist = 'Brak zapisanych formularzy'; 
            let myContainer= document.getElementById("docList_Place").innerHTML= htmllist;
            return myContainer;
        }
        
    }
    

}

class Router{
    getParam(){
        const query: string = window.location.search.substr(1);
        const urlParams = new URLSearchParams(query);
        const getID = urlParams.get('id');
        return getID;
    }
}













let local = new LocalStorage();
let doc = new DocumentList();

let app = new App();
app.start();
let router= new Router();
