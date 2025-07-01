import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html',
  styleUrls: ['./card-filter.component.scss']
})
export class CardFilterComponent {
  @Input() searchName: string = '';
  @Input() selectedType: string = '';
  @Input() availableTypes: string[] = [];

  @Output() searchNameChange = new EventEmitter<string>();
  @Output() selectedTypeChange = new EventEmitter<string>();

  onSearchNameChange(value: string) {
    this.searchNameChange.emit(value);
  }

  onSelectedTypeChange(value: string) {
    this.selectedTypeChange.emit(value);
  }
}
