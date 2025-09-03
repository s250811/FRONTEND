import { http, HttpResponse } from 'msw';

export const handlers = [
    http.post(`/api/login/duplicate`, () => HttpResponse.json({ success: true })),
    http.post(`/api/login`, () => HttpResponse.json({ success: true })),
    http.post(`/api/workspace/list`, () => HttpResponse.json({ data: [] })),
];
