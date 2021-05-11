# INCARTI

Manufacture for Autonomy


## Use
Browser application: 
* No installation required
* Progressive web app
  * Use offline
  * Save as an app to home screen or desktop

Desktop application: ([download](https://github.com/irislib/iris-electron/releases), [source code](https://github.com/irislib/iris-electron)):
* Communicate and synchronize with local network peers without Internet access
  * When local peers eventually connect to the Internet, your messages are relayed globally
  * Bluetooth support upcoming
* Opens to background on login: stay online and get message notifications!
* More secure and available: no need to open the browser application from a server.

## Develop
```
git clone https://github.com/irislib/iris-messenger.git
cd iris-messenger
yarn
yarn start
```

or

```
npx serve
```

No build tools! It just serves the `src` directory at http://localhost:8080

Eslint: `yarn eslint src/js/*.js --fix;yarn eslint src/js/components/*.js --fix`
Built with[preact](https://preactjs.com/)

## Privacy
Private messages are end-to-end encrypted, but message timestamps and the number of chats aren't. In a decentralized network this information is potentially available to anyone.

By looking at timestamps in chats, it is possible to guess who are chatting with each other. It is also possible, if not trivial, to find out who are communicating with each other by monitoring data subscriptions on the decentralized database.

In that regard, Iris prioritizes decentralization and availability over perfect privacy.

Profile names, photos and online status are currently public. That can be changed when advanced group permissions are developed.

The application is an unaudited proof-of-concept implementation, so don't use it for security critical purposes.

## Contact
Join our [Discord](https://discord.gg/4Dgf54k).

---

<a href="https://opencollective.com/iris-social/donate" target="_blank">Donante to the Original IRIS project which laid this groundwork for this app</a>

<p>Donante to the Original IRIS project which laid this groundwork for this app - BTC donations: 3GopC1ijpZktaGLXHb7atugPj9zPGyQeST</p>
