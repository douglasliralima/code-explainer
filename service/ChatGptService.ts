import axios, { AxiosError, AxiosResponse } from 'axios';

interface ChatbotResponse {
    result: string;
}

export function getChatbotResponse(message: string): Promise<string> {
    const url = `/api/translate`;
    const headers = {
        'Content-Type': 'application/json',
    };
    const params = {
        prompt: message,
    };
    return axios.get<ChatbotResponse>(url, { headers, params })
        .then((response: AxiosResponse<ChatbotResponse>) => {
            return response.data.result;
        })
        .catch(() => {
            return Promise.reject('An error occurred while sending the message.');
        });
}
