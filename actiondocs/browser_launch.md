 ## Launch browser

You can launch Chrome/Edge browser either headless or visible. You can also specify the size of the browser window.

- `@headless`: an optional value of *headless* which indicates a headless browser.
- `@browsertype`: browser type can either be *chrome* or *edge*
- `@size`: an optional value for the *width* and *height* of the browser window

The matching is case insensitive and must match the entire text from beginning to end.

Example of usage:

- Launch a visible chrome browser

   > `a new chrome browser`

- Launch a headless chrome browser

   > `a new headless chrome browser`

- Launch a visible chrome browser with specified width and height

   > `a new chrome browser 1200,768`

- Launch a visible edge browser with specified width and height

   > `a new edge browser 1200,768`

- Launch a headless chrome browser with specified width and height

   > `a new headless chrome browser 1200,768`

- Launch a headless edge browser with specified width and height

   > `a new headless edge browser 1200,768`