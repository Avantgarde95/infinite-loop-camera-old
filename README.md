# infinite-loop-camera

Simple camera app for infinite loop coding

## How to run

Must install

- [Node.js](https://nodejs.org/)
- [yarn (yarn classic)](https://classic.yarnpkg.com/en/docs/install)

Recommended to install

- [React devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko)
- [VSCode Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Install the dependencies

- Run `yarn`

Run in the development mode

- Run `yarn dev`
- Open <http://localhost:3000> on the browser

Check the code

- Run `yarn lint`
- Run `yarn lint` to check & fix

## Logs in the production mode

- The app doesn't print the logs on the console in the production mode.
- But, if you add `debug` parameter to the URL (ex. `https://...com/?debug`),
  the app will print the logs

## Testing on mobile device

In some browsers (ex. Chrome), the app requires **HTTPS connection**.
So if you access the dev. server with your phone, some features might not work.

Install [ngrok](https://ngrok.com/) and run `ngrok http 3000` in the other terminal.
It will generate a HTTPS url (ex. `https://...ngrok.io`). Open that URL with your phone.
