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
      gender: new FormControl('', Validators.required),
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
    this.isLoading = true
    this.request.getFilterAccountsRequest('', '', '', '', '', '', '', '', '', '', '', accountsFilterFormData.gender, '', '', '', '', '', '', '', '','','', '').subscribe(response => {
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
  }

}
