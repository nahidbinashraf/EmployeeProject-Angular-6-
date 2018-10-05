import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";

import { Observable, of,throwError} from 'rxjs';
import{  map, delay,catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { pipe } from "@angular/core/src/render3/pipe";


@Injectable()
export class EmployeeService {
    constructor(private _http : HttpClient){

    }
    baseUrl = 'http://localhost:3000/employees';
    getEmployees() : Observable<Employee[]> {

       return this._http.get<Employee[]>(this.baseUrl)
        .pipe(
            catchError(this.handleError)
        )
       ;
    }
    private handleError(errorResponse : HttpErrorResponse){
        if(errorResponse.error instanceof ErrorEvent){
            console.log("Client Side error", errorResponse.error.message);
        }
        else{
            console.log("Server side error", errorResponse.error);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }
    getEmployeeById(EmployeeId: number): Observable<Employee> {
        return this._http.get<Employee>(`${this.baseUrl}/${EmployeeId}`)
        .pipe(
            catchError(this.handleError)
        );
    }
    saveEmployees(employee: Employee) : Observable<Employee> {
            return this._http.post<Employee>(this.baseUrl,
            employee
            ) 
            . pipe(
                catchError(this.handleError)
            );    
        }   
    updateEmployees(employee: Employee) : Observable<void> {
            return this._http.put<void>(`${this.baseUrl}/${employee.id}`,
            employee
            ) 
            . pipe(
                catchError(this.handleError)
            );    
        }   
    deleteEmployee(id : number) : Observable<void>{   
            return this._http.delete<void>(`${this.baseUrl}/${id}`) 
            . pipe(
                catchError(this.handleError)
            );         
    }
}