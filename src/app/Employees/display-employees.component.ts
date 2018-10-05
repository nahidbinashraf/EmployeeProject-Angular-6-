import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router'
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-display-employees',
  templateUrl: './display-employees.component.html',
  styleUrls: ['./display-employees.component.css']
})
export class DisplayEmployeesComponent implements OnInit {
  isHidden = true;

  constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _service: EmployeeService) { }

  ngOnInit() {

  }
  @Input()
  employee: Employee
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();


  viewEmployee() {
    this._router.navigate(['employee-details', this.employee.id])
  }
  editEmployee() {
    this._router.navigate(['edit', this.employee.id])
  }
  deleteEmployees(id : number) : void {
    this._service.deleteEmployee(this.employee.id).subscribe(
      () =>{
        alert("deleted");
        this.notifyDelete.emit(this.employee.id);
        console.log(`Employee with ID = ${this.employee.id} Deleted`)     
      } ,
      (err) => console.log(err)
      
    );
  }
}
