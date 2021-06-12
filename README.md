# IXNAY

Upload and share blueprints for products.
Forked from <a href='https://github.com/irislib/iris-electron/releases'>IRIS</a> 
* No phone number or signup required. Just type in your name or alias and go!
* Secure: It's open source. Users can validate that big brother doesn't read your private messages.
* Available: It works offline-first and is not dependent on any single centrally managed server. Users can even connect directly to each other.

![SCREEN](https://user-images.githubusercontent.com/81891724/121768266-85d65c00-cbb1-11eb-832e-b814b4b1b469.png)<br/>
## Use
Browser application: [incarti.vercel.app/src/#/](https://incarti.vercel.app/src/#/)
* No installation required
* Progressive web app
  * Use offline

## Develop
```
npx serve
```
or
```
git clone https://github.com/irislib/iris-messenger.git
cd iris-messenger
yarn
yarn start

```

No build tools! It just serves the `src` directory at http://localhost:8080

Eslint: `yarn eslint src/js/*.js --fix;yarn eslint src/js/components/*.js --fix`

Usingse [preact](https://preactjs.com/).

## Privacy
Private messages are end-to-end encrypted, but message timestamps and the number of chats aren't. In a decentralized network this information is potentially available to anyone.

By looking at timestamps in chats, it is possible to guess who are chatting with each other. It is also possible, if not trivial, to find out who are communicating with each other by monitoring data subscriptions on the decentralized database.

In that regard, Iris prioritizes decentralization and availability over perfect privacy.

Profile names, photos and online status are currently public. That can be changed when advanced group permissions are developed.

The application is an unaudited proof-of-concept implementation, so don't use it for security critical purposes.

## Contact
Join our [Discord](https://discord.gg/MNtpJ9eHBS).
---

<a href="https://opencollective.com/iris-social/donate" target="_blank">Donate to Marti, the builder or IRIS at this link or at this BTC address: 3GopC1ijpZktaGLXHb7atugPj9zPGyQeST</a>
