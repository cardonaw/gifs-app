import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsCardComponent implements OnInit {


  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if ( !this.gif ) throw new Error('Gif property is required')

  }
}
