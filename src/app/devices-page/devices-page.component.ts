import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-devices-page',
  templateUrl: './devices-page.component.html',
  styleUrls: ['./devices-page.component.scss']
})
export class DevicesPageComponent implements OnInit {
  deviceData: any = []
  deviceAddForm!: UntypedFormGroup
  deviceEditForm!: UntypedFormGroup
  deviceFilterForm!: UntypedFormGroup
  page: any
  search: any
  addTable = false
  editTable = false
  tableId: any
  isLoading = false
  permitActions = true

  constructor(private request: RequestsService) {}

  ngOnInit() {
    if(localStorage.getItem('isDark')) {
      document.body.classList.remove('dark-theme')
    } else if(!localStorage.getItem('isDark')) {
      document.body.classList.toggle('dark-theme')
    }
    
    this.deviceFilterForm = new UntypedFormGroup({
      id: new UntypedFormControl('', Validators.required),
      name: new UntypedFormControl('', Validators.required),
    })

    this.deviceAddForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
    })

    this.deviceEditForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
    })

    // this.isLoading = true
    // this.request.getUsersRequest().subscribe( (response: any) => {
    //   this.usersData = response.reverse()
    //   this.isLoading = false
    // }, error => {
    //   this.isLoading = false
    //   alert(error.error.Error)
    //    if(error.status == 401) {
    //     this.request.refreshRequest(localStorage.getItem('access_token')).subscribe( (response: any) => {
    //       localStorage.setItem('access_token', response.access_token)
    //       this.isLoading = false
    //       location.reload()
    //     })
    //   }
    // })

    var token: any = localStorage.getItem('access_token')
    var decoded: any = jwt_decode(token);
    console.log(decoded);

    if (decoded.user_role == 'admin') {
      this.permitActions = true
    } else if (decoded.user_role == 'sales') {
      this.permitActions = false
    }
    
  }

  filterTable() {
    const deviceFilterFormData = {...this.deviceFilterForm.value}
    this.isLoading = true
    this.request.getFilterDeviceRequest(deviceFilterFormData.id, deviceFilterFormData.name).subscribe( (response: any) => {
      this.deviceData = response.reverse()
      this.isLoading = false
    }, error => {
        this.isLoading = false
        if(error.status == 401) {
          this.request.refreshRequest(localStorage.getItem('refresh_token')).subscribe( (response: any) => {
            localStorage.setItem('access_token', response.access_token)
            localStorage.setItem('refresh_token', response.refresh_token)
            this.isLoading = false
            location.reload()
          }, error => {
            localStorage.clear()
            location.reload()
          })
        }
      })
  }

  addNewTable() {
    const deviceAddFormData = {...this.deviceAddForm.value}
    this.isLoading = true
    this.request.postDeviceRequest(deviceAddFormData.name).subscribe(response => {
      this.isLoading = false
      location.reload()
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
    })
  }
  
  openEditTable(id: number) {
    this.tableId = id
    this.editTable = true
    this.deviceEditForm.patchValue(this.deviceData.filter( (res: any) => res.id ==  id)[0])
  }

  editNewTable() {
    const deviceEditFormData = {...this.deviceEditForm.value}
    this.isLoading = true
    this.request.putDeviceRequest(this.tableId, deviceEditFormData.name).subscribe(response => {
      this.isLoading = false
      location.reload()
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
    })
  }


  deleteTable(id: number) {
    this.isLoading = true
    let deleteConf = confirm("Вы уверени что хотите удалить данный ID: " + id)
    if(deleteConf == true) {
      this.request.deleteDeviceRequest(id).subscribe(response => {
        this.isLoading = false
        location.reload()
      }, error => {
        this.isLoading = false
        alert(error.error.Error)
      })
    } else {
      this.isLoading = false
    }
  }

}
