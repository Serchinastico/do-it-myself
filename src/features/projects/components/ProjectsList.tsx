import { Project } from "@app/domain/project/project";
import { EmptyProjects } from "@app/features/projects/components/EmptyProjects";
import { ProjectCard } from "@app/features/projects/components/ProjectCard";
import { FlatList } from "react-native";

interface Props {
  projects: Project[];
}

export const ProjectsList = ({ projects }: Props) => {
  return (
    <FlatList
      ListEmptyComponent={<EmptyProjects />}
      data={projects}
      renderItem={({ item }) => <ProjectCard project={item} />}
      style={tw`px-4`}
    />
  );
};
