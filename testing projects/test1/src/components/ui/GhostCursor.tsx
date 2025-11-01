import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BufferAttribute, BufferGeometry, Points, ShaderMaterial } from 'three';

const GhostCursor = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;
    
    let mouse = new THREE.Vector2();
    let targetMouse = new THREE.Vector2();

    const particles = 50;
    const geometry = new BufferGeometry();
    const positions = new Float32Array(particles * 3);
    const opacities = new Float32Array(particles);

    for (let i = 0; i < particles; i++) {
        positions[i * 3] = positions[i * 3 + 1] = positions[i * 3 + 2] = 0;
        opacities[i] = 0;
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('opacity', new BufferAttribute(opacities, 1));
    
    const vertexShader = `
      attribute float opacity;
      varying float vOpacity;
      void main() {
        vOpacity = opacity;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = (1.0 - opacity) * 20.0 + 5.0;
      }
    `;

    const fragmentShader = `
      varying float vOpacity;
      void main() {
        gl_FragColor = vec4(0.81, 0.77, 0.61, vOpacity * 0.5); // Sunstone gold-ish
      }
    `;

    const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
    });

    const points = new Points(geometry, material);
    scene.add(points);

    const onMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;
      
      const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
      const opacityAttribute = geometry.getAttribute('opacity') as THREE.BufferAttribute;
      
      for(let i = particles - 1; i > 0; i--) {
        positionAttribute.setX(i, positionAttribute.getX(i-1));
        positionAttribute.setY(i, positionAttribute.getY(i-1));
        opacityAttribute.setX(i, opacityAttribute.getX(i-1));
      }

      const worldPos = new THREE.Vector3(mouse.x, mouse.y, 0).unproject(camera);
      positionAttribute.setXYZ(0, worldPos.x, worldPos.y, 0);
      opacityAttribute.setX(0, 1);
      
      for (let i = 0; i < particles; i++) {
        opacityAttribute.setX(i, opacityAttribute.getX(i) * 0.95);
      }
      
      positionAttribute.needsUpdate = true;
      opacityAttribute.needsUpdate = true;
      
      renderer.render(scene, camera);
    };

    animate();
    
    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }} />;
};

export default GhostCursor;