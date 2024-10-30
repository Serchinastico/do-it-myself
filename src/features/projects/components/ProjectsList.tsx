import { FlashList } from "@app/core/components/FlashList";
import { ToolType } from "@app/domain/project";
import { Project } from "@app/domain/project/project";
import { EmptyProjects } from "@app/features/projects/components/EmptyProjects";
import { ProjectCard } from "@app/features/projects/components/ProjectCard";
import { OnPress } from "@madeja-studio/telar";

interface Props {
  onCreatePress: OnPress;
  onEditProjectPress: (project: Project) => Promise<void> | void;
  onToolPress: (tool: ToolType, project: Project) => Promise<void> | void;
  projects: Project[];
}

export const ProjectsList = ({
  onCreatePress,
  onEditProjectPress,
  onToolPress,
  projects,
}: Props) => {
  return (
    <FlashList
      contentContainerStyle={tw`pb-28 px-4`}
      data={projects}
      estimatedItemSize={195}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<EmptyProjects onCreatePress={onCreatePress} />}
      renderItem={({ item }) => (
        <ProjectCard
          onEditProjectPress={onEditProjectPress}
          onToolPress={onToolPress}
          project={item}
        />
      )}
    />
  );
};
