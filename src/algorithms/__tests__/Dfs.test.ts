import Dfs from '../Dfs'
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

describe('Dfs Tests', () => {
    let dfs: Dfs

    beforeEach(() => {
        dfs = new Dfs(0) // 0 delay for tests to run quickly
    })

    test('should find the shortest path - Example 1', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example1))
        const start = 0
        const end = 5

        // Act
        await dfs.FindShortestPath(network.GetNodes(), start, end)

        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath : Number[] = [0, 1, 2, 3, 4, 5]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 2', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example2))
        const start = 0
        const end = 6
        
        // Act
        await dfs.FindShortestPath(network.GetNodes(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 2, 3, 5, 6]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 3', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example3))
        const start = 0
        const end = 14
        
        // Act
        await dfs.FindShortestPath(network.GetNodes(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 4', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example4))
        const start = 0
        const end = 14
        
        // Act
        await dfs.FindShortestPath(network.GetNodes(), start, end)
        
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
        await dfs.FindShortestPath(network.GetNodes(), start, end)
        
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
        await dfs.FindShortestPath(network.GetNodes(), start, end)
        
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
        await dfs.FindShortestPath(network.GetNodes(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 3, 2, 4, 5, 6, 7, 8, 10, 12, 13, 14]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8', async () => {
        // Arrange
        const network = new Network(new AdjacencyList(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 29
        
        // Act
        await dfs.FindShortestPath(network.GetNodes(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 3, 7, 15, 9, 4, 10, 16, 19, 13, 6, 2, 5, 11, 20, 14, 8, 17, 26, 12, 25, 29] 
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })
})
