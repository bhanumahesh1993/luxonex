import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './Hero.scss';

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const videos = [
    '/videos/hero_1.mp4',
    '/videos/hero_2.mp4',
    '/videos/hero_3.mp4'
  ];

  useEffect(() => {
    // Initialize video refs
    videoRefs.current = videoRefs.current.slice(0, videos.length);

    // Start playing the first video
    if (videoRefs.current[0]) {
      videoRefs.current[0].play().catch(error => {
        console.error('Error playing video:', error);
      });
    }

    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % videos.length;
        // Start playing the next video
        if (videoRefs.current[nextIndex]) {
          videoRefs.current[nextIndex].play().catch(error => {
            console.error('Error playing video:', error);
          });
        }
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      {/* Video Background */}
      <div className="hero-videos">
        {videos.map((video, index) => (
          <video
            key={video}
            ref={el => videoRefs.current[index] = el}
            src={video}
            autoPlay={index === 0}
            muted
            loop
            playsInline
            preload="auto"
            className={`hero-video ${index === currentVideoIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Your Perfect Home
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Find your dream property from our extensive collection of luxury homes and apartments
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            Explore Properties
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 