public with sharing class EmployeePuneLWC {
    public EmployeePuneLWC() {

    }

@AuraEnabled(cacheable=true)
public static List<EmployeePune__c> getAllEmployees(){
    List<EmployeePune__c> myList = [SELECT Employee_Salary__c,
    Empoyee_ID__c,Name FROM EmployeePune__c];
    return myList;
}

@AuraEnabled
public static void addEmployee(String eid,String ename,Decimal esal){
    EmployeePune__c emp = new EmployeePune__c(Empoyee_ID__c=eid,Name=ename,Employee_Salary__c=esal);
    insert emp;
}

@AuraEnabled
public static void delEmployee(String delid){
    EmployeePune__c emp = [SELECT Employee_Salary__c,
    Empoyee_ID__c,Name FROM EmployeePune__c WHERE Id = :delid];
    delete emp;
}

@AuraEnabled
public static void updEmployee(String eid,String ename,Decimal esal,String uid){
    EmployeePune__c emp = [SELECT Employee_Salary__c,Empoyee_ID__c,Name FROM EmployeePune__c WHERE Id = :uid];
    emp.Empoyee_ID__c = eid;
    emp.Name = ename;
    emp.Employee_Salary__c = esal;
    update emp;
}

}
