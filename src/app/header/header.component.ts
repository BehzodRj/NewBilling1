import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('navigation', [
      state('before', style({ transform: 'rotate(0)' })),
      state('after', style({ transform: 'translateY(7px) rotate(-135deg)' })),
      transition('before <=> after', animate(200)),
      state('nextBefore', style({ transform: 'rotate(0)' })),
      state('nextAfter', style({ transform: 'rotate(135deg)' })),
      transition('nextBefore <=> nextAfter', animate(200)),
      state('lastBefore', style({ display: 'block' })),
      state('lastAfter', style({ display: 'none' })),
      transition('lastBefore <=> lastAfter', animate(100)),
      state('beforeNav', style({ transform: 'translateX(-100%)' })),
      state('afterNav', style({ transform: 'translateX(0)' })),
      transition('afterNav <=> beforeNav', animate(250)),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  line = false
  themes_name = 'Светлая тема'
  color: ThemePalette = 'warn';
  isDark: any
  isCheked: any
  panelOpenState = false;

  constructor(private router: Router) {}

  ngOnInit() {
    if(localStorage.getItem('isDark')) {
      document.body.classList.toggle('dark-theme')
      this.isDark = true
      this.isCheked = true
    } else if(!localStorage.getItem('isDark')) {
      document.body.classList.remove('dark-theme')
      this.isDark = false
      this.isCheked = false
    }
  }

  navAnime() {
    this.line = !this.line
  }

  chageThemesName() {
    this.isDark = !this.isDark
    
    if( this.isDark == true ) {
      localStorage.setItem('isDark', this.isDark)
      document.body.classList.toggle('dark-theme');
      this.isCheked = false
      this.themes_name = 'Тёмная тема'
    } 
    else if( this.isDark == false ) {
      localStorage.removeItem('isDark')
      document.body.classList.remove('dark-theme');
      this.isCheked = true
      this.themes_name = 'Светлая тема'
    }
  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
