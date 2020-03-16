import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../models';
import {SliderCalloutTrigger, SliderSize, SliderStyle} from '@ux-aspects/ux-aspects';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-player-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {

  @Input() player: Player;
  @Input() isAuthenticated: boolean;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() update: EventEmitter<Player> = new EventEmitter<Player>();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  public _player: Player;
  slider: any;


  constructor() {
  }

  ngOnInit() {
    console.log('is Aut', this.isAuthenticated)
    this._player = {...this.player};
    this.slider = {
      value: 60,
      options: {
        handles: {
          style: SliderStyle.Line,
          callout: {
            trigger: SliderCalloutTrigger.Hover,
            formatter: value => value ? value.toFixed(0) : value
          }
        },
        track: {
          min: 0,
          max: 100,
          height: SliderSize.Narrow,
          ticks: {
            major: {
              steps: 50,

            },
            minor: {
              steps: 5,
            }
          },
          colors: {
            lower: ['#f14a50', '#3BAA43']
          }
        }
      }
    };
  }

  deletePlayer(player: Player) {
    this.delete.emit(player.id);
  }

  handleUpdate(player: Player) {
    console.log(' Update Player: ', player);
    this.update.emit(player);
    this.handleBack();
  }

  handleBack() {
    console.log('handle back');
    this.back.emit();
  }
  handleDelete(player: Player) {
    console.log('handle delete');
    this.delete.emit(player.id);
  }
  sliderChanged($event) {
    console.log('Slider changed: ', Math.floor($event));
    this._player.strength = Math.floor($event);
  }

}
