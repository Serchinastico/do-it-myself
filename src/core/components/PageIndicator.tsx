import { color } from "@app/core/theme/color";
import { range } from "@madeja-studio/cepillo";
import { Row } from "@madeja-studio/telar";
import chroma from "chroma-js";
import { View } from "react-native";

interface Props {
  numberOfPages: number;
  page: number;
}

const Circle = ({
  currentPage,
  page,
}: {
  currentPage: number;
  page: number;
}) => {
  return (
    <View
      style={tw.style(`w-2 h-2 mx-1 rounded-full`, {
        backgroundColor:
          currentPage === page
            ? color.ash
            : chroma(color.ash).alpha(0.25).hex(),
      })}
    />
  );
};

const PageIndicator = ({ numberOfPages, page }: Props) => {
  return (
    <Row>
      {range(numberOfPages).map((index) => (
        <Circle currentPage={page} key={index} page={index} />
      ))}
    </Row>
  );
};

export default PageIndicator;
