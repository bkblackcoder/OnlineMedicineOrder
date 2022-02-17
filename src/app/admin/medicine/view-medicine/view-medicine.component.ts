import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { medicine } from 'src/app/model/medicine';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-view-medicine',
  templateUrl: './view-medicine.component.html',
  styleUrls: ['./view-medicine.component.css']
})
export class ViewMedicineComponent implements OnInit {

  @Input()
  medicine!: medicine;

  @Output()
  medicineDeletedEvent = new EventEmitter();

  constructor(private httpClientService :HttpClientService,
    private router :Router) { }

  ngOnInit(): void {
    deleteMedicine() {
      this.httpClientService.deleteMedicine(this.medicine.id).subscribe(
        (book) => {
          this.medicineDeletedEvent.emit();
          this.router.navigate(['admin', 'medicine']);
        }
      );
    }
  }
  editMedicine() {
    this.router.navigate(['admin', 'medicine'], { queryParams: { action: 'edit', id: this.medicine.id } });
  }
}
