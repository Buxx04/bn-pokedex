import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PokemonCard } from '../../models/pokemon-card';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() card!: PokemonCard;
  @Input() showAddButton: boolean = false;
  @Input() showRemoveButton: boolean = false;

  @Output() cardAdded = new EventEmitter<PokemonCard>();
  @Output() cardRemoved = new EventEmitter<PokemonCard>();

  getHappinessWidth(happiness: number | undefined): number {
    if (happiness === undefined) return 0;
    const scaledHappiness = Math.max(0, happiness); 
    return Math.min(scaledHappiness * 10, 100); 
  }

  onAddCard() {
    this.cardAdded.emit(this.card);
  }

  onRemoveCard() {
    this.cardRemoved.emit(this.card);
  }
}
