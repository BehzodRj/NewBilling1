import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  usersData: any = []
  usersAddForm!: FormGroup
  usersEditForm!: FormGroup
  usersFilterForm!: FormGroup
  page: any
  search: any
  addTable = false
  editTable = false
  tableId: any
  isLoading = false

  constructor(private request: RequestsService) {}

  ngOnInit() {
    if(localStorage.getItem('isDark')) {
      document.body.classList.remove('dark-theme')
    } else if(!localStorage.getItem('isDark')) {
      document.body.classList.toggle('dark-theme')
    }
    
    this.usersFilterForm = new FormGroup({
      fio: new FormControl('', Validators.required),
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    })

    this.usersAddForm = new FormGroup({
      fio: new FormControl('', Validators.required),
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('admin', Validators.required),
    })

    this.usersEditForm = new FormGroup({
      fio: new FormControl('', Validators.required),
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
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
  }

  filterTable() {
    const usersFilterFormData = {...this.usersFilterForm.value}
    this.isLoading = true
    this.request.getFilterUsersRequest(usersFilterFormData.fio, usersFilterFormData.login, usersFilterFormData.role).subscribe( (response: any) => {
      this.usersData = response.reverse()
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
    const usersAddFormData = {...this.usersAddForm.value}
    this.isLoading = true
    this.request.postUsersRequest(usersAddFormData.fio, usersAddFormData.login, usersAddFormData.password, usersAddFormData.role).subscribe(response => {
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
    this.usersEditForm.patchValue(this.usersData.filter( (res: any) => res.id ==  id)[0])
  }

  editNewTable() {
    const usersEditFormData = {...this.usersEditForm.value}
    this.isLoading = true
    this.request.putUsersRequest(this.tableId, usersEditFormData.fio, usersEditFormData.login, usersEditFormData.password, usersEditFormData.role).subscribe(response => {
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
      this.request.deleteUsersRequest(id).subscribe(response => {
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
