// Light
export { PointLight } from './light/PointLight.js';

// Material
export {
    PhongMaterial,
    PhongMaterialParameters,
} from './material/PhongMaterial.js';

// Math
export * as Common from './math/Common.js';
export { Matrix3 } from './math/Matrix3.js';
export { Matrix4 } from './math/Matrix4.js';
export { Point } from './math/Point.js';
export { Vector } from './math/Vector.js';

// Objects
export { Plane } from './objects/Plane.js';
export { SceneObject } from './objects/SceneObject.js';
export { Sphere } from './objects/Sphere.js';

// Paint
export { Canvas } from './paint/Canvas.js';
export { Color } from './paint/Color.js';
export * as Coordinates from './paint/Coordinates.js';
export { Renderer } from './paint/Renderer.js';

// Pattern
export { Pattern } from './pattern/Pattern.js';
export { SolidPattern } from './pattern/SolidPattern.js';
export { StripePattern } from './pattern/StripePattern.js';

// Scene
export { Camera } from './scene/Camera.js';
export { Scene } from './scene/Scene.js';

// Trace
export { Intersection } from './trace/Intersection.js';
export { Ray } from './trace/Ray.js';
export { RayTracer } from './trace/RayTracer.js';
