import { Link, Node } from "../types"

class Network {
    CreateNetwork = (adjacencyList: number[][]) => {
        const nodes: Node[] = [];
        const links: Link[] = [];

        // Create nodes based on the length of the adjacency list
        for (let i = 0; i < adjacencyList.length; i++) {
            nodes.push(new Node(i));
        }
  
        // Create links based on the adjacency list
        for (let i = 0; i < adjacencyList.length; i++) {
            for (let j = i+1; j < adjacencyList[i].length; j++) {
                if (adjacencyList[i][j] != 0) {
                    nodes[i].children.push(nodes[j]);
                    const link: Link = { source: nodes[i], target: nodes[j], value: 1 };
                    links.push(link);
                }
            }
        }
  
        return { nodes, links };
    }
}

export default Network;
