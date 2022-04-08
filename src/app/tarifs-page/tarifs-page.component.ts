import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';

@Component({
  selector: 'app-tarifs-page',
  templateUrl: './tarifs-page.component.html',
  styleUrls: ['./tarifs-page.component.scss'],
})
export class TarifsPageComponent implements OnInit {
  tarifsData: any = []
  tarifsFilterForm!: FormGroup
  tarifsAddForm!: FormGroup
  tarifsEditForm!: FormGroup
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
    
    this.tarifsFilterForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      score: new FormControl('', Validators.required),
      speed: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required)
    })

    this.tarifsAddForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      score: new FormControl('', Validators.required),
      speed: new FormControl('', Validators.required),
      comment: new FormControl('')
    })

    this.tarifsEditForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      score: new FormControl('', Validators.required),
      speed: new FormControl('', Validators.required),
      comment: new FormControl('')
    })

    // this.isLoading = true
    // this.request.getTarifsRequest().subscribe( (response: any) => {
    //   this.tarifsData = response.reverse()
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
    const tarifsFilterFormData = {...this.tarifsFilterForm.value}
    this.isLoading = true
    this.request.getFilterTarifsRequest(tarifsFilterFormData.name, tarifsFilterFormData.price, tarifsFilterFormData.score, tarifsFilterFormData.speed, tarifsFilterFormData.comment).subscribe( (response: any) => {
      this.tarifsData = response.reverse()
      this.isLoading = false
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
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

  // filterNumber(element: any) {
  //   // console.log(this.tarifsData[element.target.value]);
  //   let as: any = []
  //   for (let index = 0; index < element.target.value; index++) {
  //     as.push(this.tarifsData[index])
  //   }
  //   this.tarifsData = []
  // }

  addNewTable() {
    const tarifsAddFormData = {...this.tarifsAddForm.value}
    this.isLoading = true
    this.request.postTarifsRequest(tarifsAddFormData.name, tarifsAddFormData.price, tarifsAddFormData.score, tarifsAddFormData.speed, tarifsAddFormData.comment).subscribe(response => {
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
    this.tarifsEditForm.patchValue(this.tarifsData.filter( (res: any) => res.id ==  id)[0])
  }

  editNewTable() {
    const tarifsEditFormData = {...this.tarifsEditForm.value}
    this.isLoading = true
    this.request.putTarifsRequest(this.tableId, tarifsEditFormData.name, tarifsEditFormData.price, tarifsEditFormData.score, tarifsEditFormData.speed, tarifsEditFormData.comment).subscribe(response => {
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
      this.request.deleteTarifsRequest(id).subscribe(response => {
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
