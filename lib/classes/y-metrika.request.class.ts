import { IYmFilterArray, IYmParamer, IYmRequest, IYmResponse, IYmError } from '../interfaces/y-metrika.interface';
import { AxiosResponse } from 'axios';
import axios from 'axios';

export const YM_API: string = 'https://api-metrika.yandex.ru/stat/v1/data?';

export class YMRequest {
	request: IYmParamer;
	TOKEN: string;

	constructor(request: IYmRequest) {
		this.TOKEN = request.oauth_token;
		this.request = {
			id: request.id,
			date1: request.date1.toString(),
			date2: request.date2.toString(),
			metrics: request.metrics,
		};
	}

	public filter(filters: IYmFilterArray[]) {
		this.request = { ...this.request, filters: this.getFiltersString(filters) };
		return this;
	}

	public dimensions(dimensions: string[]) {
		this.request = { ...this.request, dimensions: dimensions.join(',') };
		return this;
	}

	public async exec(): Promise<AxiosResponse<IYmResponse & IYmError>> {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${this.TOKEN}`,
		};
		return axios.get<IYmResponse & IYmError>(YM_API, { params: this.request, headers });
	}

	private getFiltersString(filters: IYmFilterArray[]): string {
		let text: string = '';
		for (const filter of filters) {
			let beforeOperator: string;
			if (filter.beforeOperator) {
				beforeOperator = filter.beforeOperator;
			} else {
				beforeOperator = '';
			}
			text += `${beforeOperator} ${filter.filter}${filter.operator} '${filter.value}'`;
		}
		return text;
	}
}
