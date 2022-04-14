import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit {
  servicesData: any = []
  servicesAddForm!: FormGroup
  servicesEditForm!: FormGroup
  servicesFilterForm!: FormGroup
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
    
    this.servicesFilterForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      score: new FormControl('', Validators.required),
      month_count: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required)
    })

    this.servicesAddForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      score: new FormControl('', Validators.required),
      month_count: new FormControl('', Validators.required),
      comment: new FormControl('')
    })

    this.servicesEditForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      score: new FormControl('', Validators.required),
      month_count: new FormControl('', Validators.required),
      comment: new FormControl('')
    })

    // this.isLoading = true
    // this.request.getServicesRequest().subscribe( (response: any) => {
    //   this.servicesData = response.reverse()
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
    const servicesFilterFormData = {...this.servicesFilterForm.value}
    this.isLoading = true
    this.request.getFilterServicesRequest(servicesFilterFormData.name, servicesFilterFormData.price, servicesFilterFormData.score, servicesFilterFormData.month_count, servicesFilterFormData.comment).subscribe(response => {
      this.servicesData = response
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
    const servicesAddFormData = {...this.servicesAddForm.value}
    this.isLoading = true
    this.request.postServicesRequest(servicesAddFormData.name, servicesAddFormData.price, servicesAddFormData.score, servicesAddFormData.month_count, servicesAddFormData.comment).subscribe(response => {
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
    this.servicesEditForm.patchValue(this.servicesData.filter( (res: any) => res.id ==  id)[0])
  }

  editNewTable() {
    const servicesEditFormData = {...this.servicesEditForm.value}
    this.isLoading = true
    this.request.putServicesRequest(this.tableId, servicesEditFormData.name, servicesEditFormData.price, servicesEditFormData.score, servicesEditFormData.month_count, servicesEditFormData.comment).subscribe(response => {
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
      this.request.deleteServicesRequest(id).subscribe(response => {
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
