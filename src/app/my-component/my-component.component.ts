import { Component, OnInit } from '@angular/core';
import { PokeDetail, Pokemon } from '../pokemon';
import { PokeService } from '../poke.service';
import { PokeShareInfoService } from '../poke-share-info.service';


@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.css',
  providers: [PokeService]
 
})
export class MyComponentComponent  implements OnInit{
  searchText: string = '';
  selectedPokemonId : string = '';
  selectedPokemon ?: Pokemon;
  pokemons : Pokemon[] = [];
  pokeDetail ?: PokeDetail ;



  constructor  (private pokeService : PokeService, private pokeShareInfo : PokeShareInfoService){

  }

  ngOnInit(): void {
    this.pokeService.getPokemons().subscribe((data)=>{
      console.log(data)
      data.results.forEach((e:any, index:number) => {
        this.pokemons.push(new Pokemon (""+(index+1),e.name))
        
      });
    });
}
  
  goFun() {
    this.pokeShareInfo.setValue(this.selectedPokemonId)
    if (this.selectedPokemon) {
      this.selectedPokemonId = this.selectedPokemon.id;
      console.log(`Pokémon trouvé : ${this.selectedPokemon.nom} (ID: ${this.selectedPokemon.id})`);
  
     
      this.pokeService.getPokemonsInfo(this.selectedPokemonId)
        .subscribe((data) => {
          this.pokeDetail = data;
          this.pokeShareInfo.setValue(this.selectedPokemonId);
        });
      
        console.log(this.pokeDetail?.sprites.front_default);
        console.log(this.pokeDetail?.sprites.back_default);
        
    }     
    else {
      console.log('Aucun Pokémon trouvé');
    }
   
  }

 

  
}