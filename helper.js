// Vector and Matrix operations using gl-matrix
const vec3 = glMatrix.vec3;
const mat4 = glMatrix.mat4;

// Vector operations
function add(a, b) {
    return vec3.add(vec3.create(), a, b);
}

function subtract(a, b) {
    return vec3.subtract(vec3.create(), a, b);
}

function scale(v, s) {
    return vec3.scale(vec3.create(), v, s);
}

function normalize(v) {
    return vec3.normalize(vec3.create(), v);
}

function dot(a, b) {
    return vec3.dot(a, b);
}

function length(v) {
    return vec3.length(v);
}

// Ray structure
class Ray {
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }
}

// Sphere structure
class Sphere {
    constructor(center, radius, color) {
        this.center = center;
        this.radius = radius;
        this.color = color || { r: 255, g: 0, b: 0 }; // Default red
    }
}

// Ray-Sphere intersection
function intersectRaySphere(ray, sphere) {
    const oc = subtract(ray.origin, sphere.center);
    const a = dot(ray.direction, ray.direction);
    const b = 2.0 * dot(oc, ray.direction);
    const c = dot(oc, oc) - sphere.radius * sphere.radius;
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        return -1; // No intersection
    }

    const t = (-b - Math.sqrt(discriminant)) / (2.0 * a);
    return t;
}

// Find closest intersection among multiple spheres
function findClosestIntersection(ray, spheres) {
    let closestT = Infinity;
    let closestSphere = null;

    for (const sphere of spheres) {
        const t = intersectRaySphere(ray, sphere);
        if (t > 0 && t < closestT) {
            closestT = t;
            closestSphere = sphere;
        }
    }

    return { t: closestT, sphere: closestSphere };
} 