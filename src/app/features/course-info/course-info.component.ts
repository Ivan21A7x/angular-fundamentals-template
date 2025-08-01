import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() id: string = '';
  @Input() creationDate: Date | string = '';
  @Input() duration: number = 0;
  @Input() authors: string[] = [];

  @Output() back = new EventEmitter<void>();

  onBack(): void {
    this.back.emit();
  }
}
