import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Departments } from '../models/departments.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';
import{ EmployeeService} from '../services/employee.service'
import{Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-create-employess',
  templateUrl: './create-employess.component.html',
  styleUrls: ['./create-employess.component.css']
})
export class CreateEmployessComponent implements OnInit {
  privewPath = false;
  departments: Departments[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ]
  employee: Employee= 
    {
      id: null,
      name: null,
      gender: null,
      contactPreference: null,
      phoneNumber: null,
      email: null,
      dateOfBirth: null,
      department: null,
      isActive: null,
      photoPath: null
    }
  
  datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(private _saveEmployeeService : EmployeeService, private _routerNaigate : Router, private _router : ActivatedRoute) {

    // create new object on each property change
    // so Angular can catch object reference change
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue'
    })

  }

  ngOnInit() {
    this._router.paramMap.subscribe(parameterMap => {
      const Eid = +parameterMap.get('id');
      this.getEmployee(Eid);
    });
  }
  private getEmployee(id: number) {
    if(id == 0){
      this. employee = 
      {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: null,
        dateOfBirth: null,
        department: null,
        isActive: null,
        photoPath: null
      }
    }
    else{
      this._saveEmployeeService.getEmployeeById(id)
      .subscribe(
        (emp) => this.employee = emp
      ),
      (error: any) => { console.log(error); }
    }
  }

  saveEmployee(employeeForm : NgForm): void  {
    if(this.employee.id == null)
    {  
        this._saveEmployeeService.saveEmployees(this.employee)
      .subscribe((data : Employee) => {
        console.log("succcess");
        this._routerNaigate.navigate(['list']);
      },
      (error: any) => { console.log(error); }

      )
    }
    else{
      this._saveEmployeeService.updateEmployees(this.employee)
      .subscribe(  ()=>{
        console.log("succcess");
        this._routerNaigate.navigate(['list']);
      },
      (error: any) => { console.log(error); }

      )
    }

    }

  photoToggle() {
    this.privewPath = !this.privewPath;
  }
}
