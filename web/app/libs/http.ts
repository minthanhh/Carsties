import { getTokenWorkaround } from '../actions/authAction'

class Http {
    private readonly baseUrl: string = 'http://localhost:6001/'

    public async get(url: string) {
        const requestOptions = { method: 'GET', headers: await this.getHeaders() }
        const response = await fetch(this.baseUrl + url, requestOptions)
        return await this.handleRespone(response)
    }
    public async post(url: string, body: {}) {
        const requestOptions = { method: 'POST', headers: await this.getHeaders(), body: JSON.stringify(body) }
        const response = await fetch(this.baseUrl + url, requestOptions)
        return await this.handleRespone(response)
    }
    public async put(url: string, body: {}) {
        const requestOptions = { method: 'PUT', headers: await this.getHeaders(), body: JSON.stringify(body) }
        const response = await fetch(this.baseUrl + url, requestOptions)
        return await this.handleRespone(response)
    }
    public async del(url: string) {
        const requestOptions = { method: 'DELETE', headers: await this.getHeaders() }
        const response = await fetch(this.baseUrl + url, requestOptions)
        return await this.handleRespone(response)
    }
    private async getHeaders() {
        const token = await getTokenWorkaround()
        const headers = { 'Content-Type': 'application/json' } as any
        if (token) headers['Authorization'] = `Bearer ${token.access_token}`
        return headers
    }
    private async handleRespone(response: Response) {
        const text = await response.text()
        const data = text && JSON.parse(text)
        if (response.ok) {
            return data || response.statusText
        } else {
            const error = {
                message: response.statusText,
                status: response.status,
            }
            return { error }
        }
    }
}
export const http = new Http()
