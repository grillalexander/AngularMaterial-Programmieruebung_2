import { Component, inject, OnInit } from '@angular/core';
import { Data } from './data/data';
import { AddData } from './add-data/add-data';
import { Backend } from '../shared/backend';

@Component({
  selector: 'app-dashboard',
  imports: [Data, AddData],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  public backend = inject(Backend);

  ngOnInit(): void {
    // Always load data on component initialization
    this.backend.getCourses();
    this.backend.getRegistrations();
  }
}
