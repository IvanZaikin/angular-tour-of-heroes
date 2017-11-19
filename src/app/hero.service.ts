import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';

import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';

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
        return this.http.get<Hero[]>(this.heroesUrl);
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
}