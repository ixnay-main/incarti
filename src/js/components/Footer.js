import { Component } from '../lib/preact.js';
import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import Identicon from './Identicon.js';
import Icons from '../Icons.js';

const plusIcon = html`<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>`;

class Footer extends Component {
  constructor() {
    super();
    this.state = {latest: {}};
    this.eventListeners = [];
    this.chatId = null;
  }

  componentDidMount() {
    State.local.get('unseenTotal').on(unseenTotal => {
      this.setState({unseenTotal});
    });
    State.local.get('activeRoute').on(activeRoute => {
      this.eventListeners.forEach(e => e.off());
      this.eventListeners = [];
      this.setState({activeRoute});
      const replaced = activeRoute.replace('/chat/new', '').replace('/chat/', '');
      this.chatId = replaced.length < activeRoute.length ? replaced : null;
    });
  }

  render() {
    const key = Session.getKey().pub;
    const activeRoute = this.state.activeRoute;

    if (this.chatId) {
      return html``;
    }

    return html`
    <footer class="visible-xs-flex nav footer">
      <div class="header-content" onClick=${() => State.local.get('scrollUp').put(true)}>
        <a href="/store" class="btn ${activeRoute && activeRoute === '/store' ? 'active' : ''}"><i class="fas fa-bars"></i></a>
        <a href="/product/new" class="btn ${activeRoute && activeRoute === '/product/new' ? 'active' : ''}"><i class="fas fa-plus"></i></a>
        <a href="/settings/" class="${activeRoute && activeRoute === '/settings/' + key ? 'active' : ''} my-profile">
          <${Identicon} str=${key} width=34 />
        </a>
      </div>
    </footer>`;
  }
}

export default Footer;
