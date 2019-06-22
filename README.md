![Bundle The Trip Readiness](https://lh3.googleusercontent.com/1KVsbCJ0Z6z7bUxsN6YgSwKtxI5adDgww0q2nP2Lf2i2Jc3Bzcz6mZ8Brpnf0x9yaH9eUPzX2vBD4CjNyZywyFeAssyvyahFW-elfycirHGFxAYVrWNbJAhrcqS9LYiglxg7c4kYJw=w1135-h709-no "Bundle Logo")
# **Bundle**
### _A **mobile-first**, trip-readiness app_
---

Bundle relieves packing worries by showing you what to pack from one place. 
Given the destination and duration of your trip, Bundle will create a customizable packing list.
Once you confirm what you do and don’t need, you can start tracking your packing progress. Bundle also has handy features like creating last-minute todo lists and storing booking information so that you never have to feel like you’ve forgotten something important.

| | Table of Contents|
|:-:|:--:|
|1|**[Getting Started](#getting-started)**|
|2|**[Prerequisites](#prerequisites)**|
|3|**[Usage and Installation](#usage-and-installation)**|
|4||

### **Getting Started**
___
#### Prerequisites
1. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

2. [Bundle Back-End API](https://github.com/aionate0812/bundle_backend) 

*  _**Minimum requirement**_**:**
    - `git clone https://github.com/aionate0812/bundle_backend`
    - **MapQuest API Key**: `https://developer.mapquest.com/documentation/` 
    - **DarkSky API Key**: `https://darksky.net/dev`
    - **Postgres Database**: `https://postgresapp.com/` _we recommend Postgres.app_
    - **Firebase Authentication Config**: 
      * *Docs*: `https://firebase.google.com/docs/auth?authuser=0` 
      * *Console*: `https://console.firebase.google.com/project/_/authentication/users`

#### Usage and Installation
3. In /src rename * **`firebaseConfigExample`** to * **`firebaseConfig`** and replace the Firebase Configurations with your own.

```javascript
export default {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
```

4. In /src rename * **`configExample.json`** to * **`config.json`** and replace the API configurations with your own.

```javascript
// Map Quest API used to parse city name into longitude and latitude coordinates
// Dark Sky API to get the weather 
{
    "MQ_API_KEY":"",
    "DARKSKY_API_KEY":""
}
```

5. `npm install`
