import type { GlobeInstance } from 'globe.gl';
import * as THREE from 'three';

export type EarthRimMesh = THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;

export function createEarthRimMesh(world: GlobeInstance): EarthRimMesh {
  const radius = world.getGlobeRadius() * 1.006;
  const geometry = new THREE.SphereGeometry(radius, 128, 128);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color('#b8f7ff') },
      sunDirection: { value: new THREE.Vector3(-0.45, 0.65, 0.55).normalize() },
      power: { value: 10 },
      intensity: { value: 0.8 },
      dayBoost: { value: 1.2 },
      nightBoost: { value: 0.45 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform vec3 sunDirection;
      uniform float power;
      uniform float intensity;
      uniform float dayBoost;
      uniform float nightBoost;

      varying vec3 vNormal;
      varying vec3 vWorldNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 worldNormal = normalize(vWorldNormal);
        vec3 viewDir = normalize(vViewPosition);
        float facing = max(dot(normal, viewDir), 0.0);
        float rim = pow(1.0 - facing, power);
        float sunAmount = smoothstep(-0.22, 0.82, dot(worldNormal, normalize(sunDirection)));
        float lightBias = mix(nightBoost, dayBoost, sunAmount);
        float alpha = clamp(rim * intensity * lightBias, 0.0, 0.82);
        gl_FragColor = vec4(glowColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    depthWrite: false,
    depthTest: true,
  });
  const mesh = new THREE.Mesh(geometry, material);

  world.scene().add(mesh);
  return mesh;
}

export function disposeEarthRimMesh(world: GlobeInstance, mesh: EarthRimMesh): void {
  world.scene().remove(mesh);
  mesh.geometry.dispose();
  mesh.material.dispose();
}

export function syncScreenAtmosphere(world: GlobeInstance, haloEl: HTMLElement): void {
  const camera = world.camera() as THREE.Camera;
  const renderer = world.renderer();
  const canvas = renderer.domElement;
  const width = canvas.clientWidth || canvas.width;
  const height = canvas.clientHeight || canvas.height;

  if (!width || !height) {
    return;
  }

  const center = new THREE.Vector3(0, 0, 0).project(camera);
  const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0).normalize();
  const edge = right.multiplyScalar(world.getGlobeRadius()).project(camera);

  const centerX = (center.x * 0.5 + 0.5) * width;
  const centerY = (-center.y * 0.5 + 0.5) * height;
  const edgeX = (edge.x * 0.5 + 0.5) * width;
  const edgeY = (-edge.y * 0.5 + 0.5) * height;
  const radius = Math.hypot(edgeX - centerX, edgeY - centerY);

  haloEl.style.setProperty('--halo-x', `${centerX}px`);
  haloEl.style.setProperty('--halo-y', `${centerY}px`);
  haloEl.style.setProperty('--halo-r', `${Math.max(120, radius)}px`);
}
