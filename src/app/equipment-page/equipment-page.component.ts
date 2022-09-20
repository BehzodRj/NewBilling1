import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-equipment-page',
  templateUrl: './equipment-page.component.html',
  styleUrls: ['./equipment-page.component.scss']
})
export class EquipmentPageComponent implements OnInit {
  allData: any = []
  serviceData: any = []
  allAddForm!: FormGroup
  allEditForm!: FormGroup
  allFilterForm!: FormGroup
  page: any
  search: any
  addTable = false
  editTable = false
  tableId: any
  numAccounts: any = 0
  summTarifs: any = 0
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
      account_id: new FormControl('', Validators.required),
      fio: new FormControl('', Validators.required),
      created_at: new FormControl('', Validators.required),
      expire_at: new FormControl('', Validators.required),
      next_payment: new FormControl('', Validators.required),
      service: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      deleted: new FormControl('', Validators.required)
    })

    this.allAddForm = new FormGroup({
      account_id: new FormControl('', Validators.required),
      fio: new FormControl('', Validators.required),
      created_at: new FormControl('', Validators.required),
      expire_at: new FormControl('', Validators.required),
      next_payment: new FormControl('', Validators.required),
      service: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      deleted: new FormControl('', Validators.required)
    })

    this.allEditForm = new FormGroup({
      account_id: new FormControl('', Validators.required),
      fio: new FormControl('', Validators.required),
      created_at: new FormControl('', Validators.required),
      expire_at: new FormControl('', Validators.required),
      next_payment: new FormControl('', Validators.required),
      service: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      deleted: new FormControl('', Validators.required)
    })

    var token: any = localStorage.getItem('access_token')
    var decoded: any = jwt_decode(token);

    if (decoded.user_role == 'admin') {
      this.permitActions = true
    } else if (decoded.user_role == 'sales') {
      this.permitActions = false
    }
    
    this.request.getServicesRequest().subscribe(response => {
      this.serviceData = response
    })
  }

  filterTable() {
    this.summTarifs = 0
    const allFilterFormData = {...this.allFilterForm.value}
    this.isLoading = true
    this.request.getFilterServiceLinkRequest(allFilterFormData.account_id, allFilterFormData.fio, allFilterFormData.created_at, allFilterFormData.expire_at, allFilterFormData.next_payment, allFilterFormData.service, allFilterFormData.price, allFilterFormData.deleted).subscribe(response => {
      this.allData = response
      this.isLoading = false
      this.numAccounts = this.allData.length
      let num = 0
      this.allData.forEach( (element: any) => {
        let nd: any = new Date(element.next_payment).toLocaleDateString().split('.')
        let ed: any = new Date(element.expire_at).toLocaleDateString().split('.')

        let nextP1 = nd[1] * 30 + (nd[0] * 1)
        let nextP2 = (nd[2] * 12) * 30

        let expireAt1 = ed[1] * 30 + (ed[0] * 1)
        let expireAt2 = (ed[2] * 12) * 30
        let result =  ( ( (expireAt1 + expireAt2) - (nextP2 + nextP1) ) / 30 ) * element.service?.price
        
        num += result
        this.summTarifs = num
      })
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
    // const allAddFormData = {...this.allAddForm.value}
    // this.isLoading = true
    // this.request.putServiceLinkRequest(allAddFormData.name).subscribe(response => {
    //   this.isLoading = false
    //   location.reload()
    // }, error => {
    //   this.isLoading = false
    //   alert(error.error.Error)
    // })
  }
  
  openEditTable(id: number) {
    this.tableId = id
    this.editTable = true
    this.allEditForm.patchValue(this.allData.filter( (res: any) => res.id ==  id)[0])
  }

  editNewTable() {
    // const allEditFormData = {...this.allEditForm.value}
    // this.isLoading = true
    // this.request.putServiceLinkRequest(this.tableId, allEditFormData.name).subscribe(response => {
    //   this.isLoading = false
    //   location.reload()
    // }, error => {
    //   this.isLoading = false
    //   alert(error.error.Error)
    // })
  }


  deleteTable(id: number) {
    // this.isLoading = true
    // let deleteConf = confirm("Вы уверени что хотите удалить данный ID: " + id)
    // if(deleteConf == true) {
    //   this.request.deleteallRequest(id).subscribe(response => {
    //     this.isLoading = false
    //     location.reload()
    //   }, error => {
    //     this.isLoading = false
    //     alert(error.error.Error)
    //   })
    // } else {
    //   this.isLoading = false
    // }
  }
}
