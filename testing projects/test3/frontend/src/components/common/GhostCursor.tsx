import React, { useEffect, useRef } from 'react';
    import * as THREE from 'three';

    const GhostCursor: React.FC = () => {
        const containerRef = useRef<HTMLDivElement>(null);
        const animationFrameRef = useRef<number>();
    
        useEffect(() => {
            if (!containerRef.current) return;
            
            const container = containerRef.current;
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 1;
    
            const renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
    
            const geometry = new THREE.SphereGeometry(0.1, 32, 32);
            const material = new THREE.MeshBasicMaterial({
                color: 0xB19EEF,
                transparent: true,
                opacity: 0.5,
                blending: THREE.AdditiveBlending,
            });
            const cursor = new THREE.Mesh(geometry, material);
            scene.add(cursor);
    
            const mouse = new THREE.Vector2();
            const targetPosition = new THREE.Vector3();
            
            const onMouseMove = (event: MouseEvent) => {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                
                const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
                vector.unproject(camera);
                const dir = vector.sub(camera.position).normalize();
                const distance = -camera.position.z / dir.z;
                targetPosition.copy(camera.position).add(dir.multiplyScalar(distance));
            };
    
            window.addEventListener('mousemove', onMouseMove);
    
            const onResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', onResize);
    
            const animate = () => {
                animationFrameRef.current = requestAnimationFrame(animate);
                cursor.position.lerp(targetPosition, 0.1);
                renderer.render(scene, camera);
            };
    
            animate();
    
            return () => {
                // Cancel animation frame
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
                
                // Remove event listeners
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('resize', onResize);
                
                // Dispose Three.js objects
                geometry.dispose();
                material.dispose();
                renderer.dispose();
                
                // Remove DOM element
                if (container && renderer.domElement.parentNode === container) {
                    container.removeChild(renderer.domElement);
                }
            };
        }, []);
    
        return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, pointerEvents: 'none' }} />;
    };
    
    export default GhostCursor;