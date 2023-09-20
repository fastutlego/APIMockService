# APIMockService
API 모킹서버 및 자동 모델 변환 서비스

## 목적 
앱 개발 시 API개발이 늦어져 일정에 차질이 생기는 경우가 많다.
API 스펙 및 URL 설계가 끝나면 서버 개발과 관계 없이 빠르게 API연동을 하기 위한 목적이다.

## 제한
- response는 반드시 application/json 타입이다.

## 요구사항
- API url 당 response를 확인할 수 있어야 한다.
- response를 앱에서 사용하는 모델로 자동으로 변환할 수 있어야 한다.

## Stack
node.js, express, body-parser, fs, quicktype-core

## 실행
node app.js (localhost:3000에서 확인기능)
localhost:3000/
