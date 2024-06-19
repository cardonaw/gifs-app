import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazyImage.component.html'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public alt: string = '';

  @Input()
  public url!: string;


  public hasLoaded: boolean = false;



  ngOnInit(): void {
    if( !this.url ) throw new Error('URL Property is required');
  }

  onLoad(): void {
    this.hasLoaded = true;
  }

 }
