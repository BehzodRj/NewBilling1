import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../all.service';

@Component({
  selector: 'app-transaction-history-page',
  templateUrl: './transaction-history-page.component.html',
  styleUrls: ['./transaction-history-page.component.scss']
})
export class TransactionHistoryPageComponent implements OnInit {
  transactionHistoryData: any = []
  isLoading = false

  constructor(private request: RequestsService, private route: ActivatedRoute) {}

  ngOnInit() {
    if(localStorage.getItem('isDark')) {
      document.body.classList.remove('dark-theme')
    } else if(!localStorage.getItem('isDark')) {
      document.body.classList.toggle('dark-theme')
    }

    this.isLoading = true
    this.route.params.subscribe( (params: any) => {
      this.request.getFilterTransactionsRequest(params.id, '', '', '', '', '', '').subscribe(response => {
        this.transactionHistoryData = response
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
    })

  }

}
