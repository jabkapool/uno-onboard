class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

export { Point, Point3d };