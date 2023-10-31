// Code taken from the book

class UnionFind {
    private id: number[]
    private sz: number[]
    private n: number

    constructor(n: number) {
        this.n = n
        this.id = []
        this.sz = []
        for (let i = 0; i < this.n; ++i) {
            this.id[i] = i
            this.sz[i] = 1
        }
    }

    public Find = (idx: number) : number => {
        while (this.id[idx] != idx) { // We are not yet in root. Label and id must match
            idx = this.id[idx]
        }
        return idx
    }

    public UnionSets = (s1: number, s2: number) : void => {
        let root1 = this.Find(s1)
        let root2 = this.Find(s2) 

        if (root1 == root2)
            return // Already in the same set

        // To minimize the tree height, make the smaller tree the subtree of the bigger one.
        if (this.sz[root1] >= this.sz[root2]) {
            this.sz[root1] += this.sz[root2]
            this.id[root2] = root1
        } else {
            this.sz[root2] += this.sz[root1]
            this.sz[root1] = root2
        }
    }

    public SameComponent = (s1: number, s2: number) : boolean => {
        return this.Find(s1) == this.Find(s2)
    }
}

export default UnionFind
