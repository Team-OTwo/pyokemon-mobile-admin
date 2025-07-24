# pyokemon-mobile-admin

포켓몬 관리자 모바일 애플리케이션 - Expo 기반 React Native 프로젝트

## 시작하기

1. 의존성 설치

   ```bash
   npm install
   ```

2. 개발 서버 실행

   ```bash
   npx expo start
   ```

## 개발 환경

- [Expo](https://expo.dev) 프레임워크
- React Native 0.79.5
- TypeScript
- React Navigation (expo-router)

## 프로젝트 구조

```
pyokemon-mobile-admin/
  ├── app/                # 앱 화면 (expo-router 기반 파일 라우팅)
  ├── assets/             # 이미지, 폰트 등 정적 자산
  ├── components/         # 재사용 가능한 컴포넌트
  │   ├── common/         # 공통 컴포넌트
  │   ├── feature/        # 기능별 컴포넌트
  │   └── ui/             # 기본 UI 컴포넌트
  ├── constants/          # 상수 정의
  ├── hooks/              # 커스텀 훅
  ├── services/           # API 및 서비스 로직
  ├── store/              # 상태 관리
  ├── types/              # 타입 정의
  └── utils/              # 유틸리티 함수
```

## 개발자 가이드

개발자를 위한 상세 가이드는 다음 문서를 참조하세요:

- [개발 환경 설정](.guide/setup.md)
- [코드 스타일 가이드](.guide/code-style.md)
- [테스트 가이드](.guide/testing.md)

## 주요 기능

- 포켓몬 데이터 관리
- 사용자 관리
- 대시보드 및 통계

## 스크립트

```bash
# 개발 서버 시작
npm start

# iOS 시뮬레이터로 실행
npm run ios

# Android 에뮬레이터로 실행
npm run android

# 프로젝트 초기화 (예제 코드 이동)
npm run reset-project

# 린트 검사
npm run lint
```

## 배포

Expo EAS를 사용하여 앱을 빌드하고 배포합니다:

```bash
# EAS CLI 설치
npm install -g eas-cli

# 빌드 구성
eas build:configure

# 개발 빌드
eas build --profile development

# 프로덕션 빌드
eas build --platform all
```
