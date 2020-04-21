import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../features.state';
import {noop, Observable} from 'rxjs';
import {ActiveTab, Player, TabsName} from '../../models';
import {selectAllPlayers, selectCaderPlayers, selectPlayersArrived} from '../../selectors';
import {PlayersActions} from '../../actions';
import {AuthActions, AuthSelectors} from 'core/auth';
import {PlayersService} from './../../services/players.service';
import {TabsetService} from '@ux-aspects/ux-aspects';
import {filter, map} from 'rxjs/operators';
import {NotificationsService} from '../../services/notifications.service';
import {User} from '../../../../core/auth/auth.models';


@Component({
  selector: 'app-players-container',
  templateUrl: './players-container.component.html',
  styleUrls: ['./players-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersContainerComponent implements OnInit {


  players$: Observable<Player[]>;
  title = 'football-wednesday';
  player: Player;
  caderPlayers$: Observable<Player[]>;
  arrivePlayers$: Observable<Player[]>;
  allPlayers$: Observable<Player[]>;
  benchPlayers$: Observable<Player[]>;
  notification$: Observable<Player[]>;
  lineUpPlayers$: Observable<any>;
  label = 'xx';
  playerDetails: Player;
  isAuthenticated$: Observable<boolean>;
  isAuthenticated: boolean;
  activeTab: string;
  tabs: ActiveTab[] = [{name: TabsName.FIELD, active: true}, {name: TabsName.PLAYERS, active: false}, {
    name: TabsName.DETAILS,
    active: false
  }, {name: TabsName.SETTINGS, active: false}];

  constructor(public store: Store<State>, private notificationsService: NotificationsService,
              private tabsetService: TabsetService, private playersService: PlayersService) {
    this.tabs.forEach((tab: ActiveTab) => {

    });
    this.store.dispatch(PlayersActions.load());
    /* this.playersService.getPlayers().subscribe(r => console.log('Players Firebase : ', r));
     this.playersService.getPlayers().subscribe(data => {
       this.players = data.map(e => {
         return {
           id: e.payload.doc.id,
           ...e.payload.doc.data()
         } as Player;
       })
       console.log('Players: ', this.players);
     });*/
  }


  ngOnInit() {
    // this.store.pipe(select(selectPlayersArrived)).subscribe(players => {
    //   this.players = players.slice(0, 10);
    //   this.benchPlayers = players.slice(10);
    // });
    this.arrivePlayers$ = this.store.pipe(select(selectPlayersArrived), map(players => players.splice(0, 10)));
    this.benchPlayers$ = this.store.pipe(select(selectPlayersArrived), map(players => players.splice(0, 10)));
    this.caderPlayers$ = this.store.pipe(select(selectAllPlayers), map((players) => players.filter((player) =>  player.arrive === false)));
    this.allPlayers$ = this.store.pipe(select(selectAllPlayers));
    this.lineUpPlayers$ = this.store.pipe(select(selectAllPlayers), map((players) => players.filter((player) =>  player.arrive === true)));
    // this.lineUpPlayers$ = this.store.pipe(select(selectPlayersArrived));
    /*this.store.pipe(select(selectAllPlayers)).subscribe(players => {
      this.allPlayers = players;
    });*/
    this.store.pipe(select(AuthSelectors.selectIsAuthenticated)).subscribe(auth => {
      console.log('players container store selector selectIsAuthenticated ', auth);
      this.isAuthenticated = auth;
      this.isAuthenticated ? this.playersService.auth() : noop();
    });
    this.notification$ = this.notificationsService.getMessage();
    //this.notification$.subscribe(x => console.log(' Got message ', x));
  }
  handleUpdate($event: Player) {
    this.store.dispatch(PlayersActions.upsertPlayer({player: $event}));
    // this.store.dispatch(PlayersActions.updatePlayer({player: {id: player.id, changes: {arrive: true}}}));
  }

  handleDetails(player: Player) {
    console.log('player details: ', player);
    this.player = player;
    this.setActiveTab(TabsName.DETAILS);
    this.getActiveTab();

  }

  setActiveTab(tabName: TabsName) {
    this.tabs.forEach((tab: ActiveTab) => {
      if (tab.name === TabsName.DETAILS) {
        tab.active = true;
      } else {
        tab.active = false;
      }
    });
    this.tabs = [].concat(this.tabs);
    console.log('TABS :', this.tabs);
  }

  getActiveTab() {
    const tabActive = this.tabs.find((tab) => tab.active);
    this.activeTab = TabsName[tabActive.name];
    // console.log('active', this.activeTab);
  }

  handleBack() {
    this.tabs.forEach((tab: ActiveTab) => {
      if (tab.name === TabsName.FIELD) {
        tab.active = true;
      } else {
        tab.active = false;
      }
    });
    this.getActiveTab();
    // trigger change detect of tabset component
    this.label = Math.random() + '';
  }

  handleUpdatePlayer($event: Player) {
    this.store.dispatch(PlayersActions.upsertPlayer({player: $event}));
  }

  handleDeletePlayer(playerId: string) {
    this.store.dispatch(PlayersActions.deletePlayer({id: playerId}));
  }

  onSubmit($event: any) {
    this.store.dispatch(AuthActions.authLogin({user: {name: $event.user , password: $event.password }}));
    /*if ($event.user === 'admin' && $event.password === 'admin') {
      console.log('LOGGED IN ');
      this.store.dispatch(AuthActions.authLogin({user: {name: $event.user , password: $event.password }}));
    }*/
  }

  onLogout() {
    this.store.dispatch(AuthActions.authLogout());
  }

  handleShowDetails($event: Player) {
    this.playerDetails = $event;
  }
}
