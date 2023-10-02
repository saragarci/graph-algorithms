import { Link, NetworkType, Node } from '../types'
import AdjacencyList from './adjacencyList'

class Network {
    private nodes: Node[] = []
    private links: Link[] = []
    private type: NetworkType = NetworkType.Example

    constructor(adjacencyList: AdjacencyList) {
        // Create nodes based on the length of the adjacency list
        const adjacencyListMatrix = adjacencyList.GetAdjacencyList()
        for (let i = 0; i < adjacencyListMatrix.length; i++) {
            this.nodes.push(new Node(i))
        }
  
        // Create links based on the adjacency list
        for (let i = 0; i < adjacencyListMatrix.length; i++) {
            for (let j = i+1; j < adjacencyListMatrix[i].length; j++) {
                const value: number = adjacencyListMatrix[i][j]
                if (value) {
                    const source: Node = this.nodes[i]
                    const target: Node = this.nodes[j]
                    const link: Link = new Link(source, target, value)
                    this.links.push(link)
                    source.children.set(target, link)

                    // Add the link to the target's children
                    const reverseLink: Link = new Link(target, source, value)
                    target.children.set(source, reverseLink)
                    this.links.push(reverseLink)
                }
            }
        }

        this.type = adjacencyList.GetNetworkType()
    }

    public GetNodes = () : Node[] => this.nodes
    
    public GetLinks = () : Link[] => this.links

    public GetType = () : NetworkType => this.type

    public SetStartAndEndNodes = (start: number, end: number) : void => { 
        const startNode = this.nodes[start]
        startNode.isStart = true
        startNode.Update()
        
        const endNode = this.nodes[end]
        endNode.isEnd = true
        endNode.Update()
    }

    public DrawShortestPath = (start: number, end: number) : Number[] => {
        const startNode = this.nodes[start]
        const endNode = this.nodes[end]
        let currentNode = endNode
        
        let path: Number[] = []
        while (currentNode && currentNode !== startNode) {
            // update node
            currentNode.isPath = true
            currentNode.Update()
            path.push(currentNode.id)
            
            const parent = currentNode.parent
            if (parent) {
                // update link
                let link = parent.children.get(currentNode)
                if (link) {
                    link.isPath = true
                    link.Update()
                }

                currentNode = parent
            } else {
                break
            }
        }
        path.push(startNode.id)
        return path.reverse()
    }
}

export default Network
