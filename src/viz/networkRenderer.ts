import * as d3 from 'd3';
import { Node, Link, State } from "../types";

class NetworkRenderer {
  private svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  private width: number;
  private height: number;
  private nodes: Node[];
  private links: Link[];

  constructor(nodes: Node[], links: Link[]) {
    this.width = window.innerWidth;
    this.height = 500; //window.innerHeight;

    this.svg = d3.select('body') // Assuming you have a body tag in your HTML
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.nodes = nodes;
    this.links = links;
    this.init();
  }

  private init = (): void => {
    // Create SVG element
    // this.svg = d3.select('body') // Assuming you have a body tag in your HTML
    //   .append('svg')
    //   .attr('width', this.width)
    //   .attr('height', this.height);

    // Listen to window resize events
    window.addEventListener('resize', () => this.handleResize());
    
    // Initial drawing
    this.drawNetwork();
  }

  drawNetwork = () => {
    const svg = this.svg;
    const nodes: Node[] = this.nodes;
    const links: Link[] = this.links;

    // Clear SVG before drawing
    svg.selectAll("*").remove();

    // Create the graph layout
    const simulation = d3.forceSimulation<Node, Link>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))
      .on("tick", ticked);

    // Draw links
    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d: Link) => Math.sqrt(d.value));

    // Draw nodes
    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll<SVGCircleElement, Node>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 5) // radius
      .attr("fill", d => {
        if (d.isStart) return "yellow";
        if (d.isEnd) return "pink";
        if (d.isPath) return "orange";
        switch (d.state) {
          case State.Undiscovered:
            return "blue";
          case State.Discovered:
            return "green";
          case State.Processed:
            return "red";
          default:
            return "black";
        }
      });

    // Adds a tootltip with the node id
    node.append("title")
        .text(d => d.id);

    // Add labels
    const label = svg.selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("dy", -15)
      .attr("fill", "green")
      .text(d => d.id);

    // Add a drag behavior.
    node.call(d3.drag<SVGCircleElement, Node, unknown>()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded)
    );

    // Set the position attributes of links and nodes each time the simulation ticks.
    function ticked() {
      link
        .attr("x1", (d: Link) => d.source.x!)
        .attr("y1", (d: Link) => d.source.y!)
        .attr("x2", (d: Link) => d.target.x!)
        .attr("y2", (d: Link) => d.target.y!);
    
      node
        .attr("cx", (d: Node) => d.x!)
        .attr("cy", (d: Node) => d.y!);
    
      label
        .attr("x", (d: Node) => d.x!)
        .attr("y", (d: Node) => d.y!);
    }

    function dragStarted(event: d3.D3DragEvent<SVGCircleElement, Node, undefined>, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, undefined>, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragEnded(event: d3.D3DragEvent<SVGCircleElement, Node, undefined>, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }

  private handleResize = (): void => {
    this.width = window.innerWidth;
    // Perform any additional tasks here...
    this.drawNetwork();
  }
};

export default NetworkRenderer;
