import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: false,
})
export class DurationPipe implements PipeTransform {
  transform(duration: number): string {
    if (isNaN(duration) || duration < 0) {
      return '00:00 hour';
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes} hour${(hours === 1 && minutes === 0) ? '' : 's'}`;
  }
}
