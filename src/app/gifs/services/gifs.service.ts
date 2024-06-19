import { Gif, SearchResponse } from './../interfaces/gifs.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

// const GIPHY_API_KEY = 'UgbC5o6dXQWumvGD0DrKL4kuOUvinHlX';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'UgbC5o6dXQWumvGD0DrKL4kuOUvinHlX';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready')
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag: string ) {
    tag = tag.toLowerCase();

    if ( this._tagsHistory.includes(tag) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldtag) => oldtag !== tag )
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();


    // if (this._tagsHistory.length > 10) {
    //   this._tagsHistory.pop();
    // }
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void {
    if ( !localStorage.getItem('history') ) return;

    this._tagsHistory= JSON.parse( localStorage.getItem('history')! );
    if (this._tagsHistory.length > 0) {
      this.searchTag(this._tagsHistory[0]) }
  }

  searchTag( tag: string ):void {

    if ( tag.length === 0 ) return;

    this.organizeHistory(tag);


    const params = new HttpParams()
      .set( 'api_key', this.apiKey )
      .set( 'limit', '10' )
      .set( 'q', tag )

    this.http.get<SearchResponse>( `${ this.serviceUrl }/search?`, { params } )
      .subscribe( (resp) => {

        this.gifList = resp.data;

      } );

    // fetch(`https://api.giphy.com/v1/gifs/search?api_key=UgbC5o6dXQWumvGD0DrKL4kuOUvinHlX&q=${ this._tagsHistory[0] }&limit=20`)

  }

}
