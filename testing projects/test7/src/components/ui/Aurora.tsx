import { useEffect, useRef, FC } from 'react';
import { Renderer, Program, Color, Mesh, Plane } from 'ogl';

interface AuroraProps {
  colorStops?: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
}

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
  uniform float uTime;
  uniform vec3 uColor[3];
  varying vec2 vUv;
  
  vec3 hsb2rgb(in vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    rgb = rgb * rgb * (3.0 - 2.0 * rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float a = atan(p.y, p.x);
    float r = length(p);
    float t = uTime * 0.1;
    
    vec3 color = vec3(0.0);
    float noise = 0.0;
    
    for (int i = 0; i < 3; i++) {
        float angle_offset = float(i) * 2.0 * 3.14159 / 3.0;
        float speed_multiplier = 1.0 + float(i) * 0.5;
        noise += sin(a * 3.0 + t * speed_multiplier + r * 2.0 + angle_offset) * 0.5 + 0.5;
        color += uColor[i] * pow(noise, vec3(2.0));
    }
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const Aurora: FC<AuroraProps> = ({
  colorStops = ["#3A29FF", "#FF94B4", "#FF3232"]
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new Renderer({ canvas: canvasRef.current, dpr: 2 });
    const gl = renderer.gl;
    const geometry = new Plane(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: colorStops.map(c => new Color(c)) }
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    let animationFrameId: number;
    const update = (t: number) => {
      program.uniforms.uTime.value = t * 0.0003;
      renderer.render({ scene: mesh });
      animationFrameId = requestAnimationFrame(update);
    };

    const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', resize, false);
    resize();

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [colorStops]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default Aurora;