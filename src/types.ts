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
  GetColor(): string;
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  source: Node;
  target: Node;
  value: number;
}

export class Node implements Node {
  id: number;
  state: State;
  children: Node[];
  parent?: Node;
  isPath: boolean;
  isStart: boolean;
  isEnd: boolean;
  x?: number;
  y?: number;

  constructor(id: number) {
      this.id = id;
      this.state = State.Undiscovered;
      this.children = [];
      this.isPath = false;
      this.isStart = false;
      this.isEnd = false;
  }

  public GetColor = () : string => {
      if (this.isStart) return "yellow";
      if (this.isEnd) return "pink";
      if (this.isPath) return "orange";
      switch (this.state) {
        case State.Undiscovered:
            return "blue";
        case State.Discovered:
            return "green";
        case State.Processed:
            return "red";
        default:
            return "black";
      }
  }
}
