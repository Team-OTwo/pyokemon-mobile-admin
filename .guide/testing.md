# 테스트 가이드

## 테스트 철학

- **테스트 우선**: 가능한 한 테스트를 먼저 작성하고 코드를 구현하세요.
- **적절한 범위**: 모든 것을 테스트하기보다 중요한 기능과 비즈니스 로직에 집중하세요.
- **격리**: 각 테스트는 독립적이어야 하며 다른 테스트에 의존하지 않아야 합니다.

## 테스트 종류

### 1. 단위 테스트

- **도구**: Jest + React Native Testing Library
- **대상**: 유틸리티 함수, 훅, 컴포넌트
- **위치**: `__tests__/unit` 디렉토리

```tsx
// sum.test.ts
import { sum } from "../utils/math";

describe("sum function", () => {
  it("adds two numbers correctly", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("handles negative numbers", () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});
```

### 2. 컴포넌트 테스트

- **도구**: React Native Testing Library
- **대상**: UI 컴포넌트
- **위치**: 컴포넌트 옆에 `__tests__` 디렉토리

```tsx
// PokemonCard.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PokemonCard } from "../components/feature/pokemon/PokemonCard";

describe("PokemonCard", () => {
  it("renders correctly with props", () => {
    const { getByText } = render(<PokemonCard id={1} name="Bulbasaur" />);
    expect(getByText("Bulbasaur")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<PokemonCard id={1} name="Bulbasaur" onPress={onPressMock} />);

    fireEvent.press(getByTestId("pokemon-card"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
```

### 3. 통합 테스트

- **도구**: Jest + React Native Testing Library
- **대상**: 여러 컴포넌트와 서비스의 상호작용
- **위치**: `__tests__/integration` 디렉토리

```tsx
// PokemonList.integration.test.tsx
import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { PokemonListScreen } from "../app/(tabs)/explore";
import { mockPokemonAPI } from "../__mocks__/api";

// API 모킹
jest.mock("../services/pokemon", () => mockPokemonAPI);

describe("PokemonListScreen Integration", () => {
  it("fetches and displays pokemon list", async () => {
    const { getByText, queryByText } = render(<PokemonListScreen />);

    // 로딩 상태 확인
    expect(getByText("로딩 중...")).toBeTruthy();

    // 데이터 로드 후 확인
    await waitFor(() => {
      expect(queryByText("로딩 중...")).toBeNull();
      expect(getByText("Bulbasaur")).toBeTruthy();
      expect(getByText("Charmander")).toBeTruthy();
    });
  });
});
```

### 4. E2E 테스트

- **도구**: Detox
- **대상**: 전체 앱 흐름
- **위치**: `e2e` 디렉토리

```js
// login.e2e.js
describe("로그인 흐름", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it("로그인 화면이 표시됨", async () => {
    await expect(element(by.id("login-screen"))).toBeVisible();
  });

  it("유효한 자격 증명으로 로그인 성공", async () => {
    await element(by.id("email-input")).typeText("test@example.com");
    await element(by.id("password-input")).typeText("password123");
    await element(by.id("login-button")).tap();

    // 로그인 후 홈 화면으로 이동
    await expect(element(by.id("home-screen"))).toBeVisible();
  });
});
```

## 테스트 실행

```bash
# 모든 테스트 실행
npm test

# 특정 테스트 파일 실행
npm test -- PokemonCard.test.tsx

# 테스트 커버리지 보고서 생성
npm test -- --coverage

# E2E 테스트 실행
npm run e2e
```

## 모킹

### API 모킹

```tsx
// __mocks__/api.ts
export const mockPokemonAPI = {
  fetchPokemonList: jest.fn().mockResolvedValue([
    { id: 1, name: "Bulbasaur" },
    { id: 4, name: "Charmander" },
    { id: 7, name: "Squirtle" },
  ]),
  fetchPokemonById: jest.fn().mockImplementation((id) => {
    const mockData = {
      1: { id: 1, name: "Bulbasaur", types: ["Grass", "Poison"] },
      4: { id: 4, name: "Charmander", types: ["Fire"] },
      7: { id: 7, name: "Squirtle", types: ["Water"] },
    };
    return Promise.resolve(mockData[id] || null);
  }),
};
```

### 네비게이션 모킹

```tsx
// __mocks__/expo-router.js
const mockRouter = {
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: jest.fn().mockReturnValue({
    params: { id: 1 },
  }),
  Link: ({ children }) => children,
};

export default mockRouter;
```

## 테스트 모범 사례

1. **테스트 이름은 명확하게**: 테스트가 무엇을 검증하는지 명확히 설명하세요.
2. **AAA 패턴 사용**: Arrange(준비), Act(실행), Assert(검증) 패턴을 따르세요.
3. **스냅샷 테스트 제한**: 스냅샷 테스트는 UI가 자주 변경되는 경우 유지보수가 어려울 수 있습니다.
4. **테스트 데이터 분리**: 테스트 데이터를 별도 파일로 분리하여 재사용하세요.
5. **실제 API 호출 방지**: 테스트에서는 실제 API를 호출하지 않도록 모킹하세요.
