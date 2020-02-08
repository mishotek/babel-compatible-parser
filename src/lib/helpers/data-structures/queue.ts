export class Queue<T> {

    private queue: Array<T>;
    private nextPopIndex = 0;

    constructor(items: Array<T> = []) {
        this.queue = items;
    }

    protected reconstruct(items: Array<T> = []) {
        this.queue = items;
        this.nextPopIndex = 0;
    }

    public enqueue(item: T): void {
        this.queue.push(item);
    }

    public dequeue(): T {
        return this.queue[this.nextPopIndex++];
    }
}