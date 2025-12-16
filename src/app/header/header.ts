import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public title: string = 'Stay Active, Stay Together';
  public imagePath: string = 'assets/images/sport.jpg';
  public currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
    // Set initial route
    this.currentRoute = this.router.url;
  }

  isActive(route: string): boolean {
    if (route === '/dashboard' || route === '') {
      return this.currentRoute === '/dashboard' || this.currentRoute === '/';
    }
    return this.currentRoute === route;
  }
}
