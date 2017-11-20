import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
    selector: 'hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((param: ParamMap) => this.heroService.getHero(+param.get('id')))
            .subscribe(hero => this.hero = hero);
    }

    getHero(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        // this.heroService.getHero(id)
    }

    goBack(): void {
        this.location.back();
    }

}
