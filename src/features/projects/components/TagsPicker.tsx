import { ProjectTag } from "@app/domain/project";
import { t } from "@lingui/macro";
import { Button, Column, Row } from "@madeja-studio/telar";
import { Text } from "react-native";

interface Props {
  tags: readonly ProjectTag[];
}

export const TagsPicker = ({ tags }: Props) => {
  return (
    <Column>
      <Text style={tw`h3 mt-4`}>{t`Tags`}</Text>
      <Row style={tw`flex-wrap mt-2 ml-4 gap-x-2 gap-y-1`}>
        {tags.map((tag) => (
          <Button.Container
            hasHapticFeedback
            key={tag.id}
            style={tw`px-4 py-2 border border-primary rounded-full`}
          >
            <Text style={tw.style(`body font-bold text-primary`)}>
              {tag.name}
            </Text>
          </Button.Container>
        ))}
      </Row>
      <Button
        icon={{ family: "Feather", name: "plus" }}
        style={tw`mt-2`}
        text={t`Add tags`}
        variant="text"
      />
    </Column>
  );
};
