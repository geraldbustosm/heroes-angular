import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(): void {
    this.heroesService.getSugerencias(this.termino)
      .subscribe(heroes => this.heroes = heroes);
  }

  opcionSeleccionada(evento: MatAutocompleteSelectedEvent) : void {

    if(!evento.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = evento.option.value;
    this.termino = heroe.superhero;
    this.heroesService.getHeroePorId(heroe.id!)
      .subscribe(heroe => this.heroeSeleccionado = heroe);
  }

}
