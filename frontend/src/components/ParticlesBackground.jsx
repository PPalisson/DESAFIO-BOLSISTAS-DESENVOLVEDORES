import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function ParticlesBackground() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: 'transparent',
          },
        },
        particles: {
          number: { value: 60 },
          color: { value: '#00b406' },
          links: {
            enable: true,
            distance: 130,
            color: '#00b406',
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            outModes: 'bounce',
          },
          size: {
            value: 3,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
            resize: true,
          },
        },
      }}
      style={{
        position: 'absolute',
        zIndex: 0,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
