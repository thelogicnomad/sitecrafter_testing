import { useMemo } from 'react';
    import { a, useSpring } from '@react-spring/web';
    import { useGesture } from '@use-gesture/react';
    import { clamp } from 'lodash';

    const images = [
        'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200',
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200',
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200',
        'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1200',
        'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1200',
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200',
    ];

    const angles = [0, 60, 120, 180, 240, 300].map((deg) => (deg * Math.PI) / 180);

    export function DomeGallery() {
        const [{ rot }, api] = useSpring(() => ({ rot: 0 }));

        const bind = useGesture(
            {
                onDrag: ({ down, movement: [mx] }) =>
                    api.start({ rot: down ? clamp(mx, -60, 60) : 0 }),
            },
            { drag: { axis: 'x', from: () => [rot.get(), 0] } }
        );

        const domeItems = useMemo(
            () =>
                images.map((url, i) => {
                    const angle = angles[i];
                    return (
                        <a.div
                            key={i}
                            className="absolute w-[300px] h-[400px] rounded-lg overflow-hidden bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${url})`,
                                transform: rot.to(
                                    (r) =>
                                        `rotateY(${-r}deg) translateZ(400px) rotateY(${angle * (180 / Math.PI)}deg)`
                                ),
                            }}
                        />
                    );
                }),
            [rot]
        );

        return (
            <div {...bind()} className="w-full h-full flex items-center justify-center bg-au-bg-light cursor-grab active:cursor-grabbing">
                <a.div
                    className="relative w-[300px] h-[400px] transform-style-3d"
                    style={{
                        transform: 'perspective(1200px) rotateX(-10deg)',
                    }}>
                    {domeItems}
                </a.div>
            </div>
        );
    }