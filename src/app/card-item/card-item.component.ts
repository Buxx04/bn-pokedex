import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PokemonCard } from '../service/pokemon-card';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {
  @Input() card!: PokemonCard;
  @Input() showAddButton = false;
  @Input() showRemoveButton = false;

  @Output() add = new EventEmitter<PokemonCard>();
  @Output() remove = new EventEmitter<PokemonCard>();

  onAdd() {
    this.add.emit(this.card);
  }

  onRemove() {
    this.remove.emit(this.card);
  }

  getHappinessWidth(happiness: number | undefined): number {
    if (happiness === undefined || happiness === null) return 0;
    const scaled = Math.max(0, happiness);
    return Math.min(scaled * 10, 100);
  }
}
