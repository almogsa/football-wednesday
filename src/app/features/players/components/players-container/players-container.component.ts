import {Component, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../features.state';
import {Observable} from 'rxjs';
import {ActiveTab, Player, TabsName} from '../../models';
import {selectCaderPlayers, selectPlayersArrived} from '../../selectors';
import {PlayersActions} from '../../actions';
import {TabsetService} from '@ux-aspects/ux-aspects';

@Component({
  selector: 'app-players-container',
  templateUrl: './players-container.component.html',
  styleUrls: ['./players-container.component.scss']
})
export class PlayersContainerComponent implements OnInit {

  players$: Observable<Player[]>;
  title = 'football-wednesday';
  players: Player[];
  player: Player;
  benchPlayers: Player[];
  caderPlayers: Player[];
  label = 'xx';
  @ViewChild('tabsetComponent', {static: true}) someElement;
  activeTab: string;
  tabs: ActiveTab[] = [{name: TabsName.FIELD, active: true}, {name: TabsName.PLAYERS, active: false}, {
    name: TabsName.DETAILS,
    active: false
  }, {name: TabsName.SETTINGS, active: false}];

  constructor(public store: Store<State>, private tabsetService: TabsetService) {
    this.tabs.forEach((tab: ActiveTab) => {
      console.log(tab);

    });
  }


  ngOnInit() {
    this.store.pipe(select(selectPlayersArrived)).subscribe(players => {
      this.players = players.slice(0, 10);
      this.benchPlayers = players.slice(10);
    });
    this.store.pipe(select(selectCaderPlayers)).subscribe(players => {
      this.caderPlayers = players;
    });
    // this.player = {};
  }

  handleUpdate(player: Player) {
    this.store.dispatch(PlayersActions.updatePlayer({player: {id: player.id, changes: {arrive: true}}}));
  }

  handleDetails(player: Player) {
    console.log('player details: ', player);
    this.player = player;
    this.tabs.forEach((tab: ActiveTab) => {
      if (tab.name === TabsName.DETAILS) {
        tab.active =  true;
      } else {
        tab.active =  false;
      }
    });
    this.tabs = [].concat(this.tabs);
    console.log('TABS :', this.tabs);
    this.getActiveTab();

  }

  getActiveTab() {
    const tabActive = this.tabs.find((tab) => tab.active);
    this.activeTab = TabsName[tabActive.name];
    console.log('active', this.activeTab);
  }
  handleBack() {
    this.tabs.forEach((tab: ActiveTab) => {
      if (tab.name === TabsName.FIELD) {
        tab.active =  true;
      } else {
        tab.active =  false;
      }
    });
    this.getActiveTab()
   // this.someElement._tabset.select(this.someElement._tabset.tabs[0])
    // trigger change detect of tabset component
    this.label = Math.random() + '';
  }
}
