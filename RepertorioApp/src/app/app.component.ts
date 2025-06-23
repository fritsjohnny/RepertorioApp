import { Component } from '@angular/core';
import { MenuComponent } from './shared/menu/menu.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected title = 'RepertorioApp';
}
