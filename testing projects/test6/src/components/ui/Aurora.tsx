import React, { useRef, useEffect } from 'react';
    import { Renderer, Camera, Transform, Post, Vec2, Color } from 'ogl';

    const vertex = `
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 0, 1);
        }
    `;

    const fragment = `
        precision highp float;
        precision highp int;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor[3];
        uniform float uBlend;
        uniform float uAmplitude;
        uniform float uSpeed;

        vec3 hsb2rgb(in vec3 c){
            vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
            rgb = rgb * rgb * (3.0 - 2.0 * rgb);
            return c.z * mix(vec3(1.0), rgb, c.y);
        }

        void main() {
            vec2 a = vec2(vUv.x, vUv.y);
            vec2 b = vec2(vUv.x, vUv.y);
            vec2 c = vec2(vUv.x, vUv.y);
            float time = uTime * uSpeed;
            a.x += time * 0.03;
            a.y += time * 0.03;
            b.x -= time * 0.03;
            b.y -= time * 0.03;
            c.x += time * 0.01;
            c.y -= time * 0.01;
            vec2 position = vUv;
            float ar = 1.0;
            float r = 1.0;
            float R = max(1.0, r);
            if (ar > 1.0) {
              position.y *= ar;
              R *= ar;
            } else {
              position.x /= ar;
              R /= ar;
            }
            float d = length(position);
            d = pow(d, uBlend);
            float hue = 0.5;
            float sat = 0.0;
            float val = 0.0;

            val += pow(1.6 / d, 2.0);
            val += pow(1.6 / length(a), 2.0);
            val += pow(1.6 / length(b), 2.0);
            val += pow(1.6 / length(c), 2.0);

            vec3 color = hsb2rgb(vec3(0.5, sat, val * uAmplitude));

            gl_FragColor.rgb = color;
            gl_FragColor.a = 1.0;
        }
    `;

    interface AuroraProps {
      colorStops: string[];
      blend?: number;
      amplitude?: number;
      speed?: number;
    }

    const Aurora: React.FC<AuroraProps> = ({ colorStops, blend = 0.5, amplitude = 1.0, speed = 0.5 }) => {
      const canvasRef = useRef<HTMLCanvasElement>(null);

      useEffect(() => {
        if (!canvasRef.current) return;
        const renderer = new Renderer({
          canvas: canvasRef.current,
          width: window.innerWidth,
          height: window.innerHeight,
          dpr: Math.min(window.devicePixelRatio, 2),
          alpha: true,
        });

        const gl = renderer.gl;
        const scene = new Transform();
        const camera = new Camera(gl);

        const post = new Post(gl);
        const resolution = { value: new Vec2(gl.canvas.width, gl.canvas.height) };

        post.addPass({
          fragment,
          vertex,
          uniforms: {
            uTime: { value: 0 },
            uColor: { value: colorStops.map(c => new Color(c)) },
            uBlend: { value: blend },
            uAmplitude: { value: amplitude },
            uSpeed: { value: speed },
          },
        });

        let animationFrameId: number;
        const update = (t: number) => {
          post.passes[0].uniforms.uTime.value = t * 0.001;
          post.render({ scene, camera });
          animationFrameId = requestAnimationFrame(update);
        };
        animationFrameId = requestAnimationFrame(update);

        const handleResize = () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
          resolution.value.set(gl.canvas.width, gl.canvas.height);
        };
        window.addEventListener('resize', handleResize);

        return () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener('resize', handleResize);
        };
      }, [colorStops, blend, amplitude, speed]);

      return (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      );
    };

    export default Aurora;