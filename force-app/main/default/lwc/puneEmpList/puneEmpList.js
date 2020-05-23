import { LightningElement, wire ,track} from 'lwc';
import getData from '@salesforce/apex/EmployeePuneLWC.getAllEmployees'
import saveData from '@salesforce/apex/EmployeePuneLWC.addEmployee';
import delData from '@salesforce/apex/EmployeePuneLWC.delEmployee';
import updData from '@salesforce/apex/EmployeePuneLWC.updEmployee';

export default class PuneEmpList extends LightningElement {

    showUpd=false;
    updateIndex;
    updId;
    updName;
    updSal;
    empName;
    empId;
    empSal;
    @track employees = [];

    @wire (getData)
    getApexData({error, data}){

        if(data){ 
            console.log(data);
            this.employees = data;
            //alert(this.employees[0].Employee_Salary__c); 
        }
        if(error){ console.log('Error in fetching data '+error);}
    }

    addEmployee(){
        saveData({eid:this.empId,ename:this.empName,esal:this.empSal});
        location.reload();
        //alert(this.empId+' '+this.empName+' '+this.empSal);
        //this.employees.push({"Empoyee_ID__c":this.empId,"Name":this.empName,"Employee_Salary__c":this.empSal});          
    }

    delEmp(event){

        var ind = event.target.value;
        var id = this.employees[ind].Id;
        
        delData({delid:id});
        location.reload();
    }

    updEmp(event){
            this.showUpd = true;
            var ind = event.target.value;
            //alert('Index '+ind);
            this.updateIndex = ind;
            this.updId = this.employees[ind].Empoyee_ID__c;
            this.updName = this.employees[ind].Name;
            this.updSal = this.employees[ind].Employee_Salary__c;
            console.log('After update ');
    }
    updEmployee(){
        //alert('hi');
        this.showUpd = false;
        updData({eid:this.updId,ename:this.updName,esal:this.updSal,uid:this.employees[this.updateIndex].Id});
        // this.employees[this.updateIndex].Empoyee_ID__c = this.updId;
        // this.employees[this.updateIndex].Name = this.updName;
        // this.employees[this.updateIndex].Employee_Salary__c = this.updSal;
        //console.log(this.employees[this.updateIndex].Empoyee_ID__c+' '+ this.employees[this.updateIndex].Name);
        //alert(this.employees[this.updateIndex].Id);
        location.reload();
    }

    closeUpd(){
        this.showUpd = false;
    }

    idChanged(event) {  
        //alert('working');
        this.empId = event.target.value;
    }
    nameChanged(event) {  
        this.empName = event.target.value;
    }
    salChanged(event) {  
        this.empSal = event.target.value;
    }
    updIdChanged(event) {  
        //console.log('updid');
        this.updId = event.target.value;
    }
    updNameChanged(event) {  
        //console.log('updname');
        this.updName = event.target.value;
    }
    updSalChanged(event) {  
        console.log('updsal '+this.updSal);
        this.updSal = event.target.value;
    }

}