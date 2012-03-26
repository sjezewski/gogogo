# TODO #

## User Configuration ##

- add options page (X)
- report last update time (X)
- add 'update' button on options page
- point at stable / weekly
- hook in user defined options when updating
  - send config in message to background page
  - make a request listener on background page that responds w the current settings
- get options page to pass message to background page when source has changed / update requested (this is better than lazy loading)
- adjust update mechanism (manual / weekly / daily / etc)
- adjust number of suggestions (although chrome may limit it to 5?)

## General ##

- Update parsing logic to play nice weekly pages
- make options page look nice
- Load url in same tab (maybe make user pref as well)
- Add highlighting to the function signatures
- Perhaps overide the default new tab page (to display which host you're pointed at / if the definitions are loaded)
