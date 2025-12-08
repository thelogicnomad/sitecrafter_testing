import React, { useEffect, useRef } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/Button';
    import { cn } from '@/lib/utils';
    // import { Renderer, Camera, Transform, Program, Mesh, Geometry } from 'ogl'; // OGL not used in this implementation
    import * as THREE from 'three'; // Using Three.js for a more robust WebGL setup example

    interface HeroSectionProps {
      h1Text: string;
      subheadingText: string;
      ctaPrimary: { text: string; href: string };
      ctaSecondary: { text: string; href: string };
      className?: string;
    }

    // A simplified WebGL background component using Three.js for demonstration
    const WebGLBackground: React.FC = () => {
      const mountRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (!mountRef.current) return;

        let animationFrameId: number;
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // Simple gradient plane
        const geometry = new THREE.PlaneGeometry(2, 2, 1);
        const material = new THREE.ShaderMaterial({
          uniforms: {
            u_time: { value: 0.0 },
            u_resolution: { value: new THREE.Vector2(width, height) },
            u_primaryColor: { value: new THREE.Color(0x8A2E4B) }, // Primary
            u_secondaryColor: { value: new THREE.Color(0xD9AE73) }, // Secondary
          },
          vertexShader: `
            void main() {
              gl_Position = vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec3 u_primaryColor;
            uniform vec3 u_secondaryColor;

            void main() {
              vec2 st = gl_FragCoord.xy / u_resolution.xy;
              st.x *= u_resolution.x / u_resolution.y; // Aspect ratio correction

              // Create a subtle dynamic gradient using time
              vec3 color1 = u_primaryColor;
              vec3 color2 = u_secondaryColor;

              float blendFactor = sin(st.x * 5.0 + u_time * 0.1) * 0.5 + 0.5;
              blendFactor = mix(blendFactor, st.y, 0.3); // Blend with vertical position

              vec3 finalColor = mix(color1, color2, blendFactor);

              gl_FragColor = vec4(finalColor, 0.4); // Semi-transparent overlay
            }
          `,
          transparent: true,
        });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        camera.position.z = 1;

        const animate = (time: DOMHighResTimeStamp) => {
          if (material.uniforms) {
            material.uniforms.u_time.value = time * 0.001;
          }
          renderer.render(scene, camera);
          animationFrameId = requestAnimationFrame(animate);
        };

        animate(0);

        const handleResize = () => {
          if (mountRef.current) {
            const newWidth = mountRef.current.clientWidth;
            const newHeight = mountRef.current.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
            if (material.uniforms) {
              material.uniforms.u_resolution.value.set(newWidth, newHeight);
            }
          }
        };

        window.addEventListener('resize', handleResize);

        return () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener('resize', handleResize);
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
          }
        };
      }, []);

      return <div ref={mountRef} className="absolute inset-0 z-0" />;
    };


    const HeroSection: React.FC<HeroSectionProps> = ({
      h1Text,
      subheadingText,
      ctaPrimary,
      ctaSecondary,
      className,
    }) => {
      return (
        <section
          className={cn(
            'relative h-[70vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden',
            'bg-gradient-to-br from-primary/80 to-primary/60', // Fallback background
            className
          )}
          aria-labelledby="hero-title"
        >
          <WebGLBackground /> {/* WebGL dynamic background */}

          <div className="relative z-10 p-4 max-w-4xl mx-auto">
            <motion.h1
              id="hero-title"
              className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg font-poppins"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {h1Text}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-secondary-light mb-8 max-w-2xl mx-auto font-inter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            >
              {subheadingText}
            </motion.p>
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            >
              <Button as="a" href={ctaPrimary.href} size="lg" variant="secondary">
                {ctaPrimary.text}
              </Button>
              <Button as="a" href={ctaSecondary.href} size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                {ctaSecondary.text}
              </Button>
            </motion.div>
          </div>
        </section>
      );
    };

    export { HeroSection };