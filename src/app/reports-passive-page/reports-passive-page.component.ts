import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';

@Component({
  selector: 'app-reports-passive-page',
  templateUrl: './reports-passive-page.component.html',
  styleUrls: ['./reports-passive-page.component.scss']
})
export class ReportsPassivePageComponent implements OnInit {
  reportsActiveData: any = []
  isLoading = false
  numAccounts: any = 0

  constructor(private request: RequestsService) { }

  ngOnInit() {
    if(localStorage.getItem('isDark')) {
      document.body.classList.remove('dark-theme')
    } else if(!localStorage.getItem('isDark')) {
      document.body.classList.toggle('dark-theme')
    }
    
    let d = new Date()
    d.setMonth(d.getMonth() - 3)
    this.isLoading = true
    this.request.getFilterAccountsRequest('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', d.toISOString(),'','', '').subscribe(response => {
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
