import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
  exportAs: 'togglePassword'
})
export class TogglePasswordDirective {
  private isPasswordVisible = false;

  @HostBinding('attr.type')
  get inputType(): string {
    return this.isPasswordVisible ? 'text' : 'password';
  }

  toggle(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  get visible(): boolean {
    return this.isPasswordVisible;
  }
}
