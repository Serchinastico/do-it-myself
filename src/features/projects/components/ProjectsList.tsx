import { Project } from "@app/domain/project/project";
import { EmptyProjects } from "@app/features/projects/components/EmptyProjects";
import { ProjectCard } from "@app/features/projects/components/ProjectCard";
import { FlatList } from "react-native";

interface Props {
  onEditProjectPress: (project: Project) => Promise<void> | void;
  projects: Project[];
}

export const ProjectsList = ({ onEditProjectPress, projects }: Props) => {
  return (
    <FlatList
      ListEmptyComponent={<EmptyProjects />}
      contentContainerStyle={tw`flex-1`}
      data={projects}
      renderItem={({ item }) => (
        <ProjectCard onEditProjectPress={onEditProjectPress} project={item} />
      )}
      style={tw`px-4`}
    />
  );
};
