/// <reference path="../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AdminWikipassagesComponent } from './admin-wikipassages.component';

let component: AdminWikipassagesComponent;
let fixture: ComponentFixture<AdminWikipassagesComponent>;

describe('admin-wikipassages component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AdminWikipassagesComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AdminWikipassagesComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});