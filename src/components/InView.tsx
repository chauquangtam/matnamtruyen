import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import React, { useEffect, useRef } from "react";

interface InViewProps extends React.HTMLProps<HTMLDivElement> {
  onInView: () => any;
}

const InView: React.FC<InViewProps> = (props) => {
  const { onInView, children, ...divProps } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    rootMargin: "0px 0px 1000px 0px",
  });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible) {
      onInView();
    }
  }, [isVisible, onInView]);

  return (
    <div ref={ref} {...divProps}>
      {children}
    </div>
  );
};

export default InView;