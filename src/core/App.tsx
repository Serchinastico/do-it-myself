// eslint-disable-next-line import/order
// eslint-disable-next-line perfectionist/sort-imports
import RootNavigation from "@app/core/navigation/RootNavigation";
import AllProviders from "@app/core/providers/AllProviders";

import { bootstrap } from "./bootstrap";

bootstrap();

export default function App() {
  return (
    <AllProviders>
      <RootNavigation />
    </AllProviders>
  );
}
