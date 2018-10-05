import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { BsDatepickerModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './Employees/list-employees.component';
import { CreateEmployessComponent } from './Employees/create-employess.component';
import { customCompareValidatorDirective } from './Shared/custom-Compare-Validator.directive'
import { EmployeeService } from './services/employee.service';
import { DetailsEmployeesComponent } from './Employees/details-employees.component';
import { DisplayEmployeesComponent } from './Employees/display-employees.component';
import { PageNotFoundComponent } from './page-not-found.component'

const appRoutes: Routes = [
  { path: 'list', component: ListEmployeesComponent },
  { path: 'edit/:id', component: CreateEmployessComponent },
  { path: 'employee-details/:id', component: DetailsEmployeesComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployessComponent,
    customCompareValidatorDirective,
    DetailsEmployeesComponent,
    DisplayEmployeesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BsDatepickerModule.forRoot(),
    FormsModule,
    HttpClientModule

  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
