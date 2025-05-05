// Lighting calculations using Phong model
const vec3 = glMatrix.vec3;

// Material properties
class Material {
    constructor(ambient, diffuse, specular, shininess) {
        if (!ambient || !diffuse || !specular) {
            throw new Error('Material requires ambient, diffuse, and specular properties');
        }
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.shininess = shininess || 32.0;
    }
}

// Light properties
class Light {
    constructor(position, ambient, diffuse, specular) {
        if (!position) {
            throw new Error('Light requires position');
        }
        this.position = position;
        this.ambient = ambient || { r: 0.2, g: 0.2, b: 0.2 };
        this.diffuse = diffuse || { r: 0.8, g: 0.8, b: 0.8 };
        this.specular = specular || { r: 1.0, g: 1.0, b: 1.0 };
    }
}

// Calculate ambient component
function calculateAmbient(material, light) {
    if (!material || !light) {
        throw new Error('Material and light are required for ambient calculation');
    }
    return {
        r: material.ambient.r * light.ambient.r,
        g: material.ambient.g * light.ambient.g,
        b: material.ambient.b * light.ambient.b
    };
}

// Calculate diffuse component
function calculateDiffuse(material, light, normal, lightDir) {
    if (!material || !light || !normal || !lightDir) {
        throw new Error('All parameters are required for diffuse calculation');
    }
    const dotProduct = Math.max(dot(normal, lightDir), 0);
    return {
        r: material.diffuse.r * light.diffuse.r * dotProduct,
        g: material.diffuse.g * light.diffuse.g * dotProduct,
        b: material.diffuse.b * light.diffuse.b * dotProduct
    };
}

// Calculate specular component
function calculateSpecular(material, light, normal, lightDir, viewDir) {
    if (!material || !light || !normal || !lightDir || !viewDir) {
        throw new Error('All parameters are required for specular calculation');
    }
    const reflectDir = reflect(lightDir, normal);
    const spec = Math.pow(Math.max(dot(viewDir, reflectDir), 0), material.shininess);
    return {
        r: material.specular.r * light.specular.r * spec,
        g: material.specular.g * light.specular.g * spec,
        b: material.specular.b * light.specular.b * spec
    };
}

// Calculate reflection vector
function reflect(incident, normal) {
    if (!incident || !normal) {
        throw new Error('Incident and normal vectors are required');
    }
    const dotProduct = dot(incident, normal);
    return subtract(scale(normal, 2 * dotProduct), incident);
}

// Calculate final color using Phong model
function calculatePhongColor(material, light, normal, lightDir, viewDir) {
    if (!material || !light || !normal || !lightDir || !viewDir) {
        throw new Error('All parameters are required for Phong calculation');
    }
    const ambient = calculateAmbient(material, light);
    const diffuse = calculateDiffuse(material, light, normal, lightDir);
    const specular = calculateSpecular(material, light, normal, lightDir, viewDir);

    return {
        r: Math.min(ambient.r + diffuse.r + specular.r, 1.0),
        g: Math.min(ambient.g + diffuse.g + specular.g, 1.0),
        b: Math.min(ambient.b + diffuse.b + specular.b, 1.0)
    };
} 