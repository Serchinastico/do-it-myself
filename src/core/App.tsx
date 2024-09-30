// eslint-disable-next-line import/order
import { bootstrap } from "./bootstrap";

// eslint-disable-next-line perfectionist/sort-imports
import { ErrorScreen } from "@app/core/components/Error";
import RootNavigation from "@app/core/navigation/RootNavigation";
import AllProviders from "@app/core/providers/AllProviders";
import ErrorBoundary from "react-native-error-boundary";

bootstrap();

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <AllProviders>
        <RootNavigation />
      </AllProviders>
    </ErrorBoundary>
  );
}
