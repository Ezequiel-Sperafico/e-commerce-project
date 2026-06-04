"use client";

import { EEvent, outLayerObserver } from "@/src/contexts/communicationPipe";
import { useEffect, useState } from "react";
import { ElementWindow } from "./elementWindow";
import { SectionWindow } from "./sectionWindow";
import { PageWindow } from "./pageWindow";
import { ThemeWindow } from "./themeWindow";
import { MediaWindow } from "./mediaWindow";
import { createDefaultObjectFromEntry } from "@/src/utils/createDefaultObjectFromEntry";
import { getTypedObjectKeys } from "@/src/utils/typedObjectKeys";
import { mapOverObject } from "@/src/utils/mapOverObject";

export function WindowManager() {
  const WINDOW_REGISTRY = {
    element: ElementWindow,
    section: SectionWindow,
    page: PageWindow,
    theme: ThemeWindow,
    media: MediaWindow,
  };

  const [windowsState, setWindowsState] = useState(
    createDefaultObjectFromEntry(WINDOW_REGISTRY, {
      open: false,
      active: false,
    }),
  );

  useEffect(() => {
    return outLayerObserver.subscribe(
      EEvent.WINDOW_TOGGLE,
      ({ toggleWindow }) => {
        setWindowsState({
          ...windowsState,
          [toggleWindow]: {
            ...windowsState[toggleWindow],
            open: !windowsState[toggleWindow].open,
          },
        });
      },
    );
  }, [windowsState]);

  return (
    <>
      {getTypedObjectKeys(windowsState)
        .filter((k) => windowsState[k].open)
        .map((k) => {
          const Window = WINDOW_REGISTRY[k];
          const state = windowsState[k];
          return (
            <Window
              layer={state.active ? 50 : 10}
              onClick={() =>
                setWindowsState({
                  ...mapOverObject(windowsState, (el) => ({
                    ...el,
                    active: false,
                  })),
                  [k]: { ...state, active: true },
                })
              }
              onClose={() =>
                setWindowsState({
                  ...windowsState,
                  [k]: false,
                })
              }
              key={k}
            />
          );
        })}
    </>
  );
}
