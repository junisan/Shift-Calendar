# Shift Calendar

An extremely simple Javascript application that indicates
a worker's shifts through a visually intuitive calendar.
But that may not be a worker and adapt it to your needs.

A colleague asked me for a simple application to see her
work shifts and as another friend is studying programming,
I uploaded this project to GitHub. This means that you
don't expect an incredibly functional application but if
you are looking to learn frontend, you can start from here.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

Clone this repository or download the compressed content
in ZIP and access the root folder of the project

```sh
npm install
./node_modules/.bin/parcel index.html
```

## Usage

The project is packaged with [Parceljs](https://parceljs.org),
so it must be
executed. Parcel will watch the files that change while
we program the CSS, JS or HTML and will translate it to
a "language" that the browser understands.

In the previous section we also installed all the
dependencies that need parcel to work with NPM

When you open the page for the first time, JS will try
to get the JSON file containing the working times. You
can specify the address where they should be consulted
in jsonParser::url (line 6)

The file must have the following format:
```json
[
  {"day":  "2019-03-18", "zone": 0},
  {"day":  "2019-03-20", "zone": 2},
  {"day":  "2019-03-25", "zone": 1}
]
```
Zona indica que turno ha sido asignado al usuario. Siendo 0 un día libre, 1 por la mañana, 2 por la tarde y 3 por la noche. 
Puedes personalizar los colores de cada turno en scss/calendar.scss y las traducciones de los nombres en el fichero js/print.js
Si este formato no se adapta a tus necesidades, puedes cambiarlo.

Feel free to modify any part of the code you want

## Support and Contributing
This application is designed for educational purposes, so it does not offer support at this time.
If you still find something worth improving without losing simplicity, don't hesitate to open a ticket.
