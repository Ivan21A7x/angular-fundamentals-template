import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, IconName } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: false,
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  @Input() buttonText?: string;
  @Input() iconName?: IconName; // FontAwesome icon
  @Input() pngIcon?: string;    // Name of PNG icon (without path)
  @Input() disabled: boolean = false;
}
