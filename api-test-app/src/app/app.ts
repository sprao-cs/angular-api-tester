import { Component } from '@angular/core';
import { ApiTesterComponent } from './components/api-tester/api-tester.component';

@Component({
  selector: 'app-root',
  imports: [ApiTesterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

