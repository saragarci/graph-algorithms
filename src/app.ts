import AdjacencyList from "./utils/adjacencyList"
import Network from "./utils/network"
import NetworkRenderer from "./viz/networkRenderer"
import { Link, Node, State } from "./types"
// import Bfs from './Bfs';

class App {
  nodes: Node[] = [];
  links: Link[] = [];
  adjacencyList: AdjacencyList = new AdjacencyList();
  network: Network = new Network();

  constructor() {
    this.initializeNetwork();
  }

  private initializeNetwork = () : void => {
    const adjacencyListData = this.adjacencyList.GetAdjacencyList();
    const { nodes, links } = this.network.CreateNetwork(adjacencyListData);
    this.nodes = nodes;  // Store nodes in a class field for later use
    this.links = links;
    new NetworkRenderer(nodes, links);
  }
}

export default App;
