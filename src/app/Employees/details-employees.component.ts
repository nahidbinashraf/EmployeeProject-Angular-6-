import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-details-employees',
  templateUrl: './details-employees.component.html',
  styleUrls: ['./details-employees.component.css']
})
export class DetailsEmployeesComponent implements OnInit {
  private emplyeeId ;
  @Input()
  employees : Employee;
  constructor( private _router : ActivatedRoute,
     private _service : EmployeeService,
     private _routerNavigate : Router) { }

  ngOnInit() {
    this.emplyeeId = this._router.paramMap.subscribe(
      params => {
        this.emplyeeId = +params.get('id');
        this._service.getEmployeeById(this.emplyeeId)
        .subscribe(
          (emp) => this.employees = emp,
        ),
        (error: any) => { console.log(error); }
      }
    ) 
  }
  getNextEmployee(){
    if (this.emplyeeId < 3) {
      this.emplyeeId = this.emplyeeId + 1;
    } else {
      this.emplyeeId = 1;
    }
      this._routerNavigate.navigate(['employee-details',this.emplyeeId])
  }
}
