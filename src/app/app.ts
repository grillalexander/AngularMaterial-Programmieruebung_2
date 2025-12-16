import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Backend } from './shared/backend';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MatSnackBarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
