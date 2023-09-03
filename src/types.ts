import * as d3 from "d3";

export enum State {
  Undiscovered = "undiscovered",
  Discovered = "discovered",
  Processed = "processed"
}

export interface Node extends d3.SimulationNodeDatum {
  id: number;
  state: State;
  children: Node[];
  parent?: Node;
  isPath: boolean;
  isStart: boolean;
  isEnd: boolean;
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  source: Node;
  target: Node;
  value: number;
}
