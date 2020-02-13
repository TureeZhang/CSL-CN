/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { WikiListComponent } from './wiki-list.component';

let component: WikiListComponent;
let fixture: ComponentFixture<WikiListComponent>;

describe('wiki-list component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WikiListComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(WikiListComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});