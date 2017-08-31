# Яндекс.Погода API

Доступно по адресу https://weather-forecast-api.herokuapp.com/

`npm i`

`npm run dev` - запуск сервера в режиме develop

### Запросы к API

* `/settings/categories` (Запрос для изменения, создания и получения настроек категорий пользователя) :
  * **GET**:
  
    * Параметры:
    ```
    login: %username%
    ```
    
    * Ответ:
    ```
    [
      {
        name: %category%,
        enabled: true | false,
      }, 
      {...}
    ] 
    ```
  
  * **POST**:
  
    * Параметры: 
    ```
    login: %username%
    items: [
    {
        name: %categoryName%,
        enabled: true | false,
    }, 
    {...}
    ```
    
    * Ответ:
    ```
    [
      {
        name: %category%,
        enabled: true | false,
      }, 
      {...}
    ] 
    ```
    

* `/v1/alerts` (Запрос для получения alerts по имени пользователся) :

  * **GET**:
  
    * Параметры: 
    ```
    login: %username%
    ```
    
    * Ответ:
    ```
    [
      {
        "id": %unique_id%,
        "text": %text%,
        "text_short": %short_text%,
        "provider": %for example: yandex%,
        "image_url": %image%,
        "source_url": %source url%,
        "push": %push?%,
        "code": %Cate%,
        "significance": %significance%
      },
      {...},
      {...},
    ]
    ```
    
* `/v1/forecast` (Запрос для получения информации о погоде) :

  * **GET**:
  
    * Параметры: нет

    * Ответ:
    ```
    "fact": {
      "condition": %condition%,
      "icon": %icon name%,
      "feels_like": %temperature feels like%,
      "temp": %temperature%,
      "humidity": %humidity%,
      "pressure_mm": %pressure%,
      "wind_speed": %wind speed%,
      "soil_temp": %temperature of soil%
    },
    "geo_object": {
      "locality": {
        "id": %id of locality%,
        "name": %locality name (city)%
      }
    }
    ```
    
