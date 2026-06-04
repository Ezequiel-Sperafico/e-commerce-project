import { DragWindow } from "@/src/components/dragWindow/dragWindow";
import { Grid } from "@/src/components/grid";
import { IWindowProp } from "./window.type";

export function ElementWindow({ onClose, onClick, layer }: IWindowProp) {
  return (
    <DragWindow
      title="Elements"
      layer={layer}
      onClick={onClick}
      onClose={onClose}
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
