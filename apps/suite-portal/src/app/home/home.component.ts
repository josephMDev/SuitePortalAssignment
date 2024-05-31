import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../services/resident.services';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  serviceTypes = ALL_SERVICE_TYPES;

  public maintRequestForm: FormGroup;

  constructor(private formBuilder : FormBuilder, private userServices: UserServices) {
  }

  ngOnInit(): void {
    this.maintRequestForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      unitNumber: ['', Validators.required],
      serviceType: ['', Validators.required],
      summary: ['', Validators.required],
      details: [''],
    });
  }
  
  public submitRequest(): void{
    if(this.maintRequestForm.invalid){
      alert("invalid form, all fields except for details are required");
      return;
    }

    //this.userServices.postMaintRequest(this.maintRequestForm.value);
    this.userServices.postMaintRequest(this.maintRequestForm.value).subscribe(
      (id) => {
        // set id of the request
        this.maintRequestForm.value.id = id;
        alert("Request Submitted: " + id);
        this.maintRequestForm.reset();
      },
      error => {
        console.error("Error submitting maintenance request", error);
      }
    );
  }
}
