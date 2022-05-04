import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-permission-page',
  templateUrl: './permission-page.component.html',
  styleUrls: ['./permission-page.component.scss']
})
export class PermissionPageComponent implements OnInit {
  permissionData: any = []
  permissionAddForm!: FormGroup
  permissionEditForm!: FormGroup
  permissionFilterForm!: FormGroup
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
    
    this.permissionFilterForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    })

    this.permissionAddForm = new FormGroup({
      name: new FormControl('', Validators.required),
    })

    this.permissionEditForm = new FormGroup({
      name: new FormControl('', Validators.required),
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
    const permissionFilterFormData = {...this.permissionFilterForm.value}
    this.isLoading = true
    this.request.getFilterPermissionRequest(permissionFilterFormData.id, permissionFilterFormData.name).subscribe( (response: any) => {
      this.permissionData = response.reverse()
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
    const permissionAddFormData = {...this.permissionAddForm.value}
    this.isLoading = true
    this.request.postPermissionRequest(permissionAddFormData.name).subscribe(response => {
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
    this.permissionEditForm.patchValue(this.permissionData.filter( (res: any) => res.id ==  id)[0])
  }

  editNewTable() {
    const permissionEditFormData = {...this.permissionEditForm.value}
    this.isLoading = true
    this.request.putPermissionRequest(this.tableId, permissionEditFormData.name).subscribe(response => {
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
      this.request.deletePermissionRequest(id).subscribe(response => {
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
