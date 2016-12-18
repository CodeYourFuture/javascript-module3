Homework
---

# 11th December
This is an API that provides a list of services available in London.

Buttons for each 'area', when a area button is clicked, you should make a request to download that area's information, then present it on screen.

While the request is happening, you should display a 'loading' indicator (just the word will do).
Once it is completed, remove the 'loading' indicator, and present the results.

To get a list of areas, first make a request to `https://code-your-future.github.io/api-demo/area/index.json`
Using that list, create buttons for each area.
Clicking on of those buttons should then make another request to get that area, and display the results.

To get the data from a specific area, replace `<AREA>` in the below URL, with the area you want to get the data for.
`https://code-your-future.github.io/api-demo/area/<AREA>/index.json`

For example, to get the data for 'All', the URL becomes: `https://code-your-future.github.io/api-demo/area/All/index.json`


It would also be good to see, when a button is pressed and the results shown, if you click the same button again, the results are hidden.
Also if you click another button, it hides the results shown, and shows the new results


## Preparation for next week
Sololearn JS 47 and 50


# 18th December
Expand the homework from last week to include more data.
There are different types of services available, such as Debt, Benefits, Housing etc.
Use a `select` from to be able to choose the type of service to find.
You can get a list of types from this API `https://code-your-future.github.io/api-demo/type/index.json`.
The API works the same as the area API, so you can get all the relevant results from `https://code-your-future.github.io/api-demo/type/<TYPE>/index.json`, by replacing TYPE with a value from the first API.

## Filtering.
Add an `input` form, so that you can filter the results show on screen.
By typing into the filter, it should only show the results that match the name.
You can add more fields if you have time

## Other options
It is possible to not only get results by `area` but by `clients` also.
Add this ability to you application, the API works the same as the area one, but with `clients` instead of `area`.

eg: `https://code-your-future.github.io/api-demo/clients/index.json`


## Fetch and Promises
If we have covered these class, convert your code to make use of `fetch` and `Promises`
