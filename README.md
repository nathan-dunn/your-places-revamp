# Your Places

## How the app works

### Input
The input box expects the user to provide a city and valid state, separated by a comma or a space.  The state can be written out or abbreviated. All input is case insensitive.

If the state is spelled incorrectly or doesn't exist an info alert will be triggered.

The app has no way of knowing if the city provided exists or was spelled correctly and will look it up so long as the state is valid.

Characters other than letters, commas, and spaces will be ignored.  Double spaces will be replaced with single spaces.

## Searches
When a search is submitted the input is parsed into city and state and a string is created.  A request is made to the express server with the search string. The search string is displayed for the user during the search process.

The express server first checks the mongo database to see if the entry already exists.  If it does exist the entry is returned to the frontend.

If the entry doesn't already exist in the database, the express server makes all the necessary requests to the various webpages.  Upon successful requests, the html from the pages is gathered, concatenated, and saved in the mongo database.  Each entry is set to expire after a certain duration so the information doesn't become outdated. The new database entry is then returned to the frontend.

## Data
After a successful search the frontend will receive a large amount of html code.  A new data object is created whereby the property keys represent lines of information (e.g. POPULATION, or MEDIAN HOME PRICE).  The values are created on the fly by scraping the html.

A rendering function then looks through the data object and displays the data to the user.
