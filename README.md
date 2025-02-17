# Alfa Bot

## Overview

Alfa Bot is a feature-rich Telegram bot built with Node.js that provides multiple utility functions through simple commands. It integrates various APIs to deliver weather updates, news, translations, cryptocurrency prices, and more. The bot offers both fun features like jokes and dice rolls, as well as practical tools like reminders and currency conversion.

This bot is designed to be easy to deploy and maintain, with a straightforward setup process and clear documentation. It uses modern JavaScript practices and relies on well-maintained npm packages for core functionality.

## Features

The following features are implemented in the `index.js` file:

- ** 1**: Description of feature 1.
    - `/help`: Provides help information.
    - `/admin`: Admin commands.
    - `/weather`: Fetches weather information.
    - `/news`: Provides the latest news.
    - `/translate`: Translates text.
    - `/crypto`: Fetches cryptocurrency prices.
    - `/joke`: Tells a joke.
    - `/remind`: Sets a reminder.
    - `/quote`: Provides a random quote.
    - `/fact`: Provides a random fact.
    - `/dice`: Rolls a dice.
    - `/covid`: Provides COVID-19 statistics.
    - `/Currencyconvert`: Converts currency.
    - `/reverse`: Reverses text.
    - `/toss`: Tosses a coin.
    - `/echo`: Echoes back the message.

## Software Versions

- **Node.js**: v14.17.0
- **NPM**: v6.14.13

## Required Packages

The following npm packages are required for this project:

- `node-telegram-bot-api`: A library to interact with the Telegram Bot API.
- `axios`: A promise-based HTTP client for making API requests.
- `dotenv`: A module to load environment variables from a `.env` file.
- `moment`: A library for parsing, validating, manipulating, and formatting dates.
- `node-fetch`: A light-weight module that brings `window.fetch` to Node.js.
- `cheerio`: A fast, flexible, and lean implementation of core jQuery designed specifically for the server.

You can install all the required packages using the following command:
```sh
npm install node-telegram-bot-api axios dotenv moment node-fetch cheerio
```

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/zbs1910/Alfa_bot.git
    ```
2. Install the required packages:
    ```sh
    npm install
    ```
3. Create a `.env` file and add your Telegram bot token:
    ```env
    TELEGRAM_BOT_TOKEN=your-telegram-bot-token

    ```
4. Run the bot:
    ```sh
    node index.js
    ```

## APIs Used

The following APIs are used in this project:

- **Weather API**: Fetches weather information.
- **News API**: Provides the latest news.
- **Translation API**: Translates text.
- **Cryptocurrency API**: Fetches cryptocurrency prices.
- **Joke API**: Provides random jokes.
- **Quote API**: Provides random quotes.
- **Fact API**: Provides random facts.
- **COVID-19 API**: Provides COVID-19 statistics.
- **Currency Conversion API**: Converts currency.

## Getting API Keys

To use these APIs, you need to obtain API keys. Here are the steps to get them for free:

1. **Weather API**:
    - Visit [OpenWeatherMap](https://openweathermap.org/api).
    - Sign up for a free account.
    - Generate an API key from the dashboard.

2. **News API**:
    - Visit [NewsAPI](https://newsapi.org/).
    -=

3. **Translation API**:
    - Visit [Google Cloud Translation](https://cloud.google.com/translate).
   

4. **Cryptocurrency API**:
    - Visit [CoinGecko](https://www.coingecko.com/en/api).
   
5. **Joke API**:
    - Visit [JokeAPI](https://jokeapi.dev/).
    - No API key required for free usage.

6. **Quote API**:
    - Visit [Quotable](https://quotable.io/).
    - No API key required for free usage.

7. **Fact API**:
    - Visit [NumbersAPI](http://numbersapi.com/).
    - No API key required for free usage.

8. **COVID-19 API**:
    - Visit [COVID-19 API](https://covid19api.com/).
    - No API key required for free usage.

9. **Currency Conversion API**:
    - Visit [ExchangeRate-API](https://www.exchangerate-api.com/).
   
    ## Conclusion

    Alfa Bot is a versatile and powerful Telegram bot that leverages Node.js and various APIs to provide a wide range of functionalities. From fetching weather information to translating text and providing the latest news, Alfa Bot aims to enhance user interaction and automate tasks efficiently. By following the setup instructions and obtaining the necessary API keys, you can easily deploy and customize this bot to suit your needs. 
    
    Happy coding....!