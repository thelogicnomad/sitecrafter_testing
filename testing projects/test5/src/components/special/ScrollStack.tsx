  import { cn } from "@/lib/utils";
  import { motion, useScroll, useTransform } from "framer-motion";
  import React,{ useRef ,ReactNode} from "react";

  const ScrollStack = ({ children }: { children: React.ReactNode[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end end"],
    });

    return (
      <div ref={ref} className="relative h-[200vh]">
        <div className="sticky top-1/4 -translate-y-1/4">
          {React.Children.map(children, (child, i) => {
            const start = i / children.length;
            const end = start + 1 / children.length;
            const scale = useTransform(scrollYProgress, [start, end], [1, 0.8]);
            const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);

            return (
              <motion.div style={{ scale, opacity }} className="absolute inset-0">
                <div className="h-full w-full flex items-center justify-center">
                  {child}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  export default ScrollStack;