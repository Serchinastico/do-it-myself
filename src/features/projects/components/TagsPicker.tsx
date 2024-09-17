import { ProjectTag } from "@app/domain/project";
import { Tag } from "@app/features/projects/components/Tag";
import { t } from "@lingui/macro";
import { Button, Column, OnPress, Row } from "@madeja-studio/telar";
import { Text } from "react-native";

interface Props {
  onPress: OnPress;
  tags: readonly ProjectTag[];
}

export const TagsPicker = ({ onPress, tags }: Props) => {
  return (
    <Column>
      <Text style={tw`h3 mt-4`}>{t`Tags`}</Text>
      <Row style={tw`flex-wrap mt-2 ml-4 gap-x-2 gap-y-1`}>
        {tags.map((tag) => (
          <Tag isSelected key={tag.id} tag={tag} />
        ))}
      </Row>
      <Button
        icon={{ family: "Feather", name: "plus" }}
        onPress={onPress}
        style={tw`mt-2`}
        text={t`Add tags`}
        variant="text"
      />
    </Column>
  );
};
