import { Component, Input, OnInit } from '@angular/core';
import { PokeDetail, Pokemon } from '../pokemon';
import { PokeShareInfoService } from '../poke-share-info.service';
import { PokeService } from '../poke.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.css']
})
export class PokeDetailComponent implements OnInit {
  @Input() detail?: PokeDetail; // Détails du Pokémon
  selectedPokemonId: string = ''; // ID actuel du Pokémon
  pokemons: Pokemon[] = []; // Liste des Pokémon

  constructor(private pokeShareInfo: PokeShareInfoService, private pokeService: PokeService) {}

  ngOnInit(): void {
    // Écoute des changements de selectedPokemonId via le pokeShare
    this.pokeShareInfo.getObservable().subscribe((id: string) => {
      this.selectedPokemonId = id;
      this.loadPokemonDetail(); // Charge les détails lorsque l'ID change
    });

    // Récupérer la liste des Pokémon
    this.pokeService.getPokemons().subscribe((data) => {
      data.results.forEach((e: any, index: number) => {
        this.pokemons.push(new Pokemon('' + (index + 1), e.name));
      });
    });
  }

  // Charge les détails du Pokémon sélectionné
  loadPokemonDetail() {
    if (this.selectedPokemonId) {
      this.pokeService.getPokemonsInfo(this.selectedPokemonId).subscribe((data) => {
        this.detail = data;
      });
    }
  }

  // Fonction pour passer au Pokémon suivant
  nextPokemon() {
    const currentIndex = this.pokemons.findIndex(p => p.id === this.selectedPokemonId);
    if (currentIndex < this.pokemons.length - 1) {
      const nextPokemon = this.pokemons[currentIndex + 1];
      this.pokeShareInfo.setValue(nextPokemon.id); // Partage l'ID du Pokémon suivant
    }
  }

  // Fonction pour revenir au Pokémon précédent
  prevPokemon() {
    const currentIndex = this.pokemons.findIndex(p => p.id === this.selectedPokemonId);
    if (currentIndex > 0) {
      const prevPokemon = this.pokemons[currentIndex - 1];
      this.pokeShareInfo.setValue(prevPokemon.id); // Partage l'ID du Pokémon précédent
    }
  }

  // Fonction pour obtenir la couleur en fonction du premier type du Pokémon
  getBackgroundColor(): string {
    if (this.detail?.types && this.detail.types.length > 0) {
      const primaryTypeName = this.detail.types[0].type.name;
      switch (primaryTypeName.toLowerCase()) {
        case 'grass': return '#78C850';
        case 'fire': return '#F08030';
        case 'water': return '#6890F0';
        case 'electric': return '#F8D030';
        case 'ice': return '#98D8D8';
        case 'fighting': return '#C03028';
        case 'poison': return '#A040A0';
        case 'ground': return '#E0C068';
        case 'flying': return '#A890F0';
        case 'psychic': return '#F85888';
        case 'bug': return '#A8B820';
        case 'rock': return '#B8A038';
        case 'ghost': return '#705898';
        case 'dragon': return '#7038F8';
        case 'dark': return '#705848';
        case 'steel': return '#B8B8D0';
        case 'fairy': return '#EE99AC';
        case 'normal': return '#A8A878';
        default: return '#F5F5F5';
      }
    }
    return '#F5F5F5';
  }
}
