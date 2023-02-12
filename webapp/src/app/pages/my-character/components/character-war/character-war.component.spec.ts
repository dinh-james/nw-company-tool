import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterWarComponent } from './character-war.component';

describe('MyCharacterBasicComponent', () => {
  let component: CharacterWarComponent;
  let fixture: ComponentFixture<CharacterWarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterWarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterWarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
