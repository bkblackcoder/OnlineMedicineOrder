import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { medicine } from 'src/app/model/medicine';
import { HttpClientService } from '../../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-addmedicine',
  templateUrl: './addmedicine.component.html',
  styleUrls: ['./addmedicine.component.css']
})
export class AddbookComponent implements OnInit {

  @Input()
  medicine!: medicine;
  @Output()
  medicineAddedEvent = new EventEmitter();
  
  private selectedFile: | undefined;
  imgURL: any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit() {
  }

  public onFileChanged(event: { target: { files: Blob[]; }; }) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }

  saveBook() {

    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;

    this.httpClient.post('http://localhost:8080/books/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.httpClientService.addMedicine(this.medicine).subscribe(
            (book) => {
              this.medicineAddedEvent.emit();
              this.router.navigate(['admin', 'books']);
            }
          );
          console.log('Image uploaded successfully');
        } else {
          console.log('Image not uploaded successfully');
        }
      }
      );
  }
  else {
    this.httpClientService.updateBook(this.medicine).subscribe(
      (medicine) => {
        this.medicineAddedEvent.emit();
        this.router.navigate(['admin', 'medicine']);
      }
    );
  }
}
