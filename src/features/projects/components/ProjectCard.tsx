import { ToolButton } from "@app/core/components/ToolButton";
import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { useHapticFeedback } from "@app/core/hooks/useHapticFeedback";
import { color } from "@app/core/theme/color";
import {
  getProjectColorById,
  getTagsByIds,
  ProjectTag,
  ToolType,
} from "@app/domain/project";
import { Project } from "@app/domain/project/project";
import { ProjectCardBackground } from "@app/features/projects/components/icons";
import { t } from "@lingui/macro";
import { Button, Center, Column, Row, VectorIcon } from "@madeja-studio/telar";
import chroma from "chroma-js";
import { Text } from "react-native";

interface Props {
  onEditProjectPress: (project: Project) => Promise<void> | void;
  onTagPress: (tag: ProjectTag) => Promise<void> | void;
  onToolPress: (tool: ToolType, project: Project) => Promise<void> | void;
  project: Project;
}

export const ProjectCard = ({
  onEditProjectPress,
  onTagPress,
  onToolPress,
  project,
}: Props) => {
  const { isHapticFeedbackEnabled } = useHapticFeedback();
  const colorSwitch = useColorSwitch();
  const projectColor = getProjectColorById(project.colorId);
  const tags = getTagsByIds(project.tagIds);

  return (
    <Center
      style={[
        tw`rounded-card px-5 py-4 mb-2 overflow-hidden`,
        { backgroundColor: projectColor.hex },
      ]}
    >
      <ProjectCardBackground project={project} />

      <Row style={tw`justify-between`}>
        <Column style={tw`flex-1 mr-3`}>
          <Text style={tw`h2 text-ash`}>{project.name}</Text>
          {project.description && (
            <Text style={tw`body mt-2 text-ash`}>{project.description}</Text>
          )}
        </Column>

        <Button.Container
          hasHapticFeedback={isHapticFeedbackEnabled}
          onPress={() => onEditProjectPress(project)}
          style={tw`bg-white dark:bg-ash rounded-full size-press center`}
        >
          <VectorIcon
            color={colorSwitch({ dark: "white", light: "ash" })}
            icon={{ family: "Feather", name: "edit" }}
            size={24}
            /* Visual adjustment */
            style={tw`ml-0.5`}
          />
        </Button.Container>
      </Row>

      <Row style={tw`gap-1 flex-wrap w-full mt-4`}>
        {tags.map((tag) => (
          <Button.Container
            hasHapticFeedback
            key={tag.id}
            onPress={() => onTagPress(tag)}
            style={[
              tw`px-3 py-1.5 rounded-full`,
              { backgroundColor: chroma(color.secondary).alpha(0.5).hex() },
            ]}
          >
            <Text style={tw`text-white body`}>{tag.getName()}</Text>
          </Button.Container>
        ))}
      </Row>

      <Row style={tw`flex-wrap mt-4 gap-2`}>
        {project.manual && (
          <ToolButton
            icon={{ family: "Feather", name: "book-open" }}
            onPress={() => onToolPress("manual", project)}
            style={tw`w-[48%]`}
            text={t`Manual`}
          />
        )}

        {project.worklog && (
          <ToolButton
            icon={{ family: "Feather", name: "bookmark" }}
            onPress={() => onToolPress("worklog", project)}
            style={tw`w-[48%]`}
            text={t`Worklog`}
          />
        )}

        {project.attachments && (
          <ToolButton
            icon={{ family: "Feather", name: "paperclip" }}
            onPress={() => onToolPress("attachments", project)}
            style={tw`w-[48%]`}
            text={t`Attachments`}
          />
        )}
      </Row>
    </Center>
  );
};
