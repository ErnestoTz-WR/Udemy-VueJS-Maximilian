# 12 Sending HTTP request

## Useful links:

- [More about REST APIs](https://academind.com/learn/node-js/building-a-restful-api-with/what-is-a-restful-api-/)
- [How the web works](https://academind.com/learn/web-dev/how-the-web-works/)
- [Using Axios](https://github.com/axios/axios)
- [Google Firebase](https://console.firebase.google.com)

## Firebase Backend notes

1. Create a realtime database on the dashboard. Make sure to have it on test mode.
2. Copy the url into the `fetch` method and add the title of the file + `.json`. This is required by Firebase.
3. Keep in mind the type of data we are using (JSON object, string, etc.) We would need to convert the received data into whatever type is needed.
4. To send data we need to change the default behavior of `fetch` by defining a method, header and body:

```JavaScript
fetch(
  'https://vue-http-requests-387f8-default-rtdb.europe-west1.firebasedatabase.app/surveys.json',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: this.enteredName,
      rating: this.chosenRating,
    }),
  }
);
```

## Displaying a Loading spinner when waiting for data


## Fixing HTTP errors with try-catch
