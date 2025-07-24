# 개발 환경 설정 가이드

## 필수 요구사항

- Node.js v18 이상
- Watchman (macOS/Linux 사용자)
- Xcode (iOS 개발용, macOS 필요)
- Android Studio (Android 개발용)
- Git

## 초기 설정

1. 저장소 클론하기

```bash
git clone [저장소 URL]
cd pyokemon-mobile-admin
```

2. 의존성 설치

```bash
npm install
```

3. iOS 개발 설정 (macOS 사용자만)

```bash
cd ios
pod install
cd ..
```

## 개발 서버 실행하기

```bash
# 개발 서버 시작
npm start

# iOS 시뮬레이터로 실행
npm run ios

# Android 에뮬레이터로 실행
npm run android
```

## 개발 빌드 생성하기

Expo EAS를 사용하여 개발 빌드를 생성할 수 있습니다:

```bash
# EAS CLI 설치
npm install -g eas-cli

# EAS에 로그인
eas login

# 개발 빌드 생성
eas build --profile development
```

## 문제 해결

### Metro 번들러 캐시 초기화

```bash
npm start -- --reset-cache
```

### 의존성 문제 해결

```bash
rm -rf node_modules
npm install
```

### iOS 빌드 문제

```bash
cd ios
pod install --repo-update
cd ..
```
