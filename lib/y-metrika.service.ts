import { ymDate, ymMetrics } from './interfaces/y-metrika.interface';
import { YMRequest } from './classes/y-metrika.request.class';

export class YMService {
	TOKEN = '';
	constructor(yandexMetrikaAPIToken: string) {
		this.TOKEN = yandexMetrikaAPIToken;
	}
	get(dateFrom: ymDate, dateTo: ymDate, metrics: ymMetrics, id: string): YMRequest {
		return new YMRequest({
			date1: dateFrom,
			date2: dateTo,
			metrics,
			id,
			oauth_token: this.TOKEN,
		});
	}
}
