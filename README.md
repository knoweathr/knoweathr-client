# knoWeathr-client
This is the client-side of the knoWeathr app.
This site is for educational purposes only, testing our capabilities with API calls and database queries.

**Authors**: Andrew Bloom, Joel Clair, Joy Hou & Will J. Reid
**Version**: 1.0.0

## Overview
This mobile-first web app allows users to identify potential vacation spots based on their preferences for weather temperature and continent.  The site allows a user to save locations as "favorites" in conjunction with a login capability.  If a user is logged in, his/her favorites are saved to his/her profile; if a user is not logged in and tries to save a location, he/she is prompted to log in or register.
The navigation and login experience responds dynamically to device/screen width--on the full browser site, the login form is displayed, but on the mobile display the login workflow is hidden in an icon.  

## Getting Started
The site is deployed at **knoWeathr.com**. Navigate to the site on your desktop or mobile browser.

To work on the site locally, navigate to the organization https://github.com/knoweathr.  You will need to fork and clone the "knoweathr" repo for the server stack, and the "knoweathr-client" repo for the client stack.

## Dependancies
Dependancies are noted in our package.json file in the server stack.  To run the site locally, you will need to install express, fileservice, cors, bodyparser, page.js, postgresql and superagent.

## Architecture
The site uses MVC architecture, and SMACSS best practices for layout and design.  The server stack includes a server.js file to create tables and manage our get requests.  Our airports table is seeded by an airports.json file, serving a curated list of airports that we can incorporate in our API calls.
The client stack utilizes single-page design, with views for search criteria, map results and login behavior that are dynamically hidden and shown.
The site serves results based on expected weather conditions at each location; this data is sourced from Wunderground's developer-level API which allows a maximum of 10 queries per minute and 500 queries per day.  This dictated some structural decisions about our app--we are serving a highly-curated list of airports to be sure that we do not exceed our per-minute query limit.  If we raised funding for the $600/month "Shower" plan pricing, we would be allowed 1000 calls per minute and 100,000 per day, and we could drastically expand our coverage of possible vacation destinations.
When a user performs a search on our site, the site first checks if that search has been performed before by querying the weather table in our database; if the results are available, the site serves those results--if the search has never been run before (in the history of the weather table) the site will call the Wunderground API and receive information about the ten possible airports within the selected continent for the selected month, PUT those values into the weather table, and display the results on screen.
When building the site, we used a postgresql instance to store test data.  We initially deployed the front end to a gh-pages site with a back-end hosted on Heroku.  We have pushed the front end to the knoWeathr.com URL, maintaining a link with the database tables in Heroku.

## Credits and Collaborations
This site would not be possible without the data provided by Weather Underground a.k.a Wunderground.  We are attributing their contributions with an appropriately-sized logo in our footer.
Select data for our curated list of airports was provided by Thomas Reynolds form his repo at https://gist.github.com/tdreyno/4278655.
