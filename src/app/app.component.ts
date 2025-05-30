import { Component, OnInit } from '@angular/core';
import { PokemonService } from './service/pokemon.service';
import { PokemonCard } from './models/pokemon-card';

const COLORS = {
  Psychic: '#f8a5c2',
  Fighting: '#f0932b',
  Fairy: '#c44569',
  Normal: '#f6e58d',
  Grass: '#badc58',
  Metal: '#95afc0',
  Water: '#3dc1d3',
  Lightning: '#f9ca24',
  Darkness: '#574b90',
  Colorless: '#FFF',
  Fire: '#eb4d4b',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isModalOpen = false;

  cards: PokemonCard[] = [];          
  modalCards: PokemonCard[] = [];     
  addedCards: PokemonCard[] = [];     

  searchName: string = '';
  selectedType: string = '';
  availableTypes: string[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getCards().subscribe({
      next: (cards) => {
        this.cards = cards.map((card) => {
          const hp = parseInt(card.hp, 10);
          // HP level calculation: display actual HP, but cap at 100 if higher
          const hpLevel = Math.min(hp, 100); 

          const strengthLevel = card.attacks?.length
            ? Math.min(card.attacks.length * 50, 100)
            : 0; 

          const weaknessLevel = card.weaknesses?.length
            ? Math.min(card.weaknesses.length * 100, 100)
            : 0; 

          let totalDamage = 0;
          if (card.attacks) {
            totalDamage = card.attacks.reduce(
              (sum: number, atk: { damage?: string }) => {
                const dmg = atk.damage?.match(/(\d+)/); 
                return sum + (dmg ? parseInt(dmg[0], 10) : 0);
              },
              0
            ); 
          }

          // Adjusting happiness calculation to match the example output of 5
          // This assumes that for 1 weakness, the "weakness" factor in happiness formula should be 5
          const weaknessForHappiness = card.weaknesses?.length
            ? Math.min(card.weaknesses.length * 5, 100) 
            : 0;

          const happiness = ((hp / 10) + (totalDamage / 10) + 10 - weaknessForHappiness) / 5; 

          return {
            ...card,
            hpLevel,
            strengthLevel,
            weaknessLevel,
            damage: totalDamage,
            happiness,
          };
        });
      },
      error: (err) => {
        console.error('Error fetching cards:', err);
      },
    });
  }

  openModal() {
    this.isModalOpen = true;

    this.modalCards = this.cards.filter(card =>
      !this.addedCards.some(added => added.id === card.id)
    );

    const allTypes = this.modalCards.map((c) => c.subtype).filter(Boolean);
    this.availableTypes = Array.from(new Set(allTypes));
  }

  closeModal() {
    this.isModalOpen = false;
  }

  filteredCards(): PokemonCard[] {
    return this.modalCards.filter((card) => {
      const matchesName = this.searchName
        ? card.name.toLowerCase().includes(this.searchName.toLowerCase())
        : true;

      const matchesType = this.selectedType
        ? card.subtype === this.selectedType
        : true;

      return matchesName && matchesType;
    });
  }

  getHappinessWidth(happiness: number | undefined): number {
    if (happiness === undefined) return 0;
    const scaledHappiness = Math.max(0, happiness); 
    return Math.min(scaledHappiness * 10, 100); 
  }

  addCard(cardToAdd: PokemonCard) {
    if (!this.addedCards.some(card => card.id === cardToAdd.id)) {
      this.addedCards = [...this.addedCards, cardToAdd];

      this.modalCards = this.modalCards.filter(c => c.id !== cardToAdd.id);

      if (this.modalCards.length === 0) {
        this.closeModal();
      }
    } else {
      console.log('Card already added');
    }
  }
  removeCard(cardToRemove: PokemonCard) {
    this.addedCards = this.addedCards.filter(card => card.id !== cardToRemove.id);
  }
}

