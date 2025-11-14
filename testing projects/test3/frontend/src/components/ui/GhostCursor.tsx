import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_intensity;

  void main() {
    float dst = distance(vUv, u_mouse);
    float alpha = smoothstep(0.2, 0.0, dst) * u_intensity;
    gl_FragColor = vec4(0.82, 0.63, 0.23, alpha);
  }
`;

export default function GhostCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const trail = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    if(containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
    }
    
    const geometry = new THREE.PlaneGeometry(64, 64);
    
    const onMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX - window.innerWidth / 2;
      mouse.current.y = window.innerHeight / 2 - event.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (trail.current.length < 15) {
        const material = new THREE.ShaderMaterial({
          uniforms: {
            u_mouse: { value: new THREE.Vector2(mouse.current.x, mouse.current.y) },
            u_time: { value: elapsedTime },
            u_intensity: { value: 1.0 },
          },
          vertexShader,
          fragmentShader,
          transparent: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(mouse.current.x, mouse.current.y, 0);
        scene.add(mesh);
        trail.current.push(mesh);
      }

      trail.current.forEach((mesh, index) => {
        const material = mesh.material as THREE.ShaderMaterial;
        material.uniforms.u_intensity.value = 1.0 - (trail.current.length - 1 - index) / 15.0;
        
        if(index === trail.current.length - 1) {
            mesh.position.set(mouse.current.x, mouse.current.y, 0)
        } else {
            const nextMesh = trail.current[index+1];
            const newPos = mesh.position.clone().lerp(nextMesh.position, 0.2);
            mesh.position.set(newPos.x, newPos.y, 0);
        }
      });
      
      if (trail.current.length > 15) {
        const oldestMesh = trail.current.shift();
        if(oldestMesh) scene.remove(oldestMesh);
      }

      renderer.render(scene, camera);
    };

    animate();
    
    const handleResize = () => {
        camera.left = window.innerWidth / -2;
        camera.right = window.innerWidth / 2;
        camera.top = window.innerHeight / 2;
        camera.bottom = window.innerHeight / -2;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if(containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }} />;
}