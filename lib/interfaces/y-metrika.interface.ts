import { Double, Long } from 'bson';

export interface IYmError {
	errors: {
		error_type: string;
		message: string;
		location: string;
	}[];
	code: number;
	message: string;
}

export interface IYmResponse {
	total_rows: number;
	total_rows_rounded: boolean;
	sampled: boolean;
	sample_share: Double;
	sample_size: Long;
	sample_space: Long;
	data_lag: number;
	query: {
		ids: [number];
		timezone: string;
		preset: string;
		dimensions: [string];
		metrics: [string];
		sort: [string];
		date1: string;
		date2: string;
		filters: string;
		limit: number;
		offset: number;
	};
	totals: [Double];
	min: [Double];
	max: [Double];
	data: [
		{
			dimensions: [
				{
					key_1: string;
				}
			];
			metrics: [number];
		}
	];
}

export interface IYmParamer {
	id: string;
	metrics: string;
	date1: string;
	date2: string;
	dimensions?: string;
	filters?: string;
}

export interface IYmRequest {
	oauth_token: string;
	id: string;
	metrics: ymMetrics;
	date1: ymDate;
	date2: ymDate;
}

export interface IYmFilterArray {
	beforeOperator?: ymLogicOperator;
	filter: string;
	operator: ymOperators;
	value: string;
}

export type ymDate = 'yesterday' | 'today' | string;
export type ymMetrics = 'ym:s:visits' | 'ym:s:pageviews' | 'ym:s:users';
export type ymOperators =
	| '=='
	| '>'
	| '<'
	| '>='
	| '<='
	| '=@'
	| '=~'
	| '=*'
	| '!'
	| '='
	| '!='
	| '!@'
	| '!~'
	| '!*'
	| '!.';
export type ymLogicOperator = 'OR' | 'AND';
