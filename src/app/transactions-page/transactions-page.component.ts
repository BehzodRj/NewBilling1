import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss']
})
export class TransactionsPageComponent implements OnInit {
  transactionsData: any = []
  transactionsForm!: FormGroup
  transactionsFilterForm!: FormGroup
  page: any
  search: any
  addTable = false
  editTable = false
  addText = 'Добавить'
  isLoading = false

  constructor(private request: RequestsService) { }

  ngOnInit() {
    if(localStorage.getItem('isDark')) {
      document.body.classList.remove('dark-theme')
    } else if(!localStorage.getItem('isDark')) {
      document.body.classList.toggle('dark-theme')
    }
    
    this.transactionsFilterForm = new FormGroup({
      id: new FormControl('', Validators.required),
      operator: new FormControl('', Validators.required),
      txn_date: new FormControl('', Validators.required),
      txn_id: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
    })

    this.transactionsForm = new FormGroup({
      operator: new FormControl('', Validators.required),
      sum: new FormControl('', Validators.required),
      score: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      txn_date: new FormControl('', Validators.required),
      txn_id: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required)
    })

    // this.isLoading = true
    // this.request.getTransactionsRequest().subscribe(response => {
    //   this.transactionsData = response
    //   this.isLoading = false
    // }, error => {
    //   this.isLoading = false
    //   alert(error.error.Error)
    //   if(error.status == 401) {
    //    this.request.refreshRequest(localStorage.getItem('access_token')).subscribe( (response: any) => {
    //      localStorage.setItem('access_token', response.access_token)
    //      this.isLoading = false
    //      location.reload()
    //    })
    //   }
    // })
  }

  filterTable() {
    const transactionsFilterFormData = {...this.transactionsFilterForm.value}
    if(transactionsFilterFormData.start_date && transactionsFilterFormData.end_date) {
      var start_date: any = new Date(transactionsFilterFormData.start_date)
      var end_date: any = new Date(transactionsFilterFormData.end_date)
      this.isLoading = true
      this.request.getFilterTransactionsRequest(transactionsFilterFormData.id, transactionsFilterFormData.operator, transactionsFilterFormData.txn_date,  transactionsFilterFormData.txn_id, transactionsFilterFormData.comment,  start_date.toLocaleDateString().split('.').reverse().join('.'), end_date.toLocaleDateString().split('.').reverse().join('.')).subscribe(response => {
        this.transactionsData = response
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
    } else {
      this.isLoading = true
      this.request.getFilterTransactionsRequest(transactionsFilterFormData.id, transactionsFilterFormData.operator, transactionsFilterFormData.txn_date,  transactionsFilterFormData.txn_id, transactionsFilterFormData.comment, '', '').subscribe(response => {
        this.transactionsData = response
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
  }

  addButton() {
    this.addTable = !this.addTable
    if(this.addText == 'Добавить') {
      this.addText = 'Закрыть'
    } else if (this.addText == 'Закрыть') {
      this.addText = 'Добавить'
    }
  }

  addNewTable() {
    const transactionsFormData = {...this.transactionsForm.value}
    this.isLoading = true
    this.request.postTransactionsRequest(199, transactionsFormData.operator, transactionsFormData.sum, transactionsFormData.score, transactionsFormData.date, transactionsFormData.txn_date, transactionsFormData.txn_id, transactionsFormData.comment).subscribe(response => {
      this.isLoading = false
      location.reload()
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
    })
  }

}
