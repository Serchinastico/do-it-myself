import { Cue as DIMCue } from "./Cue";
import { SelectableCue } from "./SelectableCue";

export const Cue = Object.assign(DIMCue, { Selectable: SelectableCue });
