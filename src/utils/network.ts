import { Link, NetworkType, Node } from '../types'
import AdjacencyMatrix from './adjacencyMatrix'

class Network {
    private nodes: Node[] = []
    private links: Link[] = []
    private type: NetworkType = NetworkType.Example

    constructor(adjacencyMatrix: AdjacencyMatrix) {
        // Create nodes based on the length of the adjacency matrix
        const matrix = adjacencyMatrix.GetAdjacencyMatrix()
        for (let i = 0; i < matrix.length; i++) {
            this.nodes.push(new Node(i))
        }
  
        // Create links based on the adjacency matrix
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                const value: number = matrix[i][j]
                if (value) {
                    const source: Node = this.nodes[i]
                    const target: Node = this.nodes[j]
                    const link: Link = new Link(source, target, value)
                    this.links.push(link)
                    source.children.set(target, link)
                }
            }
        }

        this.type = adjacencyMatrix.GetNetworkType()
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
        let currentNode: Node = this.nodes[end]
        let path: Number[] = []
        while (currentNode) {
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
        return path.reverse()
    }
}

export default Network
