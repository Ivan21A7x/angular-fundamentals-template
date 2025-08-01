import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() placeholder: string = 'Search...';
  @Output() search = new EventEmitter<string>();

  searchText: string = '';

  onSearchClick(): void {
    this.search.emit(this.searchText.trim());
  }
}
