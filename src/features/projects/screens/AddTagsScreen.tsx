import { Button } from "@app/core/components/Button";
import { SafeArea } from "@app/core/components/SafeArea";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { PROJECT_TAGS, ProjectTagId } from "@app/domain/project";
import { ProjectTag } from "@app/domain/project/tags";
import { Tag } from "@app/features/projects/components/Tag";
import { t } from "@lingui/macro";
import { toggleItem } from "@madeja-studio/cepillo";
import { Column, Row, SafeAreaViewEdges } from "@madeja-studio/telar";
import { ProjectHeader } from "features/projects/components/headers";
import { useAtom } from "jotai";
import { ScrollView, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  name: string;
  onTagPress: (id: ProjectTagId) => Promise<void> | void;
  selectedTagIds: ProjectTagId[];
  tags: readonly ProjectTag[];
}

export const TagSection = ({
  name,
  onTagPress,
  selectedTagIds,
  tags,
}: Props) => {
  return (
    <Column>
      <Text style={tw`h3 mt-6`}>{name}</Text>

      <Row style={tw`flex-wrap mt-4 gap-x-2 gap-y-1`}>
        {tags.map((tag) => (
          <Tag
            isSelected={selectedTagIds.includes(tag.id)}
            key={tag.id}
            onPress={() => onTagPress(tag.id)}
            tag={tag}
          />
        ))}
      </Row>
    </Column>
  );
};

export const AddTagsScreen = ({ navigation }: RootScreenProps<"addTags">) => {
  const [selectedTagIds, setSelectedTagIds] = useAtom(atoms.selectedTagIds);

  const { bottom } = useSafeAreaInsets();

  return (
    <SafeArea edges={SafeAreaViewEdges.NoTop}>
      <ProjectHeader.AddTags onClose={() => navigation.goBack()} />

      <ScrollView style={tw`px-4`}>
        <Column>
          <Text
            style={tw`body`}
          >{t`Tags allow you to easily search for projects by their characteristics.`}</Text>
          {Object.entries(PROJECT_TAGS).map(([name, tags]) => (
            <TagSection
              key={name}
              name={name}
              onTagPress={(id) =>
                setSelectedTagIds(async (tags) => toggleItem(await tags, id))
              }
              selectedTagIds={selectedTagIds}
              tags={tags}
            />
          ))}
          <Button
            onPress={() => navigation.goBack()}
            style={[tw`mt-6`, { marginBottom: bottom }]}
            text={t`Accept`}
          />
        </Column>
      </ScrollView>
    </SafeArea>
  );
};
