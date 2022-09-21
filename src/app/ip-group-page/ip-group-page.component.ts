import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-ip-group-page',
  templateUrl: './ip-group-page.component.html',
  styleUrls: ['./ip-group-page.component.scss']
})
export class IpGroupPageComponent implements OnInit {
  allData: any = []
  // promotionData: any = []
  allAddForm!: FormGroup
  allEditForm!: FormGroup
  allFilterForm!: FormGroup
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
    
    this.allFilterForm = new FormGroup({
      id: new FormControl('', Validators.required),
      ip_start: new FormControl('', Validators.required),
      ip_mask: new FormControl('', Validators.required),
      last_ip: new FormControl('', Validators.required)
    })

    this.allAddForm = new FormGroup({
      ip_start: new FormControl('', Validators.required),
      ip_mask: new FormControl('', Validators.required),
      last_ip: new FormControl('', Validators.required)
    })

    this.allEditForm = new FormGroup({
      ip_start: new FormControl('', Validators.required),
      ip_mask: new FormControl('', Validators.required),
      last_ip: new FormControl('', Validators.required)
    })

    var token: any = localStorage.getItem('access_token')
    var decoded: any = jwt_decode(token);
    console.log(decoded);

    if (decoded.user_role == 'admin') {
      this.permitActions = true
    } else if (decoded.user_role == 'sales') {
      this.permitActions = false
    }
    
    // this.request.getPromotionRequest().subscribe(response => {
    //   this.promotionData = response
    // })
  }

  filterTable() {
    const allFilterFormData = {...this.allFilterForm.value}
    this.isLoading = true
    this.request.getFilterIPGroupRequest(allFilterFormData.id, allFilterFormData.ip_start, allFilterFormData.ip_mask, allFilterFormData.last_ip).subscribe(response => {
      this.allData = response
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
    const allAddFormData = {...this.allAddForm.value}
    this.isLoading = true
    this.request.postIPGroupRequest(allAddFormData.ip_start, allAddFormData.ip_mask * 1, allAddFormData.last_ip).subscribe(response => {
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
    this.allEditForm.patchValue(this.allData.filter( (res: any) => res.id ==  id)[0])
  }

  editNewTable() {
    const allEditFormData = {...this.allEditForm.value}
    this.isLoading = true
    this.request.putIPGroupRequest(this.tableId, allEditFormData.ip_start, allEditFormData.ip_mask, allEditFormData.last_ip).subscribe(response => {
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
      this.request.deleteIPGroupRequest(id).subscribe(response => {
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
