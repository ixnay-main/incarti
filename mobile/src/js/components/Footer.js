import { Component } from '../lib/preact.js';
import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import Identicon from './Identicon.js';
import Icons from '../Icons.js';

const plusIcon = html`<i class="fas fa-plus"></i>`;

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
        <a href="/" class="btn ${activeRoute && activeRoute === '/' ? 'active' : ''}">${Icons.store}</a>
        <a href="/product/new" class="btn ${activeRoute && activeRoute === '/product/new' ? 'active' : ''}">${plusIcon}</a>
        <a href="/profile/${key}" class="${activeRoute && activeRoute === '/profile/' + key ? 'active' : ''} my-profile">
          ${Icons.profile}
        </a>
      </div>
    </footer>`;
  }
}

export default Footer;
