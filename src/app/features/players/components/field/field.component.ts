import { Component, OnInit, Input } from '@angular/core';
import {Player} from 'features/players/models';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  @Input() players: Player[];
  avatar:string = '../../../../../assets/empty_profile.png';
  constructor() { 
    console.log('field players : ', this.players)
  }

  ngOnInit() {
  }

}
