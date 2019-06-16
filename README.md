# hydrogen-password

An Electron App for [1Password](https://1password.com) Standalone Vaults.

> This is the solution to agilebit's tepid response to linux users getting a version of the app.
Their solution involved changing from a standalone license, to their subscription model.
Given that 1Password 7 reintroduced the standalone license, but no linux app in sight, and no [workaround](https://discussions.agilebits.com/discussion/66916/1password-and-ubuntu) available since version 6, I decided to take matters into my own hands
This project is only meant to be "good enough", and will immediately discontinue in the event that agilebits ever releases a dedicated debian/linux GUI app.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)

## Installation

* `git clone <repository-url>` this repository
* `cd hydrogen-password`
* `yarn install`

## Running / Development

* `ember electron`
* A window will open starting the app
* the ember devtools are already installed, should you require them.


* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).
* Since there are direct electron imports, this may not work in a normal browser environment.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember electron:test`
* `ember electron:test --server`
* sample `./1Password.opvault` password is `freddy`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Building

* `ember electron:package` - Create binaries (.app, .exe, etc)
* `ember electron:make` - Generate platform specific distributables (installers, distribution packages, etc)
* `ember electron:build` - Build out Ember app with Electron instrumentation (useful for optimizing multi-platform builds)
* `ember electron:assemble` - Assemble Electron application project (useful for debugging builds)

* `ember build` (development)
* `ember build --environment production` (production)


## Major Project Goals

-[ ] Can read from OPVault structures
-[ ] Can update OPVaults
-[ ] Feature Facsimilie with 1Password
-[ ] Long running service in the system tray
-[ ] Integrates with the 1Password Standalone Browser Extension (No clue if technically possible)

### Ideas for future me

1Password sets itself apart from the competition by allowing users to have offline vaults.
This is desireable, but then their products are integrated with dropbox/google drive for syncing.
If this ever became a product of it's own, I thought it would be neat to only use offline sync methods.
This could come in the form of "mobile first", and using the strategies of any data store that allows for replication.
A single mobile device would be the "Primary", as that is likely your most portable device, and each computer is a "Replica".
A short transmission, like bluetooth, direct wifi, NFC, or even a cable, are all potential means of keeping your data offline.
Since these ideas are in their infancy, and not a specific goal of this project, I'm just dumping them here to simmer, and maybe generate interest.

## Further Reading / Useful Links

* [Ember Electron](https://github.com/felixrieseberg/ember-electron)
* [OPVault Design](https://support.1password.com/opvault-design/)
