import { color } from "@app/core/theme/color";
import { Project, ProjectTagId } from "@app/domain/project";
import { CaptureView } from "@app/features/projects/components/icons/CaptureView";
import { chunkify, repeatToLength, uniqueBy } from "@madeja-studio/cepillo";
import { Center, Column, Row, VectorIcon } from "@madeja-studio/telar";
import { IconReference } from "@madeja-studio/telar/src/component/Icon/icon";
import chroma from "chroma-js";
import { useCallback, useMemo, useState } from "react";
import { Dimensions, Image, LayoutChangeEvent } from "react-native";

const getIconForTag = (tagId: ProjectTagId): IconReference | null => {
  switch (tagId) {
    case "3d_printing":
      return { family: "Feather", name: "box" };
    case "design":
      return { family: "Feather", name: "image" };
    case "electronics":
      return { family: "Feather", name: "cpu" };
    case "fix":
      return { family: "FontAwesome6", name: "toolbox" };
    case "mixed medium":
      return { family: "FontAwesome6", name: "mix" };
    case "mount_unmount":
      return { family: "Feather", name: "tool" };
    case "need_help":
      return { family: "FontAwesome6", name: "handshake-angle" };
    case "paint":
      return { family: "Feather", name: "pen-tool" };
    case "paper":
      return { family: "FontAwesome6", name: "scroll" };
    case "wood":
      return { family: "FontAwesome6", name: "tree" };
    default:
      return null;
  }
};

export interface CaptureProps {
  project: Project;
}

type ViewSize = {
  height: number;
  width: number;
};

export const ProjectCardBackground = ({ project }: CaptureProps) => {
  const [uri, setUri] = useState<null | string>(null);
  const [parentSize, setParentSize] = useState<ViewSize>({
    height: 0,
    width: 0,
  });

  const iconReferences = useMemo(() => {
    const refs = project.tagIds
      .map(getIconForTag)
      .filter(Boolean) as IconReference[];

    return chunkify(
      repeatToLength(
        uniqueBy(refs, (ref) => `${ref.family} - ${ref.name}`),
        100
      ),
      10
    );
  }, [project]);

  const onPageLayout = useCallback((event: LayoutChangeEvent) => {
    setParentSize(event.nativeEvent.layout);
  }, []);

  return (
    <Center onLayout={onPageLayout} style={tw.style(`absolute inset-0 z--1`)}>
      <CaptureView
        onGenerateCapture={setUri}
        style={{ height: 600, width: Dimensions.get("window").width }}
      >
        <Row style={tw`gap-2`}>
          {iconReferences.map((iconsColumn, columnIndex) => (
            <Column
              key={`${columnIndex}`}
              style={[tw`gap-2`, { opacity: columnIndex * 0.1 }]}
            >
              {iconsColumn.map((iconRef, index) => (
                <VectorIcon
                  color={chroma(color.white).alpha(0.4).hex()}
                  icon={iconRef}
                  key={`${iconRef.family} - ${iconRef.name} - ${index}`}
                  size={32}
                />
              ))}
            </Column>
          ))}
        </Row>
      </CaptureView>

      {uri && (
        <Image
          height={parentSize.height + 100}
          resizeMode="cover"
          source={{ uri }}
          style={{ transform: [{ rotate: "-30deg" }] }}
          width={parentSize.width + 100}
        />
      )}
    </Center>
  );
};
