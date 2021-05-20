import Helpers, { html } from '../Helpers.js';
import State from '../State.js';
import PublicMessageForm from '../components/PublicMessageForm.js';
import Identicon from '../components/Identicon.js';
import FollowButton from '../components/FollowButton.js';
import CopyButton from '../components/CopyButton.js';
import MessageFeed from '../components/MessageFeed.js';
import Session from '../Session.js';
import View from './View.js';

class Home extends View {
  constructor() {
    super();
  }




  renderView() {
    return html`
      <div class="centered-container">
        <h1>Hello World</h1>
      </div>
    `;
  }
}

export default Home;
