# Yandex Metrika API Library

This library will help you to get data from Yandex Metrika API. It uses mongoose style API to form requests, so if you are using mongo it will be natural to use this library without any issues.

## Start

First install lib:

```bash
npm i yandex-metrika-api
```

To initialize it creates new instance of service:

```javascript
const ym = new YMService('MY_API_TOKEN');
```

Where `MY_API_TOKEN` is your auth token for application. You can read more [here in English](https://tech.yandex.com/metrika/) or [here in Russian](https://yandex.ru/dev/metrika/). From this point you are ready to get data from api. Every request starts with `get` method. After you can use `filter` to filter results and `dimentions` to form report.

```javascript
const { data }: AxiosResponse<IYmResponse & IYmError> = await this.ymService
	.get(dateFrom, dateTo, 'ym:s:visits', 'COUNTER_ID')
	.filter([
		{
			filter: 'ym:s:trafficSourceName',
			operator: '==',
			value: 'Переходы из поисковых систем',
		},
	])
	.dimensions([''])
	.exec();
```

-   **dateFrom** (string) - date in format `YYYY-MM-DD`.
-   **dateTo** (string) - date in format `YYYY-MM-DD`.
-   **metrics** (ymMetrics) - metrics `ym:s:visits` or `ym:s:pageviews` or `ym:s:users`.
-   **COUNTER_ID** (string) - counter id.

## Filter

In `filter` method you pass array of filters:

```javascript
[
	{
		filter: 'ym:s:trafficSourceName',
		operator: '==',
		value: 'Переходы из поисковых систем',
	},
	{
		beforeOperator: 'AND',
		filter: 'ym:s:lastSearchPhrase',
		operator: '!~',
		value: 'brandName',
	},
],
```

-   **beforeOperator** (ymLogicOperator) - `OR` or `AND`. Operator that will connect previous element of array to current. In this example - it will filter with first AND second condition.
-   **filter** (string) - filter name like `ym:s:trafficSourceName` or `ym:s:lastSearchPhrase` or so on. You can read more [here](https://yandex.ru/dev/metrika/doc/api2/concept/about-docpage/).
-   **operator** (ymOperators) - operator between filter and value ([docs](https://yandex.ru/dev/metrika/doc/api2/api_v1/relations/relations-docpage/)).
-   **value** (string) - value to compare with.

## Dimensions

Array of strings in which dimension you want to present results. All dimensions and metrics can be found [here](https://yandex.ru/dev/metrika/doc/api2/api_v1/attrandmetr/dim_all-docpage/).
