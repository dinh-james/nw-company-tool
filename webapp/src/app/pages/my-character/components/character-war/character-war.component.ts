import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { CharacterService } from '../../../../services/character/character.service';
import { UserService } from '../../../../services/user/user.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { Attribute, Character } from '@nw-company-tool/model';

@Component({
  selector: 'app-my-character-war',
  templateUrl: './character-war.component.html',
  styleUrls: ['./character-war.component.css']
})
export class CharacterWarComponent implements OnInit {
  @Input()
  character$!: Observable<Character>;

  equipLoad = new FormControl();
  role = new FormControl();
  primaryWeapon = new FormControl();
  secondaryWeapon = new FormControl();
  gearScoreAbove600 = new FormControl();
  interestedInWar = new FormControl();
  gearScore = new FormControl(0, [Validators.max(999), Validators.min(0)]);

  constructor(
    private characterService: CharacterService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.character$.subscribe((character) => {
      this.gearScore.setValue(+character.GEAR_SCORE);
    });
  }

  save(): void {
    forkJoin([
      //this.characterService.updateAttribute(Attribute.GEAR_SCORE, this.gearScore.value.toString()),
    ]).subscribe(() => this.snackbarService.open('Character saved'));
  }
}
