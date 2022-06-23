import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';

@Component({
  selector: 'app-reports-gender-page',
  templateUrl: './reports-gender-page.component.html',
  styleUrls: ['./reports-gender-page.component.scss']
})
export class ReportsGenderPageComponent implements OnInit {
  reportsActiveData: any = []
  tarifsData: any = []
  accountsFilterForm!: FormGroup
  isLoading = false
  numAccounts: any = 0

  constructor(private request: RequestsService) { }

  ngOnInit() {
    if(localStorage.getItem('isDark')) {
      document.body.classList.remove('dark-theme')
    } else if(!localStorage.getItem('isDark')) {
      document.body.classList.toggle('dark-theme')
    }

    this.accountsFilterForm = new FormGroup({
      id: new FormControl('', Validators.required),    
      fio: new FormControl('', Validators.required),
      tarif_id: new FormControl('', Validators.required),
      speed_cf: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      ipaddress: new FormControl('', Validators.required),
      acc_info: new FormControl('', Validators.required),
      passport: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      overdraft: new FormControl('', Validators.required),
      customr_type: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      start_create: new FormControl('', Validators.required),
      end_create: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
    })
    
    // this.request.getFilterAccountsRequest('', '', '', '', '', '', '', '', '', '', 'On', '', '', '', '').subscribe(response => {
    //   this.reportsActiveData = response
    //   this.numAccounts = this.reportsActiveData.length
    // })

    this.request.getTarifsRequest().subscribe( (response: any) => {
      this.tarifsData = response
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
    const accountsFilterFormData = {...this.accountsFilterForm.value}
    if( (accountsFilterFormData.start_create && accountsFilterFormData.end_create) && (accountsFilterFormData.start_date && accountsFilterFormData.end_date)) {
      var start_create: any = new Date(accountsFilterFormData.start_create)
      var end_create: any = new Date(accountsFilterFormData.end_create)
      var start_date: any = new Date(accountsFilterFormData.start_date)
      var end_date: any = new Date(accountsFilterFormData.end_date)
      this.isLoading = true
      this.request.getFilterAccountsRequest(accountsFilterFormData.id, accountsFilterFormData.fio, accountsFilterFormData.tarif_id, accountsFilterFormData.speed_cf, accountsFilterFormData.phone_number, accountsFilterFormData.ipaddress, accountsFilterFormData.acc_info, accountsFilterFormData.passport, accountsFilterFormData.age, accountsFilterFormData.gender, accountsFilterFormData.overdraft, accountsFilterFormData.customr_type, accountsFilterFormData.comment, accountsFilterFormData.status, start_create.toLocaleDateString().split('.').reverse().join('.'), end_create.toLocaleDateString().split('.').reverse().join('.'), start_date.toLocaleDateString().split('.').reverse().join('.'), end_date.toLocaleDateString().split('.').reverse().join('.'),'','', accountsFilterFormData.page_size).subscribe(response => {
        this.reportsActiveData = response
        this.isLoading = false
        this.numAccounts = this.reportsActiveData.length
      }, error => {
        this.isLoading = false
         if(error.status == 401) {
          this.request.refreshRequest(localStorage.getItem('refresh_token')).subscribe( (response: any) => {
            localStorage.setItem('access_token', response.access_token)
            localStorage.setItem('refresh_token', response.refresh_token)
            this.isLoading = false
            location.reload()
          })
        }
      })
    } else if (accountsFilterFormData.start_create && accountsFilterFormData.end_create) {
        this.isLoading = true
        var start_create: any = new Date(accountsFilterFormData.start_create)
        var end_create: any = new Date(accountsFilterFormData.end_create)
        this.request.getFilterAccountsRequest(accountsFilterFormData.id, accountsFilterFormData.fio, accountsFilterFormData.tarif_id, accountsFilterFormData.speed_cf, accountsFilterFormData.phone_number, accountsFilterFormData.ipaddress, accountsFilterFormData.acc_info, accountsFilterFormData.passport, accountsFilterFormData.age, accountsFilterFormData.gender, accountsFilterFormData.overdraft, accountsFilterFormData.customr_type, accountsFilterFormData.comment, accountsFilterFormData.status, start_create.toLocaleDateString().split('.').reverse().join('.'), end_create.toLocaleDateString().split('.').reverse().join('.'), '', '','','', accountsFilterFormData.page_size).subscribe(response => {
          this.reportsActiveData = response
          this.isLoading = false
          this.numAccounts = this.reportsActiveData.length
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
    } else if (accountsFilterFormData.start_date && accountsFilterFormData.end_date) {
        this.isLoading = true
        var start_date: any = new Date(accountsFilterFormData.start_date)
        var end_date: any = new Date(accountsFilterFormData.end_date)
        this.request.getFilterAccountsRequest(accountsFilterFormData.id, accountsFilterFormData.fio, accountsFilterFormData.tarif_id, accountsFilterFormData.speed_cf, accountsFilterFormData.phone_number, accountsFilterFormData.ipaddress, accountsFilterFormData.acc_info, accountsFilterFormData.passport, accountsFilterFormData.age, accountsFilterFormData.gender, accountsFilterFormData.overdraft, accountsFilterFormData.customr_type, accountsFilterFormData.comment, accountsFilterFormData.status, '', '', start_date.toLocaleDateString().split('.').reverse().join('.'), end_date.toLocaleDateString().split('.').reverse().join('.'),'','', accountsFilterFormData.page_size).subscribe(response => {
          this.reportsActiveData = response
          this.isLoading = false
          this.numAccounts = this.reportsActiveData.length
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
        this.request.getFilterAccountsRequest(accountsFilterFormData.id, accountsFilterFormData.fio, accountsFilterFormData.tarif_id, accountsFilterFormData.speed_cf, accountsFilterFormData.phone_number, accountsFilterFormData.ipaddress, accountsFilterFormData.acc_info, accountsFilterFormData.passport, accountsFilterFormData.age, accountsFilterFormData.gender, accountsFilterFormData.overdraft, accountsFilterFormData.customr_type, accountsFilterFormData.comment, accountsFilterFormData.status, '', '', '', '','','', accountsFilterFormData.page_size).subscribe(response => {
          this.reportsActiveData = response
          this.isLoading = false
          this.numAccounts = this.reportsActiveData.length
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

}
