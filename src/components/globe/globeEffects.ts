import type { GlobeInstance } from 'globe.gl';
import * as THREE from 'three';

export type GlobeEffect = {
  mesh?: THREE.Mesh;
  light?: THREE.Light;
  animationFrame?: number;
  dispose: () => void;
};

function createRimMaterial(color: string, power: number, intensity: number) {
  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(color) },
      power: { value: power },
      intensity: { value: intensity },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float power;
      uniform float intensity;

      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), power);
        float alpha = clamp(fresnel * intensity, 0.0, 1.0);
        gl_FragColor = vec4(glowColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
  });
}

export function addRimGlowLayer(world: GlobeInstance): GlobeEffect {
  const radius = world.getGlobeRadius() * 1.035;
  const geometry = new THREE.SphereGeometry(radius, 128, 128);
  const material = createRimMaterial('#33d9ff', 2.4, 1.25);
  const mesh = new THREE.Mesh(geometry, material);

  world.scene().add(mesh);

  return {
    mesh,
    dispose: () => {
      world.scene().remove(mesh);
      geometry.dispose();
      material.dispose();
    },
  };
}

export function addOuterGlowLayer(world: GlobeInstance): GlobeEffect {
  const radius = world.getGlobeRadius() * 1.07;
  const geometry = new THREE.SphereGeometry(radius, 128, 128);
  const material = createRimMaterial('#0b8dff', 3.2, 0.45);
  const mesh = new THREE.Mesh(geometry, material);

  world.scene().add(mesh);

  return {
    mesh,
    dispose: () => {
      world.scene().remove(mesh);
      geometry.dispose();
      material.dispose();
    },
  };
}

export function addCloudLayer(world: GlobeInstance): GlobeEffect {
  const texture = new THREE.TextureLoader().load('/textures/earth-clouds-4k.png');
  const geometry = new THREE.SphereGeometry(world.getGlobeRadius() * 1.006, 96, 96);
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  let animationFrame = 0;
  let disposed = false;

  world.scene().add(mesh);

  const rotate = () => {
    if (disposed) {
      return;
    }

    mesh.rotation.y += 0.00016;
    animationFrame = requestAnimationFrame(rotate);
  };
  rotate();

  return {
    mesh,
    get animationFrame() {
      return animationFrame;
    },
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      world.scene().remove(mesh);
      geometry.dispose();
      texture.dispose();
      material.dispose();
    },
  };
}

export function addSpaceLighting(world: GlobeInstance): GlobeEffect[] {
  const scene = world.scene();
  const directionLight = new THREE.DirectionalLight('#e6fbff', 1.05);
  directionLight.position.set(-260, 180, 220);

  const hemisphereLight = new THREE.HemisphereLight('#4cc9ff', '#020617', 0.38);
  const blueEdgeLight = new THREE.PointLight('#2dd8ff', 0.75, 520);
  blueEdgeLight.position.set(-170, 80, 210);

  scene.add(directionLight);
  scene.add(hemisphereLight);
  scene.add(blueEdgeLight);

  return [directionLight, hemisphereLight, blueEdgeLight].map((light) => ({
    light,
    dispose: () => {
      scene.remove(light);
      light.dispose?.();
    },
  }));
}

export function disposeGlobeEffect(effect: GlobeEffect): void {
  effect.dispose();
}
