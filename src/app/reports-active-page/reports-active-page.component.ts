import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-active-page',
  templateUrl: './reports-active-page.component.html',
  styleUrls: ['./reports-active-page.component.scss']
})
export class ReportsActivePageComponent implements OnInit {
  isLoading = false

  constructor() { }

  ngOnInit(): void {
  }

}
