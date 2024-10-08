// eslint-disable-next-line import/order
import { bootstrap } from "./bootstrap";

// eslint-disable-next-line perfectionist/sort-imports
import RootNavigation from "@app/core/navigation/RootNavigation";
import AllProviders from "@app/core/providers/AllProviders";

bootstrap();

export default function App() {
  return (
    <AllProviders>
      <RootNavigation />
    </AllProviders>
  );
}
