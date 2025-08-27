import { RootStackParamList } from "@/types/navigation"
import { CommonActions, createNavigationContainerRef } from "@react-navigation/native"

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function resetToLogin() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    )
  }
}
