import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './admin/users/users.component';
import { MedicineComponent } from './admin/medicine/medicine.component';

const routes: Routes = [
  {path:'admin/users',component:UsersComponent},
  {path:'admin/medicine',component:MedicineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
