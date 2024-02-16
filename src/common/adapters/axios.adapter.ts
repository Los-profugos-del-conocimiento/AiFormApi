import { HttpAdapter } from '../interfaces/http-adapter.interface';
import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';


@Injectable()
export class AxiosAdapter implements HttpAdapter {
    private axios: AxiosInstance = axios;

    async get<T>(url: string, headers?: any): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url, headers);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async post<T>(url: string, body: any, headers?: any): Promise<T> {
        try {
            const { data } = await this.axios.post<T>(url, body, headers);
            return data;
        } catch (error) {
            console.log('ERRROR:', error.response.data.error);
            // console.log('ERRROR:', error.response.data.error.details[0].fieldViolations);
            throw new Error(error);
        }
    }
}