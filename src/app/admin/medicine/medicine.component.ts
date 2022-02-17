import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { medicine } from 'src/app/model/medicine';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  medicine: Array<medicine> = [];
  medicines!: MedicineComponent[] ;
  selectedMedicine! :medicine;
  action! :string
  id: number | undefined;
  medicinesRecieved: MedicineComponent[] | undefined;
  name: any;
  picByte: string;
  author: any;
  price: any;

  constructor(private httpClientService: HttpClientService,
    private activatedRoute : ActivatedRoute,
    private router :Router) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getMedicines().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
	      const id = params['id'];

        if (id) {
          this.selectedMedicine = this.medicines.find(medicine => {
            return medicine.id === +id;
          });
        }
      }
    );
  }

  handleSuccessfulResponse(response: MedicineComponent[]) {
    this.medicines = response;
    this.medicines = new Array<medicine>();
    
    this.medicinesRecieved = response;
    for (const medicine of this.medicinesRecieved) {
    
      const medicinewithRetrievedImageField = new medicine();
      medicinewithRetrievedImageField.id = medicine.id;
      medicinewithRetrievedImageField.name = medicine.name;

      medicinewithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + medicine.picByte;
      medicinewithRetrievedImageField.author = medicine.author;
      medicinewithRetrievedImageField.price = medicine.price;
      medicinewithRetrievedImageField.picByte=medicine.picByte;
      this.medicines.push(medicinewithRetrievedImageField);
    }
  }
  addMedicine() {
    this.selectedMedicine = new medicine();
    this.router.navigate(['admin', 'medicine'], { queryParams: { action: 'add' } });
  }
  viewMedicine(id: number) {
    this.router.navigate(['admin', 'medicines'], { queryParams: { id, action: 'view' } });
  }
}
