import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { medicine } from '../model/medicine';
import { MedicineComponent } from '../admin/medicine/medicine.component';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient:HttpClient
  ) { 
     }

     getUsers()
  {
    console.log('Getting all users');
    return this.httpClient.get<User[]>('http://localhost:8090/users/get');
  }

  addUser(newUser: User) {
    return this.httpClient.post<User>('http://localhost:8090/users/add', newUser);   
  }
  deleteUser(id: string) {
    return this.httpClient.delete<User>('http://localhost:8090/users/' + id);
  }
  getMedicines() {
    return this.httpClient.get<MedicineComponent[]>('http://localhost:8090/books/get');
  }
  addMedicine(newMedicine: medicine) {
    return this.httpClient.post<medicine>('http://localhost:8090/books/add', newMedicine);
  }
  deleteMedicine(id: string) {
    return this.httpClient.delete<medicine>('http://localhost:8090/books/' + id);
  }
  updateMedicine(updatedMedicine: medicine) {
    return this.httpClient.put<medicine>('http://localhost:8090/books/update', updatedMedicine);
  }
}


