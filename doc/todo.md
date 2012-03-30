# TODO #

## User Configuration ##

- adjust number of suggestions (although chrome may limit it to 5?)
- Add custom host to fetch definitions (e.g. localhost which hosts the docs for your current system)

## General ##

- Add highlighting to the function signatures
- Perhaps overide the default new tab page (to display which host you're pointed at / if the definitions are loaded)
  - Maybe I could update it w all the results instead of the first 5
  - Not sure if its really that useful...
- Can I capture `tab`s and do tab completion?
- Add error handling when fetching fails (e.g. when offline)
- It would be better if I sent a message back to the options page when done updating the definitions
  - But I'll still need to poll since I don't want to pass a message for every single update
  - If I have a message listener on the options page I can also handle errors nicely
- Would also be good to have a listener for scheduled updates (so you can watch the option page and dont have to refresh it to see the progress)

## Bugs ##

- Results are messed up after browser restart
- Extra urls (that are relative image urls) getting requested when updating
- If you hit update definitions while its updating ... it thinks its done and won't update again