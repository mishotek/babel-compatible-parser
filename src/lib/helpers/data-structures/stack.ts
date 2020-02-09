export class Stack<T> {

    constructor(private items: Array<T> = []) { }

    public get length(): number {
        return this.items.length;
    }

    public get isEmpty(): boolean {
        return this.length === 0;
    }

    public top(): T {
        if (this.isEmpty) {
            throw new Error('Stack is empty!');
        }

        return this.items[this.length - 1];
    }

    public pop(): T {
        const top = this.top();
        this.items = this.items.slice(0, this.length - 1);

        return top;
    }

    public push(item: T): void {
        this.items.push(item);
    }
}