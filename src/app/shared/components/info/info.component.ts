import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  standalone: false,
})
export class InfoComponent {
  @Input() title!: string;
  @Input() text?: string;
}
