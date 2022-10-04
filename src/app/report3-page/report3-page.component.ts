import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';
import jwt_decode from "jwt-decode";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report3-page',
  templateUrl: './report3-page.component.html',
  styleUrls: ['./report3-page.component.scss']
})
export class Report3PageComponent implements OnInit {
  allData: any = []
  allFilterForm!: FormGroup
  isLoading = false
  permitActions = true
  numAccounts: any = 0
  fileName: any

  constructor(private request: RequestsService) {}

  ngOnInit() {
    if(localStorage.getItem('isDark')) {
      document.body.classList.remove('dark-theme')
    } else if(!localStorage.getItem('isDark')) {
      document.body.classList.toggle('dark-theme')
    }
    
    this.allFilterForm = new FormGroup({
      date_from: new FormControl('', Validators.required),
      date_to: new FormControl('', Validators.required)
    })

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
    const allFilterFormData = {...this.allFilterForm.value}
    this.isLoading = true
    this.request.getFilterReport3Request(allFilterFormData.date_from, allFilterFormData.date_to).subscribe(response => {
      this.allData = response
      this.numAccounts = this.allData.length
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

  exportexcelReport3(): void {
    this.fileName = 'Отчёт 3.xlsx'
     /* table id is passed over here */   
     let element = document.getElementById('excel-table-report3'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     var wscols = [
      {wch:8},
      {wch:40},
      {wch:20},
      {wch:20},
      {wch:50},
      {wch:20},
      {wch:30},
      {wch:30},
      {wch:30},
      {wch:30},
      {wch:40},
      {wch:30},
      {wch:30},
      {wch:10},
      {wch:20},
      {wch:10},
      {wch:15},
      {wch:40},
      {wch:40},
      {wch:20},
      {wch:15},
  ];
  
  ws['!cols'] = wscols;

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
  }

  jsonReport3() {
    const allFilterFormData = {...this.allFilterForm.value}
    this.request.getFilterReport3Request(allFilterFormData.date_from, allFilterFormData.date_to).subscribe( (response: any) => {
      var file = new Blob([JSON.stringify(response)], { type: 'application/json' })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(file);
      link.download = 'Отчёт3.txt'
      link.click()
      link.remove()
    })
  }
}
