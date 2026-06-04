import { EventExecutionQueueContext } from "../contexts/globalEventListenerRegistry";
import { SideBar } from "./outerLayer/menu/sideBar";
import { TopBar } from "./outerLayer/menu/topBar";
import { WindowManager } from "./outerLayer/windows/windowManager";

export function App() {
  return (
    <div className="w-full h-full">
      <EventExecutionQueueContext>
        <SideBar />
        <TopBar />
        <WindowManager />
      </EventExecutionQueueContext>
    </div>
  );
}
