import * as d3 from 'd3'

export enum NetworkType {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Example = 'example'	
}

export enum NodeState {
  Undiscovered = 'undiscovered',
  Discovered = 'discovered',
  Processed = 'processed'
}

export enum LinkState {
  Undiscovered = 'undiscovered',
  Discovered = 'discovered'
}

export interface Node extends d3.SimulationNodeDatum {
  id: number
  state: NodeState
  children: Map<Node, Link>
  parent?: Node
  isPath: boolean
  isStart: boolean
  isEnd: boolean
  GetColor(): string
  Update(): void
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  source: Node
  target: Node
  value: number
  state: LinkState
  isPath: boolean
  GetColor(): string
  GetStrokeOpacity(): number
  Update(): void
}

export class Node implements Node {
  id: number
  state: NodeState
  children: Map<Node, Link>
  parent?: Node
  isPath: boolean
  isStart: boolean
  isEnd: boolean
  x?: number
  y?: number

  constructor(id: number) {
      this.id = id
      this.state = NodeState.Undiscovered
      this.children = new Map<Node, Link>()
      this.isPath = false
      this.isStart = false
      this.isEnd = false
  }

  public GetColor = () : string => {
      if (this.isStart) return 'yellow'
      if (this.isEnd) return 'green'
      if (this.isPath) return 'orange'
      switch (this.state) {
        case NodeState.Undiscovered:
            return '#999'
        case NodeState.Discovered:
            return 'red'
        case NodeState.Processed:
            return 'blue'
      }
  }

  public Update = () : void => {
      const node = d3.select(`circle[node-id='${this.id}']`)
      node?.attr('fill', this.GetColor())

      const label = d3.select(`text[label-id='${this.id}']`)
      label?.attr('fill', this.GetColor() === 'blue' ? 'white' : 'black')
  }
}

export class Link implements Link {
  source: Node
  target: Node
  value: number
  state: LinkState
  isPath: boolean

  constructor(source: Node, target: Node, value: number) {
      this.source = source
      this.target = target
      this.value = value
      this.state = LinkState.Undiscovered
      this.isPath = false
  }

  public GetColor = () : string => this.isPath ? 'orange' : '#999'	

  public GetStrokeOpacity = () : number => this.state === LinkState.Undiscovered ? 0.1 : 1

  public Update = () : void => {
      const link = d3.select(`line[link-id='${this.source.id}-${this.target.id}']`)
      link?.attr('stroke-opacity', this.GetStrokeOpacity())
      link?.attr('stroke', this.GetColor())
  }
}

export interface PriorityQueueElement {
  value: number
}
