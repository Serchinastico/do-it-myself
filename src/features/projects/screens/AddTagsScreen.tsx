import { Button } from "@app/core/components/Button";
import { RootScreenProps } from "@app/core/navigation/routes";
import { PROJECT_TAGS } from "@app/domain/project";
import { ProjectTag } from "@app/domain/project/tags";
import { Tag } from "@app/features/projects/components/Tag";
import { t } from "@lingui/macro";
import { Column, Row } from "@madeja-studio/telar";
import { ProjectHeader } from "features/projects/components/ProjectHeader";
import { useState } from "react";
import { ScrollView, StatusBar, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  name: string;
  tags: readonly ProjectTag[];
}

export const TagSection = ({ name, tags }: Props) => {
  return (
    <Column>
      <Text style={tw`h3 mt-6`}>{name}</Text>

      <Row style={tw`flex-wrap mt-4 gap-x-2 gap-y-1`}>
        {tags.map((tag) => (
          <Tag isSelected={false} key={tag.id} tag={tag} />
        ))}
      </Row>
    </Column>
  );
};

export const AddTagsScreen = ({ navigation }: RootScreenProps<"addTags">) => {
  const [selectedTags, setSelectedTags] = useState<readonly ProjectTag[]>(
    PROJECT_TAGS.category
  );

  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <ProjectHeader.AddTags onClose={() => navigation.goBack()} />

      <ScrollView style={tw`px-4`}>
        <Column>
          <Text
            style={tw`body`}
          >{t`Tags allow you to easily search for projects by their characteristics.`}</Text>
          {Object.entries(PROJECT_TAGS).map(([name, tags]) => (
            <TagSection key={name} name={name} tags={tags} />
          ))}
          <Button
            onPress={() => navigation.goBack()}
            style={[tw`mt-6`, { marginBottom: bottom }]}
            text={t`Accept`}
          />
        </Column>
      </ScrollView>
    </>
  );
};
