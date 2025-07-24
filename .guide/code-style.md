# 코드 스타일 가이드

## 일반 원칙

- **일관성**: 기존 코드 스타일을 따라주세요.
- **가독성**: 간결하고 명확한 코드를 작성하세요.
- **모듈화**: 컴포넌트와 함수는 단일 책임을 가지도록 설계하세요.

## 파일 구조

```
components/
  ├── common/        # 재사용 가능한 공통 컴포넌트
  ├── feature/       # 기능별 컴포넌트
  │   ├── dashboard/
  │   ├── pokemon/
  │   └── users/
  └── ui/            # 기본 UI 컴포넌트
```

## 네이밍 컨벤션

- **파일명**: PascalCase로 컴포넌트 파일명 작성 (예: `PokemonCard.tsx`)
- **함수형 컴포넌트**: PascalCase 사용 (예: `function PokemonList() { ... }`)
- **변수 및 함수**: camelCase 사용 (예: `const getPokemonData = () => { ... }`)
- **상수**: UPPER_SNAKE_CASE 사용 (예: `const MAX_POKEMON_COUNT = 151`)
- **인터페이스/타입**: PascalCase에 접두사 'I' 없이 사용 (예: `type PokemonData = { ... }`)

## 컴포넌트 구조

```tsx
// 임포트 순서: 1) React/RN, 2) 외부 라이브러리, 3) 내부 모듈
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "expo-router";

// 내부 컴포넌트/훅/유틸리티
import { ThemedView } from "../ThemedView";
import { useThemeColor } from "../../hooks/useThemeColor";
import { fetchPokemonData } from "../../services/pokemon";

// 타입 정의
type PokemonCardProps = {
  id: number;
  name: string;
  onPress?: () => void;
};

// 컴포넌트 정의
export function PokemonCard({ id, name, onPress }: PokemonCardProps) {
  // 상태 및 훅
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const backgroundColor = useThemeColor("background");

  // 함수 정의
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  // 사이드 이펙트
  useEffect(() => {
    // 코드 작성
  }, [id]);

  // 조건부 렌더링
  if (isLoading) {
    return <LoadingIndicator />;
  }

  // 메인 렌더링
  return (
    <ThemedView style={styles.container} onPress={handlePress}>
      <Text>{name}</Text>
    </ThemedView>
  );
}

// 스타일
const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
  },
});
```

## 코드 포맷팅

- ESLint와 Prettier를 사용하여 코드 포맷팅을 유지합니다.
- 들여쓰기는 2칸 공백을 사용합니다.
- 세미콜론(;)을 항상 사용합니다.
- 문자열은 작은따옴표(')를 사용합니다.

## 상태 관리

- 로컬 상태는 `useState`를 사용합니다.
- 복잡한 상태 로직은 `useReducer`를 사용합니다.
- 전역 상태는 Context API를 사용합니다.

## 성능 최적화

- `React.memo`와 `useCallback`, `useMemo`를 적절히 사용하세요.
- 불필요한 리렌더링을 방지하기 위해 컴포넌트 분리를 고려하세요.
- 큰 목록은 `FlatList`나 `SectionList`를 사용하세요.

## 주석 작성

- 복잡한 로직이나 비즈니스 규칙에만 주석을 작성하세요.
- 자명한 코드에는 주석을 달지 마세요.
- JSDoc 스타일로 함수 설명을 작성하세요.

```tsx
/**
 * 포켓몬 데이터를 ID로 가져옵니다.
 * @param id - 포켓몬 ID
 * @returns 포켓몬 상세 정보
 */
async function fetchPokemonById(id: number): Promise<PokemonDetail> {
  // 구현
}
```
