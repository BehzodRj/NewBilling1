import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../all.service';
import jwt_decode from "jwt-decode";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history-change-page',
  templateUrl: './history-change-page.component.html',
  styleUrls: ['./history-change-page.component.scss']
})
export class HistoryChangePageComponent implements OnInit {
  accountsData: any = []
  changeHistoryData: any = []
  permitActions = true
  isLoading = false

  constructor(private route: ActivatedRoute, private request: RequestsService) {}

  ngOnInit() {
    if(localStorage.getItem('isDark')) {
      document.body.classList.remove('dark-theme')
    } else if(!localStorage.getItem('isDark')) {
      document.body.classList.toggle('dark-theme')
    }


    this.route.params.subscribe( (param: any) => {
      this.isLoading = true
      this.request.getAccountsByIdRequest(param.id).subscribe( (response: any) => {
        this.accountsData = response
        this.isLoading = false
      }, error => {
        this.isLoading = false
        alert(error.error.Error)
         if(error.status == 401) {
          this.request.refreshRequest(localStorage.getItem('refresh_token')).subscribe( (response: any) => {
            localStorage.setItem('access_token', response.access_token)
            this.isLoading = false
            location.reload()
          })
        }
      })

      this.request.getChangeHistoryRequest(param.id).subscribe( (response: any) => {
        this.changeHistoryData = response
      }, error => {
        alert(error.error.Error)
         if(error.status == 401) {
          this.request.refreshRequest(localStorage.getItem('refresh_token')).subscribe( (response: any) => {
            localStorage.setItem('access_token', response.access_token)
            location.reload()
          })
        }
      })
    })

    var token: any = localStorage.getItem('access_token')
    var decoded: any = jwt_decode(token);

    if (decoded.user_role == 'admin') {
      this.permitActions = true
    } else if (decoded.user_role == 'sales') {
      this.permitActions = false
    }

  }

}