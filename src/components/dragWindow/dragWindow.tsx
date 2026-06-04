"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
  useContext,
} from "react";
import { EventContext } from "../../contexts/globalEventListenerRegistry";
import { WindowHeader } from "./windowHeader";
import { ResizeButton } from "./resizeButton";

export interface IDragWindowProps {
  layer?: number;
  title: string;
  onClose: (args: {
    width: number;
    height: number;
    x: number;
    y: number;
  }) => void;
  onClick: () => void;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  children?: React.ReactNode | React.ReactNode[];
}

export function DragWindow({
  layer = 1,
  onClose,
  onClick,
  title,
  children,
  width: initWidth = 300,
  height: initHeight = 300,
  x: initX = 50,
  y: initY = 50,
}: IDragWindowProps) {
  const [x, setX] = useState<number>(initX);
  const [y, setY] = useState<number>(initY);
  const [width, setWidth] = useState<number>(initWidth);
  const [height, setHeight] = useState<number>(initHeight);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const dragging = useRef<boolean>(false);
  const resizing = useRef<boolean>(false);

  const { addMouseMove, addMouseUp, removeMouseMove, removeMouseUp } =
    useContext(EventContext);

  const draggingStartEvent = useCallback(
    ({ nativeEvent }: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
      setOffsetX(nativeEvent.offsetX);
      setOffsetY(nativeEvent.offsetY);
      dragging.current = true;
    },
    [],
  );

  const draggingEndEvent = useCallback(() => (dragging.current = false), []);

  const resizingStartEvent = useCallback(() => {
    resizing.current = true;
  }, []);

  const resizingEndEvent = useCallback(() => (resizing.current = false), []);

  const mousePositionEvent = useCallback(
    (event: MouseEvent) => {
      if (dragging.current && event.buttons === 1) {
        const newX = event.clientX - offsetX;
        const newY = event.clientY - offsetY;

        if (newX <= 0) setX(0);
        else if (newX + (width - 1) / 5 > window.innerWidth)
          setX(window.innerWidth - (width - 1) / 5);
        else setX(newX);

        console.log(newY);

        if (newY <= 0) setY(0);
        else if (newY + (height - 1) / 5 > window.innerHeight)
          setY(window.innerHeight - (height - 1) / 5);
        else setY(newY);
      } else dragging.current = false;

      if (resizing.current && event.buttons === 1) {
        setWidth(event.clientX - x);
        setHeight(event.clientY - y);
      }
    },
    [offsetX, offsetY, x, y, width, height],
  );

  useEffect(() => {
    const mousePreventSelection = (e: Event) => {
      e.preventDefault();
    };
    const mouseMoveListenerId = addMouseMove?.(mousePositionEvent) || 0;
    const mouseUpListenerId =
      addMouseUp?.(() => {
        draggingEndEvent();
        resizingEndEvent();
      }) || 0;

    return () => {
      document.removeEventListener("selectstart", mousePreventSelection);
      removeMouseMove?.(mouseMoveListenerId);
      removeMouseUp?.(mouseUpListenerId);
    };
  }, [
    draggingEndEvent,
    mousePositionEvent,
    resizingEndEvent,
    addMouseMove,
    addMouseUp,
    removeMouseMove,
    removeMouseUp,
  ]);

  return (
    <div
      style={{
        top: `${y}px`,
        left: `${x}px`,
        height: `${height}px`,
        width: `${width}px`,
        zIndex: layer + 1000,
        boxShadow: "0px 1px 15px 1px #0000007d",
      }}
      className="fixed min-w-75 min-h-50 flex flex-col justify-between rounded-lg"
      onMouseDown={onClick}
    >
      <WindowHeader
        draggingStartEvent={draggingStartEvent}
        draggingEndEvent={draggingEndEvent}
        onClose={() => {
          onClose({ width, height, x, y });
        }}
        title={title}
      />
      <div
        className="bg-gray-200 flex overflow-auto pt-2"
        style={{
          height: "calc(100% - var(--spacing) * 10)",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--color-gray-900) var(--color-gray-200)",
          scrollbarGutter: "stable",
        }}
      >
        {children}
      </div>
      <ResizeButton
        onMouseDown={resizingStartEvent}
        onMouseUp={resizingEndEvent}
      />
    </div>
  );
}
