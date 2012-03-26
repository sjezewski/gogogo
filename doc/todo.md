# TODO #

## User Configuration ##

- hook in update mechanism (manual / weekly / daily / etc)
- adjust number of suggestions (although chrome may limit it to 5?)

## General ##

- Update parsing logic to play nice weekly pages (X)
- make options page look nice
- Load url in same tab (maybe make user pref as well)
- Add highlighting to the function signatures
- Perhaps overide the default new tab page (to display which host you're pointed at / if the definitions are loaded)
- Can I capture tabs and do tab completion?
- Fix the icon under the 'preferences' page
- Add error handling when fetching fails (e.g. when offline)

## Bugs ##

- When selecting the weekly source:
  - links are messed up (X)
  - it doesn't seem to do a proper substring match on function signatures -- actually problem w other link types not functions (X)
- When I update I think I'm not resetting the entries properly (X)
- Extra urls (that are relative image urls) getting requested when updating