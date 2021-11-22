# Business Activity Visualiser (backend)

Back-end of business activity visualiser. Front-end repository: https://github.com/syedtaqi95/business-activity-frontend.

<img src="https://i.imgur.com/OUafG0I.png"/>



## Data cleansing

The *data* folder contains the Python for for data processing and cleansing from the [ONS business activity statistical report](https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/ukbusinessactivitysizeandlocation) from 2021.

The excel file holding the data downloaded is `data/ukbusinessworkbook2021.xlsx`.

The Jupyter notebooks do the following:

- `data/datageography.ipynb` retrieves and processes ONS geographical data for each region
-  `data/datasheets.ipynb` retrives and processes data from each sheet in the excel workbook identified above.

The result of both notebooks is producing `data/businessdatabase2.db`, an SQLite database holding the parsed data from the workbook, and geoJSON data for each geographical entity.

Because the spreadsheet geographical codes are a mix of countries, counties and others, a level system is created so that no selection of geographical areas is duplicated

| Level | Name                                            | Notes                                                 |
| ----- | ----------------------------------------------- | ----------------------------------------------------- |
| 1     | UK                                              |                                                       |
| 2     | Great Britain (GB) and Northern Ireland (NI)    |                                                       |
| 3     | (England and Wales), Scotland, Northern Ireland | England and Wales as a single entity                  |
| 4     | County                                          | England and Wales separate countries                  |
| 5     | Region                                          |                                                       |
| 6     | County                                          | Mix of counties, London boroughs, Unitary Authorities |
| 7     | District                                        |                                                       |

## Server

The root project entry point is `main.js`, a node server providing an API to the front-end to retrieve numeric and geoJSON data from `data/businessdatabase2.db`.

**requests**

Requests are accepted in `post`  format with:

- `level` as an integer, between 1 and 7

Returned is a JSON object with either an error:

- `error` contains error message

or and object: 

- `message`: "success"
- `data`: a geoJSON `FeatureCollection` of each geographical entity at that level, for each feature the `properties` attribute has keys of industry group from table 1 and the value is the summation for that geographical area

# Future Work

At the moment the server is hard coded to use table 1, whereas the database contains data from all 26 tables presented in the spreadsheet. 

Some tables do not have geographical information so rendering on a map would be futile, but for the other tables that do a front-end selector could be created.

However, the geographical information is sometimes in the sheet rows and sometimes in column headers, so this would need to be indicated to the front-end.