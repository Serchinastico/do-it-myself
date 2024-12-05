import { FlashList } from "@app/core/components/FlashList";
import { fuzzySearch } from "@app/core/utils/fuzzySearch";
import { getTagsByIds, ToolType } from "@app/domain/project";
import { Project } from "@app/domain/project/project";
import { EmptyProjects } from "@app/features/projects/components/EmptyProjects";
import { ProjectCard } from "@app/features/projects/components/ProjectCard";
import { SearchBar } from "@app/features/projects/components/SearchBar";
import { Column, OnPress } from "@madeja-studio/telar";
import { useMemo, useState } from "react";

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
  const [currentSearch, setCurrentSearch] = useState("");
  const [scroll, setScroll] = useState(0);

  const filteredProjects = useMemo(() => {
    if (currentSearch.trim().length === 0) return projects;

    const projectsWithTagNames = projects.map((p) => ({
      ...p,
      tagNames: getTagsByIds(p.tagIds).map((t) => t.getName()),
    }));

    return fuzzySearch({
      items: projectsWithTagNames,
      keys: ["name", "description", "tagNames"],
      search: currentSearch,
    });
  }, [projects, currentSearch]);

  const mustShowSearchBar =
    filteredProjects.length > 0 || currentSearch.trim().length !== 0;

  return (
    <Column style={tw`flex-1`}>
      <FlashList
        contentContainerStyle={tw`pt-18 pb-28 px-4`}
        data={filteredProjects}
        estimatedItemSize={195}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyProjects onCreatePress={onCreatePress} />}
        onScroll={(ev) => {
          setScroll(ev.nativeEvent.contentOffset.y);
        }}
        renderItem={({ item }) => (
          <ProjectCard
            onEditProjectPress={onEditProjectPress}
            onToolPress={onToolPress}
            project={item}
          />
        )}
      />

      {mustShowSearchBar && (
        <SearchBar onSearchChange={setCurrentSearch} scroll={scroll} />
      )}
    </Column>
  );
};
