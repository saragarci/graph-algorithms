import Dijkstra from '../Dijkstra'
import { NetworkType } from '../../types'
import { Examples } from '../../utils/exampleAdjacencyList';
import Network from '../../utils/network';
import AdjacencyList from '../../utils/adjacencyList';

jest.mock('d3', () => {
    return {
        select: jest.fn().mockReturnValue({
            attr: jest.fn(),
        }),
        SimulationNodeDatum: jest.fn(),
        SimulationLinkDatum: jest.fn(),
    };
});

describe('Dijkstra Tests', () => {
    let dijkstra: Dijkstra

    beforeEach(() => {
        dijkstra = new Dijkstra(0) // 0 delay for tests to run quickly
    })

    test('should find the shortest path - Example 1', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example1))
        const start = 0
        const end = 5

        // Act
        await dijkstra.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)

        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath : Number[] = [0, 1, 4, 5]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 2', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example2))
        const start = 0
        const end = 6
        
        // Act
        await dijkstra.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 4, 6]
        //expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 3', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example3))
        const start = 0
        const end = 14
        
        // Act
        await dijkstra.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 5, 14]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 4', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example4))
        const start = 0
        const end = 14
        
        // Act
        await dijkstra.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 5', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example5))
        const start = 0
        const end = 1
        
        // Act
        await dijkstra.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 6', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example6))
        const start = 0
        const end = 0
        
        // Act
        await dijkstra.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 7', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example7))
        const start = 0
        const end = 14
        
        // Act
        await dijkstra.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 4, 6, 7, 8, 10, 12, 14]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 29
        
        // Act
        await dijkstra.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 6, 14, 29]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 9', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example9))
        const start = 0
        const end = 6
        
        // Act
        await dijkstra.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 3, 4, 5, 6]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 10', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example10))
        const start = 0
        const end = 5
        
        // Act
        await dijkstra.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 1, 3, 4, 5]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })
})