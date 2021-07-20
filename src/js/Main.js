import { render } from './lib/preact.js';
import { Router, route } from './lib/preact-router.es.js';
import { createHashHistory } from './lib/history.production.min.js';
import { Component } from './lib/preact.js';
import { Link } from './lib/preact.match.js';

import Helpers from './Helpers.js';
import { html } from './Helpers.js';
import QRScanner from './QRScanner.js';
import PeerManager from './PeerManager.js';
import Session from './Session.js';
import { translate as t } from './Translation.js';

import Settings from './views/Settings.js';
import LogoutConfirmation from './views/LogoutConfirmation.js';

import Chat from './views/Chat.js';
import Pricing from './views/Pricing.js';

import Store from './views/Store.js';
import Checkout from './views/Checkout.js';
import Product from './views/Product.js';
import Login from './views/Login.js';

import Home from './views/Home.js';

import Profile from './views/Profile.js';
import Group from './views/Group.js';
import Message from './views/Message.js';
import Follows from './views/Follows.js';
import About from './views/About.js';
import Orders from './views/Orders.js';

import Explorer from './views/Explorer.js';
import Contacts from './views/Contacts.js';
import Torrent from './views/Torrent.js';

import VideoCall from './components/VideoCall.js';
import Identicon from './components/Identicon.js';
import Footer from './components/Footer.js';
import State from './State.js';
import Icons from './Icons.js';

var settingsIcon = html`<i class="fas fa-cog"></i>`

const userAgent = navigator.userAgent.toLowerCase();
const isElectron = (userAgent.indexOf(' electron/') > -1);
if (!isElectron && ('serviceWorker' in navigator)) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js')
    .catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

var orderSvg = html`<i class="fas fa-level-up-alt" ></i>`
var folderSvg = html`<i class="far fa-folder"></i>`
var chatSvg = html`<i class="far fa-comment-alt"></i>`
var profileSvg = html`<i class="far fa-user"></i>`
var ixnayText = html`<h1 style="font-family: arialBlack; font-size: 2em;margin-top: -0.5em; margin-bottom: 0px; z-index: 100">IXNAY</h1>`

State.init();
Session.init({autologin: window.location.hash.length > 2});
PeerManager.init();

Helpers.checkColorScheme();

const APPLICATIONS = [ // TODO: move editable shortcuts to localState gun
  {url: '/', text: ixnayText, icon: Icons.home , classCss: "null"},

  {url: '/store', text: folderSvg, icon: Icons.store , classCss: "null"},
  {url: '/orders', text: orderSvg, icon: Icons.store , classCss: "null"},
  {url: '/chat', text: chatSvg, icon: Icons.store , classCss: "null"},



];

const APPLICATIONSSECOND = [ // TODO: move editable shortcuts to localState gun

  {url: '/settings', text: settingsIcon, icon: Icons.settings , classCss: "profile"},
  {url: '/profile', text: profileSvg, icon: Icons.settings, classCss: "profile"},


];



class Menu extends Component {
  componentDidMount() {
    State.local.get('unseenTotal').on(unseenTotal => {
      this.setState({unseenTotal});
    });
  }

  menuLinkClicked() {
    State.local.get('toggleMenu').put(false);
    State.local.get('scrollUp').put(true);
  }

