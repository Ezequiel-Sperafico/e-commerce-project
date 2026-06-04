import { DragWindow } from "@/src/components/dragWindow/dragWindow";
import { Grid } from "@/src/components/grid";
import { IWindowProp } from "./window.type";

export function ThemeWindow({ onClose, onClick, layer }: IWindowProp) {
  return (
    <DragWindow
      layer={layer}
      onClose={onClose}
      onClick={onClick}
      title="Themes"
    >
      <Grid>
        <div>
          <span>testeeeeeeeeeee</span>
        </div>
        <div>
          <span>testeeeeeeee</span>
        </div>
        <div>
          <span>testeeee</span>
        </div>
        <div>
          <span>testeeeeeeeeeeeeeeeee</span>
        </div>
        <div>
          <span>testeeeeeeeeeeeeeeeee</span>
        </div>
        <div>
          <span>testeeeeeeeeeeeeeeeee</span>
        </div>
        <div>
          <span>testeeeeeeeeeeeeeeeee</span>
        </div>
        <div>
          <span>testeeeeeeeeeeeeeeeee</span>
        </div>
        <div>
          <span>testeeeeeeeeeeeeeeeee</span>
        </div>
        <div>
          <span>testeeeeeeeeeeeeeeeee</span>
        </div>
        <div>
          <span>testeeeeeeeeeeeeeeeee</span>
        </div>
        <div>
          <span>testeeeeeeeeeeeeeeeee</span>
        </div>
        <div>
          <span>testeeeeeeeeeeeeeeeee</span>
        </div>
        <div>
          <span>testeeeeeeeeeeeeeeeee</span>
        </div>
        <div>
          <span>testeeeeeeeeeeeeeeeee</span>
        </div>
      </Grid>
    </DragWindow>
  );
}
