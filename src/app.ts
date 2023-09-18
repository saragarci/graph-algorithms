import AdjacencyList from './utils/adjacencyList'
import Network from './utils/network'
import NetworkRenderer from './viz/networkRenderer'
import { Link, NetworkType, Node } from './types'
import Bfs from './algorithms/Bfs'

class App {
  nodes: Node[] = []
  links: Link[] = []
  adjacencyList: AdjacencyList = new AdjacencyList(NetworkType.Example)
  network: Network = new Network(this.adjacencyList)
  delay: number = 100

  constructor() {
    this.renderNetwork()
    this.setUpButtons()
  }

  private renderNetwork = () : void => {
    console.log('rendering network'	)
    new NetworkRenderer(this.network)
  }

  private setUpButtons = () : void => {
    const self = this
    document.addEventListener('DOMContentLoaded', function() {
      // Create network
      const exampleNetworkBtn = document.getElementById('example-network')
      const smallNetworkBtn = document.getElementById('small-network')
      const mediumNetworkBtn = document.getElementById('medium-network')
      const largeNetworkBtn = document.getElementById('large-network')
      exampleNetworkBtn?.addEventListener('click', () => { self.createNetwork(NetworkType.Example) })
      smallNetworkBtn?.addEventListener('click', () => { self.createNetwork(NetworkType.Small) })
      mediumNetworkBtn?.addEventListener('click', () => { self.createNetwork(NetworkType.Medium) })
      largeNetworkBtn?.addEventListener('click', () => { self.createNetwork(NetworkType.Large) })
  
      // BFS
      const runBfsButton = document.getElementById('runBfsButton')
      runBfsButton?.addEventListener('click', () => {
        const bfs = new Bfs(self.delay)
        bfs.FindShortestPath(self.network.GetNodes(), 0, 5)
          .then(() => self.network.DrawShortestPath(0, 5))
      })
    })
  }

  private createNetwork = (type: NetworkType) : void => {
    this.adjacencyList = new AdjacencyList(type)
    this.network = new Network(this.adjacencyList)
    this.renderNetwork()
  }
}

export default App
