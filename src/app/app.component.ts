import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  courseId: any;
  onShowCourse(arg0: any) {
    throw new Error('Method not implemented.');
  }
  user: any;
  courseDate: Date | undefined;
  logout() {
    throw new Error('Method not implemented.');
  }
  login() {
    throw new Error('Method not implemented.');
  }
  title = 'courses-app';
}
