import Prim from '../Prim'
import { NetworkType } from '../../types'
import { Examples } from '../../utils/exampleAdjacencyMatrix';
import Network from '../../utils/network';
import AdjacencyMatrix from '../../utils/adjacencyMatrix';

jest.mock('d3', () => {
    return {
        select: jest.fn().mockReturnValue({
            attr: jest.fn(),
        }),
        SimulationNodeDatum: jest.fn(),
        SimulationLinkDatum: jest.fn(),
    };
});

describe('Prim Tests', () => {
    let prim: Prim

    beforeEach(() => {
        prim = new Prim(0) // 0 delay for tests to run quickly
    })

    test('should find the shortest path - Example 1: (0, 5)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example1))
        const start = 0
        const end = 5

        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)

        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath : Number[] = [0, 1, 4, 5]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 2: (0, 6)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example2))
        const start = 0
        const end = 6
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 4, 6]
        //expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 3: (0, 14)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example3))
        const start = 0
        const end = 14
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 5, 14]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 4: (0, 14)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example4))
        const start = 0
        const end = 14
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 5: (0, 1)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example5))
        const start = 0
        const end = 1
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 6: (0, 0)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example6))
        const start = 0
        const end = 0
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 7: (0, 14)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example7))
        const start = 0
        const end = 14
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 4, 6, 7, 8, 10, 12, 14]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 15)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 15
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 3, 7, 15]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 16)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 16
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 3, 7, 16]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 17)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 17
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 3, 8, 17]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 18)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 18
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 3, 8, 18]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 19)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 19
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 4, 9, 19]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 20)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 20
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 4, 9, 20]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 21)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 21
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 4, 10, 21]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 22)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 22
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 4, 10, 22]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 23)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 23
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 5, 11, 23]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 24)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 24
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 5, 11, 24]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 25)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 25
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 5, 12, 25]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 26)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 26
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 5, 12, 26]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 27)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 27
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 6, 13, 27]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 28)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 28
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 6, 13, 28]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 8: (0, 29)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example8))
        const start = 0
        const end = 29
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 6, 14, 29]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 9: (0, 1)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example9))
        const start = 0
        const end = 1
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 9: (0, 6)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example9))
        const start = 0
        const end = 6
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 3, 4, 5, 6]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 10: (0, 5)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example10))
        const start = 0
        const end = 5
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 2, 1, 3, 4, 5]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 11: (0, 2)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example11))
        const start = 0
        const end = 2
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 3, 2]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })

    test('should find the shortest path - Example 11: (0, 4)', async () => {
        // Arrange
        const network = new Network(new AdjacencyMatrix(NetworkType.Example, Examples.Example11))
        const start = 0
        const end = 4
        
        // Act
        await prim.FindShortestPath(network.GetNodes(), network.GetLinks(), start, end)
        
        // Assert
        const shortestPath = network.DrawShortestPath(start, end)
        const expectedShortestPath: Number[] = [0, 1, 3, 4]
        expect(shortestPath).toStrictEqual(expectedShortestPath)
    })
})
