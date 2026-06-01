"use client";

import { EEvent, outLayerObserver } from "@/src/contexts/communicationPipe";
import { useEffect, useRef, useState } from "react";
import { ElementWindow } from "./elementWindow";
import { SectionWindow } from "./sectionWindow";
import { PageWindow } from "./pageWindow";
import { ThemeWindow } from "./themeWindow";
import { MediaWindow } from "./mediaWindow";
import { createDefaultObjectFromEntry } from "@/src/utils/createDefaultObjectFromEntry";

export function WindowManager() {
  const WINDOW_REGISTRY = {
    element: ElementWindow,
    section: SectionWindow,
    page: PageWindow,
    theme: ThemeWindow,
    media: MediaWindow,
  };

  const symbolsList = useRef(
    createDefaultObjectFromEntry(WINDOW_REGISTRY, () => Symbol()),
  );

  const [windowOpenState, setWindowOpenState] = useState(
    createDefaultObjectFromEntry(WINDOW_REGISTRY, false),
  );

  useEffect(() => {
    return outLayerObserver.subscribe(
      EEvent.WINDOW_TOGGLE,
      ({ toggleWindow }) => {
        setWindowOpenState({
          ...windowOpenState,
          [toggleWindow]: !windowOpenState[toggleWindow],
        });
      },
    );
  }, []);

  return (
    <>
      {Object.keys(windowOpenState).map((k: keyof typeof windowOpenState) =>
        WINDOW_REGISTRY[k]({ onClose: () => {}, key: k }),
      )}
    </>
  );
}
