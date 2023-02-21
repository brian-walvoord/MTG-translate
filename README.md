<p align="center"><i>This project was created during my time as a student at Code Chrysalis</i></p>
<br>
<br>

<h1 align="center">MTG (Magic: The Gathering) Translator</h1>

## Table of Contents
- [Features](#features)
- [Necessary Tech](#necessary-tech)
- [Contributors](#contributors)

# Features
* Makes use of Scryfall api to search for Magic: The Gathering cards in English
* Users can select cards to be translated to Japanese
* Translated cards are persisted, so you can translate cards that interest you and not have to search again
* Users can edit their translation lists
* (upcoming) Users will be able to choose which language they want to translate to

# Necessary Tech 
### ‼️ Things you will need:
* [PostgreSQL](https://www.postgresql.org/)
* [Python](https://www.python.org/)
* [Django](https://www.djangoproject.com/)

# App Instructions
Searching for a card will bring up all English cards in the scryfall database that have images. Since this app is all built around a GUI, cards without an image in the database are excluded from results. 

<img alt="search section" width="100%" src="./images/search_section.png"/>

Once users find the card they are looking for, they can simply click on the card and will be notified whether the card has been successfully translated into Japanese or if there is not a Japanese card equivalent available. If the card is available, it will be instantly added to the translated cards section at the top of the page.

<img alt="translation section" width="100%" src="./images/translation_section.png"/>

NOTE: The app only translates initial English search results to Japanese! Future updates will include other languages.

If a user finds a card they no longer want in the translation section, they can simply click on the card and it will be permanently removed from the view. Users are able to go back and add the same card if it was a mistake.

# Tech Explanation
### Frontend
This app was created with a single page React frontend. This also uses vanilla CSS, as the main focus of this project was the backend. The frontend is hosted on the same port as the backend, so you only need to start your Django server and the frontend should be rendered as the default page.
### Backend
The backend is built with Python3 and uses the Django framework. The backend acts as an API for the frontend application, and makes fetch calls to the external api (scryfall). Django then sends the information back to React for rendering. I also am using a simple PostgreSQL database with urls of each translated card.

# Contributors
This was my first solo project with Python3 and Django for backend with a React frontend. Feel free to reach out to me with any questions or comments. I am always looking to improve my skills and love working with others on fun projects!

<a href="https://github.com/brian-walvoord"><img src="https://avatars.githubusercontent.com/u/84251599?v=4" width="200px;" alt=""/><br /></a>

