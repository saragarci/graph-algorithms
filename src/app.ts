import AdjacencyList from './utils/adjacencyList'
import Network from './utils/network'
import NetworkRenderer from './viz/networkRenderer'
import { Link, Node } from './types'
import Bfs from './algorithms/Bfs'

class App {
  nodes: Node[] = []
  links: Link[] = []
  adjacencyList: AdjacencyList = new AdjacencyList()
  network: Network = new Network(this.adjacencyList.GetAdjacencyList())
  delay: number = 1000

  constructor() {
    this.renderNetwork()
    this.setUpButtons()
  }

  private renderNetwork = () : void => {
    new NetworkRenderer(this.network.nodes, this.network.links)
  }

  private setUpButtons = () : void => {
    const self = this
    document.addEventListener('DOMContentLoaded', function() {
      const runBfsButton = document.getElementById('runBfsButton')
      if (runBfsButton) {
        runBfsButton.addEventListener('click', () => {
          const bfs = new Bfs(self.delay)
          bfs.FindShortestPath(self.network.nodes, 0, 5)
            .then(() => self.network.DrawShortestPath(0, 5))
        })
      }
    })
  }
}

export default App
