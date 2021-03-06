# Daily exchange
## A Node.js api that returns in real time the daily exchange rate of dollar and euro in kwanzas of all Angolan banks.

With this Api, it will be possible to create apps or currency conversion sites by making currency conversions from any Angolan bank which will help deliver more truthful information to users

The API return: 
    - Dollar and Euro buy prices
    - Dollar and Euro sell prices
    - Dollar and Euro buy price variation
    - Dollar and Euro sell prices variation

### Capture of Json response from request to dayly exchange endpoint
![json response from request](https://github.com/antonio-nicolau/cambio-diario/blob/main/captures_for_readme/daily%20exchange%20capture.PNG)
### Capture of json response from convertion endpoint
![convert money endpoint](https://github.com/antonio-nicolau/cambio-diario/blob/main/captures_for_readme/convert%20endpoint%20capture.PNG)

## How To Use
It's very simple to use

### EndPoints

EndPont | Return
--- | ---
https://cambio-diario.vercel.app/get-exchanges | Return all dayly exchange
https://cambio-diario.vercel.app/convert-money/coin/money/bank | Convert a coin to other directly


## Return all dayly exchang example
### Node.js
```javascript
const axios = require('axios');

axios.get('https://cambio-diario.vercel.app/get-exchanges')
  .then(function (response) {
    console.log(response);
})
```

### PHP
```php
<?php
$url = "https://cambio-diario.vercel.app/get-exchanges";
$response = json_decode(file_get_contents($url));
echo $response;
?>
```

### Python
```python
import requests

r = requests.get('https://cambio-diario.vercel.app/get-exchanges')
if r.status_code == 200:
    print(r.json)
```

## Convert a coin to other directly
### Here you have to pass some params

Params | Mean
--- | ---
coin | Simbol that represent the coin you want to convert ( ao = kwanza, us = dollar, eu = euro )
money | Value you want to convert
bank | Which bank do you want to use daily exchange

### Node.js
```javascript
const axios = require('axios');

axios.get('https://cambio-diario.vercel.app/convert-money/us/100/1')
  .then(function (response) {
    console.log(response);
})
```

### PHP
```php
<?php
$url = 'https://cambio-diario.vercel.app/convert-money/us/100/1';
$response = json_decode(file_get_contents($url));
echo $response;
?>
```

### Python
```python
import requests

r = requests.get('https://cambio-diario.vercel.app/convert-money/us/100/1')
if r.status_code == 200:
    print(r.json)
```
![convert money endpoint](https://github.com/antonio-nicolau/cambio-diario/blob/main/captures_for_readme/convert%20endpoint%20capture.PNG)

## Tools
### Framework: Node.js
### Module: Express, axios, cheerio

## Contribuitions
### This project was developed to help the community, your feedback will be well appreciated. Feel free to contribute
[Linkedin](https://www.linkedin.com/in/ant%C3%B3nio-nicolau-5b7557181/)

[Youtube Channel](https://www.youtube.com/channel/UCEWMpqJBIAjO3Lholi6VsDA)
