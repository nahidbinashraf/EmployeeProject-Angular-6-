import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model'
import { EmployeeService } from '../services/employee.service';
import { error } from 'util';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  constructor(private _listService: EmployeeService,
    ) { }

  ngOnInit() {
    this._listService.getEmployees()
    .subscribe((empdata) => this.employees = empdata),
    (error: any) => { console.log(error); }
     ;
  }
  onDeleteNotification(id: number) {
    const i = this.employees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.employees.splice(i, 1);
    }
  }
}
