import { Canvas } from '@react-three/fiber';
import BackgroundStars from '../BackgroundStars';
import Galaxy from '../Galaxy';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useControls } from 'leva';
import { CAMERA_POSITION, CAMERA_ROTATION, CAMERA_FAR } from 'constants/camera';
import Controls from '../Controls/Controls.tsx';
import { useCameraStore } from 'store/useCameraStore.ts';

export default function Screen() {
	const camera = {
		position: CAMERA_POSITION,
		rotation: CAMERA_ROTATION,
		far: CAMERA_FAR,
	};

	const { distance, setDistance } = useCameraStore();

	const { intensity, mipmapBlur, luminanceThreshold, luminanceSmoothing } =
		useControls('Bloom', {
			intensity: { value: 0.4, min: 0, max: 1.5, step: 0.01 },
			mipmapBlur: { value: false },
			luminanceThreshold: { value: 0.9, min: 0, max: 1, step: 0.01 },
			luminanceSmoothing: { value: 0.025, min: 0, max: 2, step: 0.01 },
		});

	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<Canvas
				camera={camera}
				onWheel={(e) => setDistance(distance + e.deltaY / 20)}
			>
				<EffectComposer>
					<Bloom
						intensity={intensity}
						mipmapBlur={mipmapBlur}
						luminanceThreshold={luminanceThreshold}
						luminanceSmoothing={luminanceSmoothing}
					/>
				</EffectComposer>

				<color attach="background" args={['#000']} />
				<ambientLight color="#fff" intensity={5} />
				<axesHelper args={[20000]} />
				<Controls />

				<BackgroundStars />
				<Galaxy />
			</Canvas>
		</div>
	);
}
