import { useEffect, useRef, useMemo } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Plane } from 'ogl';

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
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;

    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }
    
    void main() {
        float noise = snoise(vUv * 4.0 + uTime * 0.1);
        vec3 colorMix1 = mix(uColor1, uColor2, vUv.x + noise * 0.2);
        vec3 colorMix2 = mix(colorMix1, uColor3, vUv.y);
        gl_FragColor.rgb = colorMix2;
        gl_FragColor.a = 1.0;
    }
`;

function hexToRgb(hex: string) {
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length == 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return [r / 255, g / 255, b / 255];
}


interface AuroraProps {
  colorStops?: string[];
}

export default function Aurora({ colorStops = ["#182A4D", "#D4A03A", "#FDFCFB"]}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = useMemo(() => {
    return colorStops.map(hexToRgb);
  }, [colorStops]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const renderer = new Renderer({ canvas: canvasRef.current, dpr: 2 });
    const gl = renderer.gl;
    const camera = new Camera(gl);
    camera.position.z = 1;
    const scene = new Transform();
    const geometry = new Plane(gl);

    const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
            uTime: { value: 0 },
            uColor1: { value: colors[0] || [0,0,0] },
            uColor2: { value: colors[1] || [0,0,0] },
            uColor3: { value: colors[2] || [0,0,0] },
        },
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);
    
    let animationFrameId: number;

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', resize, false);
    resize();
    
    function update(t: number) {
        program.uniforms.uTime.value = t * 0.0001;
        renderer.render({ scene, camera });
        animationFrameId = requestAnimationFrame(update);
    }
    animationFrameId = requestAnimationFrame(update);
    
    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resize);
    };
  }, [colors]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
}