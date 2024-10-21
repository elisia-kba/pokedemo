import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyComponentComponent } from './my-component/my-component.component';
import { FormsModule } from '@angular/forms';
import { FilterPokemonPipePipe } from './filter-pokemon--pipe.pipe';
import { PokeService } from './poke.service';
import { PokeDetailComponent } from './poke-detail/poke-detail.component';

@NgModule({
  
  declarations: [
    AppComponent,
    MyComponentComponent,
    FilterPokemonPipePipe,
    PokeDetailComponent
  ],
  imports: [
    FormsModule, //Line to add
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [PokeService] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
