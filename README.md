# Daily exchange
## An api that returns in real time the daily exchange rate of dollar and euro in kwanzas of all Angolan banks.

With this Api, it will be possible to create apps or currency conversion sites by making currency conversions from any Angolan bank which will help deliver more truthful information to users

The API return: 
    - Dollar and Euro buy prices
    - Dollar and Euro sell prices
    - Dollar and Euro buy price variation
    - Dollar and Euro sell prices variation

### Picture of Json response from request to API below
![json response from request](https://github.com/antonio-nicolau/cambio-diario/blob/main/daily%20exchange%20picture.PNG)

## How To Use
It's very simple to use, you just must make request to url below, it will return a json list containning the results

[dayly exchange](https://cambio-diario-cihhhwikl.vercel.app/get-exchanges)

## Examples
### Node.js
```javascript
const axios = require('axios');

axios.get('https://cambio-diario-cihhhwikl.vercel.app/get-exchanges')
  .then(function (response) {
    console.log(response);
})
```

### PHP
```php
<?php
$url = "https://cambio-diario-cihhhwikl.vercel.app/get-exchanges";
$response = json_decode(file_get_contents($url));
echo $response;
?>
```

### Python
```python
import requests

r = requests.get('https://api.github.com/user', auth=('user', 'pass'))
if r.status_code == 200:
    print(r.json)
```

## Contribuitions
### This project was developed to help the community, your feedback will be well appreciated. Feel free to contribute
[Linkedin](https://www.linkedin.com/in/ant%C3%B3nio-nicolau-5b7557181/)

[Youtube Channel](https://www.youtube.com/channel/UCEWMpqJBIAjO3Lholi6VsDA)
