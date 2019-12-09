import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersContainerComponent } from './players-container.component';

describe('PlayersContainerComponent', () => {
  let component: PlayersContainerComponent;
  let fixture: ComponentFixture<PlayersContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
