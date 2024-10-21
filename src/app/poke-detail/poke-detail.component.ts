import { Component,Injectable,Input,OnInit } from '@angular/core';
import { PokeDetail } from '../pokemon';
import { PokeShareInfoService } from '../poke-share-info.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrl: './poke-detail.component.css'
})
export class PokeDetailComponent implements OnInit{

 

  @Input()
  detail ?: PokeDetail;

  constructor(private pokeShareInfo : PokeShareInfoService){
    this.pokeShareInfo.getObservable().subscribe(e => console.log('e' + e))
   
  }

  ngOnInit(): void {
   
  }



}
