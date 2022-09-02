import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-permission-page',
  templateUrl: './permission-page.component.html',
  styleUrls: ['./permission-page.component.scss']
})
export class PermissionPageComponent implements OnInit {
  permissionData: any = []
  permissionRouteData: any = []
  permissionAddForm!: UntypedFormGroup
  permissionEditForm!: UntypedFormGroup
  permissionFilterForm!: UntypedFormGroup
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
    
    this.permissionFilterForm = new UntypedFormGroup({
      id: new UntypedFormControl('', Validators.required),
      name: new UntypedFormControl('', Validators.required),
      routes: new UntypedFormControl('', Validators.required)
    })

    this.permissionAddForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      routes: new UntypedFormControl('', Validators.required)
    })

    this.permissionEditForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      routes: new UntypedFormControl('', Validators.required)
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

    if (decoded.user_role == 'admin') {
      this.permitActions = true
    } else if (decoded.user_role == 'sales') {
      this.permitActions = false
    }

    this.request.getPermissionRouteRequest().subscribe(response => {
      this.permissionRouteData = response
    }, error => {
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

  filterTable() {
    const permissionFilterFormData = {...this.permissionFilterForm.value}
    this.isLoading = true
    this.request.getFilterPermissionRequest(permissionFilterFormData.id, permissionFilterFormData.name, permissionFilterFormData.routes).subscribe( (response: any) => {
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
    var token: any = localStorage.getItem('access_token')
    var decoded: any = jwt_decode(token);
    this.request.postPermissionRequest(permissionAddFormData.name, decoded.user_id, 1, permissionAddFormData.routes*1).subscribe(response => {
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
    var token: any = localStorage.getItem('access_token')
    var decoded: any = jwt_decode(token);
    this.request.putPermissionRequest(this.tableId, permissionEditFormData.name, decoded.user_id, 1, permissionEditFormData.routes*1).subscribe(response => {
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
