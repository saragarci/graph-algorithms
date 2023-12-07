import * as d3 from 'd3'
import { Node, Link, NetworkType } from '../types'
import Network from '../utils/network'

class NetworkRenderer {
  private svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
  private nodes: Node[]
  private links: Link[]
  private chargeStrength: number = -7
  private linkStrength: number = 0.5
  private centerStrength: number = 0.5

  constructor(network: Network) {
    d3.select('#network-container').selectAll('svg').remove()
    this.svg = d3.select('#network-container')
      .append('svg')
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight)

    this.nodes = network.GetNodes()
    this.links = network.GetLinks()
    this.setStrengths(network.GetType())
    this.init()
  }
  
  private setStrengths = (type: NetworkType) : void => {
    if (type == NetworkType.Example) {
      this.chargeStrength = -1000
      this.linkStrength = 1
      this.centerStrength = 0.9
    }

    if (type == NetworkType.Small) {
      this.chargeStrength = -500
      this.linkStrength = 0.01
      this.centerStrength = 0.5
    }

    if (type == NetworkType.Medium) {
      this.chargeStrength = -32
      this.linkStrength = 0.35
      this.centerStrength = 0.5
    }

    if (type == NetworkType.Large) {
      this.chargeStrength = -8
      this.linkStrength = 0.35
      this.centerStrength = 0.5
    }
  }

  private init = () : void => {
    window.addEventListener('resize', () => this.handleResize())
    this.drawNetwork()
  }

  private drawNetwork = () : void => {
    const svg = this.svg
    const nodes: Node[] = this.nodes
    const links: Link[] = this.links

    // Clear SVG before drawing
    svg.selectAll('*').remove()

    // Create the graph layout
    const simulation = d3.forceSimulation<Node, Link>(nodes)
      .force('charge', d3.forceManyBody().strength(this.chargeStrength))
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(d => Math.sqrt(d.value)).strength(this.linkStrength))
      .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2).strength(this.centerStrength))
      .on('tick', ticked)

    // Calculate the max value from your links data
    const maxValue = d3.max(links, d => d.value);

    // Draw links
    const link = svg.append('g')
      .attr('stroke', '#999')
      .selectAll<SVGGElement, Link>('line')
      .data(links)
      .join('line')
      .attr('link-id', (d: Link) => `${d.source.id}-${d.target.id}`)
      .attr('stroke-width', (d: Link) => maxValue ? Math.sqrt(maxValue - d.value + 1) : 1)
      .attr('stroke-opacity', (d: Link) => d.GetStrokeOpacity())
      //.attr('stroke-length', (d: Link) => d.value)

    // Draw nodes
    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .selectAll<SVGCircleElement, Node>('circle')
      .data(nodes)
      .join('circle')
      .attr('node-id', d => d.id)
      .attr('r', 6) // radius
      .attr('fill', d => d.GetColor())

    // Add labels
    const label = svg.selectAll('text')
      .data(nodes)
      .enter().append('text')
      .attr('font-size', 6)
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', 'black')
      .text(d => d.id)
      .attr('label-id', d => d.id)

    // const linkLabels = svg.append("g")
    //   .attr("class", "link-labels")
    //   .selectAll(".link-label")
    //   .data(links)
    //   .enter().append("text")
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", 6)
    //   .attr("fill", "white")
    //   .text(d => d.value)

    // Add a drag behavior.
    node.call(d3.drag<SVGCircleElement, Node, unknown>()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded)
    )

    // Set the position attributes of links and nodes each time the simulation ticks.
    function ticked() {
      link
        .attr('x1', (d: Link) => d.source.x!)
        .attr('y1', (d: Link) => d.source.y!)
        .attr('x2', (d: Link) => d.target.x!)
        .attr('y2', (d: Link) => d.target.y!)
    
      node
        .attr('cx', (d: Node) => d.x!)
        .attr('cy', (d: Node) => d.y!)

      node
        .attr('cx', function(d: Node) { return d.x = Math.max(20, Math.min(window.innerWidth - 20, d.x!)) })
        .attr('cy', function(d: Node) { return d.y = Math.max(20, Math.min(window.innerHeight - 20, d.y!)) });
    
      label
        .attr('x', (d: Node) => d.x!)
        .attr('y', (d: Node) => d.y!)

      // linkLabels
      //   .attr("x", (d: Link) => (d.source.x! + d.target.x!) / 2)
      //   .attr("y", (d: Link) => (d.source.y! + d.target.y!) / 2);
    }

    function dragStarted(event: d3.D3DragEvent<SVGCircleElement, Node, undefined>, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }
    
    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, undefined>, d: Node) {
      d.fx = event.x
      d.fy = event.y
    }
    
    function dragEnded(event: d3.D3DragEvent<SVGCircleElement, Node, undefined>, d: Node) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

  }

  private handleResize = () : void => {
    this.drawNetwork()
  }
}

export default NetworkRenderer
