import { EventMessage, Events } from "@app/core/event-bus/eventBus";
import useEventBus from "@app/core/event-bus/useEventBus";
import { JsonDocument } from "@app/features/tools/hooks/useRichTextEditor";
import invariant from "tiny-invariant";

interface Props {
  json: JsonDocument;
  onPress: (
    props: Events[typeof EventMessage.DatePress]
  ) => Promise<void> | void;
}

export const useDatePressHandler = ({ json, onPress }: Props) => {
  useEventBus(
    EventMessage.DatePress,
    (props) => {
      const node = json?.content.find((node) => node.attrs["id"] === props.id);

      invariant(node);

      onPress(props);
    },
    [json]
  );
};
