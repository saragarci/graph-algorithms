import { Link, Node } from '../types'

class Network {
    nodes: Node[] = []
    links: Link[] = []

    constructor(adjacencyList: number[][]) {
        // Create nodes based on the length of the adjacency list
        for (let i = 0; i < adjacencyList.length; i++) {
            this.nodes.push(new Node(i))
        }
  
        // Create links based on the adjacency list
        for (let i = 0; i < adjacencyList.length; i++) {
            for (let j = i+1; j < adjacencyList[i].length; j++) {
                const value: number = adjacencyList[i][j]
                if (value) {
                    const source: Node = this.nodes[i]
                    const target: Node = this.nodes[j]
                    const link: Link = new Link(source, target, value)
                    this.links.push(link)
                    source.children.set(target, link)
                }
            }
        }
    }

    public DrawShortestPath = (start: number, end: number) => {
        const startNode = this.nodes[start]
        startNode.isStart = true
        startNode.Update()
        
        const endNode = this.nodes[end]
        endNode.isEnd = true
        endNode.Update()
        
        let currentNode = endNode
        while (currentNode && currentNode !== startNode) {
            // update node
            currentNode.isPath = true
            currentNode.Update()
            
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
                return
            }
        }
    }
}

export default Network
