import AdjacencyList from "./utils/adjacencyList"
import Network from "./utils/network"
import NetworkRenderer from "./viz/networkRenderer"
import { Link, Node } from "./types"
import Bfs from "./algorithms/Bfs";

class App {
  nodes: Node[] = [];
  links: Link[] = [];
  adjacencyList: AdjacencyList = new AdjacencyList();
  network: Network = new Network();

  constructor() {
    this.initializeNetwork();
    this.setUpButtons();
  }

  private initializeNetwork = () : void => {
    const adjacencyListData = this.adjacencyList.GetAdjacencyList();
    const { nodes, links } = this.network.CreateNetwork(adjacencyListData);
    this.nodes = nodes;  // Store nodes in a class field for later use
    this.links = links;
    new NetworkRenderer(nodes, links);
  }

  private setUpButtons = () : void => {
    const self = this;
    document.addEventListener("DOMContentLoaded", function() {
      const runBfsButton = document.getElementById("runBfsButton");
    
      if (runBfsButton) {
        runBfsButton.addEventListener("click", () => {
          const bfs = new Bfs();
          bfs.FindShortestPath(self.nodes, 0, 5);
        });
      }
    });
  }
}

export default App;
