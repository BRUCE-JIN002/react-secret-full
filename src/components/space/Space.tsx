import classNames from "classnames";
import React, { Fragment, useContext, useMemo } from "react";
import { ConfigContext } from "./ConfigProvider";

export type SizeType = "small" | "large" | "middle" | number | string;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  stylse?: React.CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: "vertical" | "horizontal";
  align?: "start" | "end" | "center" | "baseline";
  split?: React.ReactNode;
  wrap?: boolean;
}

const spaceSize: { [key: string]: number } = {
  small: 8,
  middle: 16,
  large: 24,
};

const getNumerSize = (size: SizeType) => {
  return typeof size === "string" ? spaceSize[size] : size ?? 0;
};

const Space: React.FC<SpaceProps> = (props) => {
  const { space } = useContext(ConfigContext);
  const {
    className,
    style,
    children,
    size = space?.size ?? "small",
    direction = "horizontal",
    align,
    split,
    wrap = false,
    ...otherProps
  } = props;

  const childNodes = React.Children.toArray(props.children);

  const mergedAlign =
    direction === "horizontal" && align === undefined ? "center" : align;
  const cn = classNames(
    "space",
    `space-${direction}`,
    { [`space-align-${mergedAlign}`]: mergedAlign },
    className
  );

  const otherStyles = useMemo(() => {
    const otherStyle: React.CSSProperties = {};

    const [horizonalSize, vertivalSize] = (
      (Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]
    ).map(getNumerSize);

    otherStyle.columnGap = horizonalSize;
    otherStyle.rowGap = vertivalSize;

    if (wrap) {
      otherStyle.flexWrap = "wrap";
    }

    return otherStyle;
  }, [wrap, size]);

  const nodes = childNodes.map((child: any, i) => {
    const key = (child && child.key) || `space-${i}`;

    return (
      <Fragment key={key}>
        <div className="space-item">{child}</div>
        {i < childNodes.length - 1 && split && (
          <span className={`${className}-split`} style={style} key={i}>
            {split}
          </span>
        )}
      </Fragment>
    );
  });

  return (
    <div className={cn} style={{ ...otherStyles, ...style }} {...otherProps}>
      {nodes}
    </div>
  );
};

export default Space;
