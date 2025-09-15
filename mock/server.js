// mock/server.js
const path = require('path');
const fs = require('fs');
const jsonServer = require('json-server');

const server = jsonServer.create();
const dbPath = path.join(__dirname, 'db.json');
const router = jsonServer.router(dbPath);

// 기본 미들웨어(CORS, 캐시, 로거 등)
server.use(jsonServer.defaults());

// routes.json 리라이트 적용(있을 때만)
const routesPath = path.join(__dirname, 'routes.json');
if (fs.existsSync(routesPath)) {
    const routes = require(routesPath);
    server.use(jsonServer.rewriter(routes));
}

// 사용자 미들웨어 적용(있을 때만)
const customMwPath = path.join(__dirname, 'middleware.js');
if (fs.existsSync(customMwPath)) {
    server.use(require(customMwPath));
}

// 라우터 연결
server.use(router);

// 포트 설정
const PORT = process.env.MOCK_PORT || 4000;
server.listen(PORT, () => {
    console.log(`[MOCK] json-server running on http://localhost:${PORT}`);
});
