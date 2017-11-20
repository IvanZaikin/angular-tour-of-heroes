import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';

import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HeroService {

    private heroesUrl = 'api/heroes';

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }

    // getHeroes(): Promise<Hero[]> {
    //     return Promise.resolve(HEROES);
    // }
    getHeroes(): Observable<Hero[]> {
        this.log('Fetched heroes');
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                catchError(this.handleError('getHeroes', []))
            );
    }
    // getHeroes(): Promise<Hero[]> {
    //     return this.http.get<Hero[]>(this.heroesUrl).toPromise();
    // }


    // getHero(id: number): Promise<Hero> {
    //     return this.getHeroes()
    //         .then(heroes => heroes.find(hero => hero.id === id));
    // }
    // getHero(id: number): Promise<Hero> {
    //     return this.getHeroes().
    //         then(heroes => heroes.find(hero => hero.id === id));
    // }
    getHero(id: number): Promise<Hero> {
        return this.getHeroes().toPromise().
            then(heroes => heroes.find(hero => hero.id === id));
    }
    // getHero(id: number): Observable<Hero> {
    //     this.messageService.add(`HeroService: fetched hero id=${id}`);
    //     return

    // }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}