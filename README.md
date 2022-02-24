# Conference Web Scrapper

[Demo](#)

## How this works

TODO: fix this
1. 




5. Finally we're merging the data using `node_scripts/merge-data-into-single.js`

It moves the single data into `public/data.json` (with a backup as well)

All that code can be run with one line. `npm run get-json`


6. Within Vue, it fetches that public data file to create the graph.

The graph is built with [ChartJS](https://www.chartjs.org/). (Originally vue-chartjs but [it has issues with Vue3](https://github.com/apertureless/vue-chartjs/issues/695#issuecomment-912446520))


## Project setup

1. Install dependencies (Use node lts)

```
npm install
```



4. Build the project
Compiles and hot-reloads for development
```
npm run serve
```

Compiles and minifies for production
```
npm run build
```

Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## TODO: 

[] - Get scrapper working