import { Component } from '@angular/core';
import { LouvorListComponent } from './pages/louvor-list/louvor-list.component';
@Component({
  selector: 'app-root',
  imports: [LouvorListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected title = 'RepertorioApp';
}