  render() {
    const pub = Session.getPubKey();
    return html`
      <div class="application-list ">

        <div class="visible-xs-block">
          <${Link} onClick=${() => this.menuLinkClicked()} activeClassName="active" href="/profile/${pub}">
            <span class="icon"><${Identicon} str=${pub} width=40/></span>
            <span class="text" style="font-size: 1.2em;border:0;margin-left: 7px;"><iris-text user="${pub}" path="profile/name" editable="false"/></span>
          <//>
          <br/><br/>
        </div>

        ${APPLICATIONS.map(a => {
          if (a.url) {
            return html`
              <${a.native ? 'a' : Link} class="flex " onClick=${() => this.menuLinkClicked()} activeClassName="active" href=${a.url}>

                <span class="text right ${a.classCss}">${a.text}</span>
              <//>`;
          } else {
            return html`<br/><br/>`;
          }
        })}

        <div class="flex-auto"></div>

        ${APPLICATIONSSECOND.map(b => {
          if (b.url) {
            return html`
              <${b.native ? 'a' : Link} class="flex " onClick=${() => this.menuLinkClicked()} activeClassName="active" href=${b.url}>

                <span class="text right ${b.classCss}">${b.text}</span>
              <//>`;
          } else {
            return html`<br/><br/>`;
          }
        })}
      </div>
    `;
  }
}

class Main extends Component {
  componentDidMount() {
    State.local.get('loggedIn').on(loggedIn => this.setState({loggedIn}));
    State.local.get('toggleMenu').put(false);
    State.local.get('toggleMenu').on(show => this.toggleMenu(show));
    State.electron && State.electron.get('platform').on(platform => this.setState({platform}));
  }

  handleRoute(e) {
    let activeRoute = e.url;
    if (!activeRoute && window.location.hash) {
      return route(window.location.hash.replace('#', '')); // bubblegum fix back navigation
    }
    document.title = 'IXNAY';
    if (activeRoute && activeRoute.length > 1) { document.title += ' - ' + Helpers.capitalize(activeRoute.replace('/', '')); }
    State.local.get('activeRoute').put(activeRoute);
    QRScanner.cleanupScanner();
  }

  onClickOverlay() {
    if (this.state.showMenu) {
      this.setState({showMenu: false});
    }
  }

  toggleMenu(show) {
    this.setState({showMenu: typeof show === 'undefined' ? !this.state.showMenu : show});
  }

  electronCmd(name) {
    State.electron.get('cmd').put({name, time: new Date().toISOString()});
  }

  render() {
    let content = '';
    const isDesktopNonMac = this.state.platform && this.state.platform !== 'darwin';
    if (this.state.loggedIn || window.location.hash.length <= 2) {
      content = this.state.loggedIn ? html`
        ${isDesktopNonMac ? html`
          <div class="windows-titlebar">
               <img src="img/iris_logotype.png" height=16 width=28 />
               <div class="title-bar-btns">
                    <button class="min-btn" onClick=${() => this.electronCmd('minimize')}>-</button>
                    <button class="max-btn" onClick=${() => this.electronCmd('maximize')}>+</button>
                    <button class="close-btn" onClick=${() => this.electronCmd('close')}>x</button>
               </div>
          </div>
        ` : ''}
        <section class="main ${isDesktopNonMac ? 'desktop-non-mac' : ''} ${this.state.showMenu ? 'menu-visible-xs' : ''}" style="flex-direction: row;">
          <${Menu}/>
          <div class="overlay" onClick=${e => this.onClickOverlay(e)}></div>
          <div class="view-area">
            <${Router} history=${createHashHistory()} onChange=${e => this.handleRoute(e)}>
              <${Home} path="/"/>
              <${Home} path="/home"/>

              <${Login} path="/login"/>
              <${Chat} path="/chat/:id?"/>

       

              <${Message} path="/post/:hash"/>
              <${Torrent} path="/torrent/:id"/>
              <${About} path="/about"/>
              <${Pricing} path="/pricing"/>

              <${Settings} path="/settings"/>
              <${LogoutConfirmation} path="/logout"/>
              <${Profile} path="/profile/:id?" tab="profile"/>
              <${Profile} path="/replies/:id?" tab="replies"/>
              <${Profile} path="/likes/:id?" tab="likes"/>
              <${Group} path="/group/:id?"/>

              <${Store} path="/store/:store?"/>

              <${Orders} path="/orders/:orders?"/>

              <${Checkout} path="/checkout/:store?"/>
              <${Product} path="/product/:product/:store"/>
              <${Product} path="/product/new" store=Session.getPubKey()/>
              <${Explorer} path="/explorer/:node"/>
              <${Explorer} path="/explorer"/>
              <${Follows} path="/follows/:id"/>
              <${Follows} followers=${true} path="/followers/:id"/>
              <${Contacts} path="/contacts"/>
            </${Router}>
          </div>
        </section>
        <${Footer}/>
        <${VideoCall}/>
      ` : html`<${Login}/>`;
    }
    return html`
      <div id="main-content">
        ${content}
      </div>
    `;
  }
}

render(html`<${Main}/>`, document.body);

document.body.style = 'opacity:1';

Helpers.showConsoleWarning();
