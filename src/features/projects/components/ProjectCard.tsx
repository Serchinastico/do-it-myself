import { ToolButton } from "@app/core/components/ToolButton";
import { color } from "@app/core/theme/color";
import { getProjectColorById, getTagsByIds } from "@app/domain/project";
import { Project } from "@app/domain/project/project";
import { t } from "@lingui/macro";
import { Row } from "@madeja-studio/telar";
import chroma from "chroma-js";
import { Text, View } from "react-native";

interface Props {
  project: Project;
}

export const ProjectCard = ({ project }: Props) => {
  const projectColor = getProjectColorById(project.colorId);
  const tags = getTagsByIds(project.tagIds);

  return (
    <View
      style={[
        tw`rounded-card px-5 py-4 mb-2`,
        { backgroundColor: projectColor.hex },
      ]}
    >
      <Text style={tw`h2`}>{project.name}</Text>
      <Text style={tw`body mt-4`}>{project.description}</Text>

      <Row style={tw`gap-1 flex-wrap mt-4`}>
        {tags.map((tag) => (
          <View
            key={tag.id}
            style={[
              tw`px-3 py-1.5 rounded-full`,
              { backgroundColor: chroma(color.secondary).alpha(0.5).hex() },
            ]}
          >
            <Text style={tw`text-white body`}>{tag.name}</Text>
          </View>
        ))}
      </Row>

      <Row style={tw`flex-wrap justify-between mt-4 gap-y-2`}>
        {project.manual && (
          <ToolButton
            icon={{ family: "Feather", name: "book-open" }}
            style={tw`w-[49%]`}
            text={t`Manual`}
          />
        )}

        {project.worklog && (
          <ToolButton
            icon={{ family: "Feather", name: "bookmark" }}
            style={tw`w-[49%]`}
            text={t`Worklog`}
          />
        )}

        {project.attachments && (
          <ToolButton
            icon={{ family: "Feather", name: "paperclip" }}
            style={tw`w-[49%]`}
            text={t`Attachments`}
          />
        )}
      </Row>
    </View>
  );
};
