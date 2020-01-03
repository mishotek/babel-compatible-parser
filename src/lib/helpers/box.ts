export class Box<T> {

    constructor(private value: T) { }

    public map<Y>(mappingFn: (value: T) => Y): Box<Y> {
        return new Box<Y>(mappingFn(this.value));
    }

    public fold<Y>(mappingFn: (value: T) => Y): Y {
        return mappingFn(this.value);
    }
}