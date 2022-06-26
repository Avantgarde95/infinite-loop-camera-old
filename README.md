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

Generate the static website

- Run `yarn build`
- Run `yarn export`

Check the code

- Run `yarn lint`
- Run `yarn lint` to check & fix

## Testing on mobile device

In some browsers (ex. Chrome), WebRTC requires HTTPS connection.  
So if you use the test server with your phone, camera feature won't work in some cases.  
Then, install [ngrok](https://ngrok.com/) and run `ngrok http 3000` in the other terminal.  
It will generate a HTTPS url (ex. `https://...ngrok.io`). Open that URL with your phone.
