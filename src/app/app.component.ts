import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Romina Musaj';
  testHtml = `
  <h2>All Access content</h2>
  <p> Hello {{fullName}} ! </p>
  `;
}