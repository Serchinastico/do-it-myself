import { Button } from "@app/core/components/Button";
import { ProjectTagId, getTagsByIds } from "@app/domain/project";
import { Tag } from "@app/features/projects/components/Tag";
import { t } from "@lingui/macro";
import { Column, OnPress, Row } from "@madeja-studio/telar";
import { useMemo } from "react";
import { Text } from "react-native";

interface Props {
  onPress: OnPress;
  tagIds: ProjectTagId[];
}

export const TagsPicker = ({ onPress, tagIds }: Props) => {
  const tags = useMemo(() => getTagsByIds(tagIds), [tagIds]);

  return (
    <Column>
      <Text style={tw`h3 mt-4`}>{t`Tags`}</Text>
      <Row style={tw`flex-wrap mt-2 ml-4 gap-x-2 gap-y-1`}>
        {tags.map((tag) => (
          <Tag isSelected key={tag.id} onPress={onPress} tag={tag} />
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
