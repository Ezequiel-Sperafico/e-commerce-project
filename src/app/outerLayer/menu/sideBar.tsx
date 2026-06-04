"use client";
import { CollapsableMenu } from "@/src/components/collapsableMenu";
import { IconButton } from "@/src/components/iconButton";
import { EEvent, outLayerObserver } from "@/src/contexts/communicationPipe";
import {
  LayoutTemplate,
  PanelTop,
  Rows2,
  SwatchBook,
  Image,
} from "lucide-react";
import { useState } from "react";

export function SideBar() {
  const [open, setOpen] = useState(true);

  const menuOptions = [
    {
      label: "Element",
      icon: LayoutTemplate,
      onClick: () => {
        outLayerObserver.dispatch(EEvent.WINDOW_TOGGLE, {
          toggleWindow: "element",
        });
      },
    },
    {
      label: "Section",
      icon: Rows2,
      onClick: () => {
        outLayerObserver.dispatch(EEvent.WINDOW_TOGGLE, {
          toggleWindow: "section",
        });
      },
    },
    {
      label: "Page",
      icon: PanelTop,
      onClick: () => {
        outLayerObserver.dispatch(EEvent.WINDOW_TOGGLE, {
          toggleWindow: "page",
        });
      },
    },
    {
      label: "Theme",
      icon: SwatchBook,
      onClick: () => {
        outLayerObserver.dispatch(EEvent.WINDOW_TOGGLE, {
          toggleWindow: "theme",
        });
      },
    },
    {
      label: "Media",
      icon: Image,
      onClick: () => {
        outLayerObserver.dispatch(EEvent.WINDOW_TOGGLE, {
          toggleWindow: "media",
        });
      },
    },
  ];

  return (
    <CollapsableMenu
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      axis="left"
      open={open}
    >
      <div className="w-full h-full flex flex-col gap-2 pt-11 items-center">
        {menuOptions.map(({ label, icon, onClick }, index) => (
          <IconButton
            key={index}
            outerClass="text-gray-800 p-0.5 hover:bg-gray-800 hover:text-gray-200 rounded"
            icon={icon}
            onClick={onClick}
            title={label}
          />
        ))}
      </div>
    </CollapsableMenu>
  );
}
