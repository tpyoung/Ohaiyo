
# Ohaiyo 
##### A 'smart' alarm clock built on React Native with a Firebase database and APIs from [Openweather](https://openweathermap.org/api), [News API](https://newsapi.org/), and [Google Maps] (https://developers.google.com/maps/)
___

![isometric mockup](https://user-images.githubusercontent.com/13547790/29838491-2e89f18a-8cb0-11e7-84f2-24c46976ef90.png)

##  Features:
 * Alarm based on REM cycles (select a time nearest to when you'd like to wake)
 * Dream notepad to record what you remember as quickly as possible
 * Traffic time to work with map integration 
 * Weather widget 
 * Top news articles from BBC

## Get it Running: 

Before you start you'll want to get API keys from Openweather, Firebase, and Newsapi


once you have your API keys, the project cloned and npm install has been run, create the files structure shown below.

    src
    └─── api
    │    │  configs.js (firebase credentials)
    │    │  newsConfig.js
    │    │	trafficConfig.js
    │    │  weatherConfig.js


Then put the keys you received in the format below within each pertaining file.
>module.export = 'abcdefg1234567'

 
The project should now be able to run in the emulator or on your phone!   
