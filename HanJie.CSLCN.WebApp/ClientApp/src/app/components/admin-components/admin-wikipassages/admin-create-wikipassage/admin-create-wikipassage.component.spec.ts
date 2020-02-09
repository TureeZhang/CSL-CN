/// <reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AdminCreateWikipassageComponent } from './admin-create-wikipassage.component';

let component: AdminCreateWikipassageComponent;
let fixture: ComponentFixture<AdminCreateWikipassageComponent>;

describe('admin-create-wikipassage component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AdminCreateWikipassageComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AdminCreateWikipassageComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});