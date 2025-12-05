import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiTesterComponent } from './components/api-tester/api-tester.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ApiTesterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
