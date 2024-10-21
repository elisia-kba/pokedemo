import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expand, Observable, of, reduce } from 'rxjs';
import { PokeDetail, PokeServiceRes } from './pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/'; 
  private totalPokemon = 1000;

  constructor(private http: HttpClient) { }
  
  getPokemons(): Observable<PokeServiceRes> {
    const limit = 100; // Nombre de Pokémon à récupérer par requête
    let offset = 0;

    // Initialiser la première requête
    return this.http.get<PokeServiceRes>(`${this.apiUrl}?limit=${limit}&offset=0`).pipe(
      expand((res: PokeServiceRes) => {
        offset += limit;

        // On verifie si le maximum de pokemon à reccuper est atteint
        if (offset < this.totalPokemon && res.next) {
          return this.http.get<PokeServiceRes>(`${res.next}&limit=${limit}&offset=${offset}`);
        } else {
          return of();
        }
      }),
      // Utilise `reduce` pour combiner tous les résultats
      reduce((acc: PokeServiceRes, res: PokeServiceRes) => {
        return {
          count: res.count, 
          next: res.next,   
          previous: null,   
          results: acc.results.concat(res.results), 
        };
      }, { count: 0, next: '', previous: null, results: [] }) 
    );
  }

  getPokemonsInfo(id : string): Observable<PokeDetail> {
    return this.http.get<PokeDetail>(this.apiUrl + id + '/');
  }
}
