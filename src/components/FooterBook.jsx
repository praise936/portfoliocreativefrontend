// src/components/FooterBook.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Pause, Play, SkipForward, SkipBack } from 'lucide-react';
import '../styles/FooterBook.css';

// Import your images (I'm using placeholder imports - replace with your actual images)
import image1 from '../assets/book-image1.png'; // Your coding/portrait image
import image2 from '../assets/book-image2.png'; // Your project screenshot
import image3 from '../assets/book-image3.jpg'; // Code snippet visual
import image4 from '../assets/book-image4.png'; // Creative design work
import image5 from '../assets/book-image5.png'; // AI/ML project
import image6 from '../assets/book-image6.png'; // Another creative piece
import image7 from '../assets/book-image7.png'; // Personal photo
import image8 from '../assets/book-image8.png'; // Portfolio work

const FooterBook = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [speed, setSpeed] = useState(0.2); // Pages per second
    const [isVisible, setIsVisible] = useState(false);
    const bookRef = useRef(null);

    const images = [
        { src: image6, title: "UNCONVENTIONAL", description: "Breaking all the rules" },
        { src: image1, title: "CODE POETRY", description: "Where syntax becomes art" },
        
        { src: image2, title: "DIGITAL ALCHEMY", description: "Transforming ideas into reality" },
        { src: image3, title: "SYNTAX FLOW", description: "Elegant solutions in motion" },
        { src: image4, title: "CREATIVE MATRIX", description: "Design thinking visualized" },
        // { src: image5, title: "NEURAL PATTERNS", description: "AI meets aesthetics" },
        
        { src: image7, title: "THE ARTIST", description: "Behind the code" },
        { src: image8, title: "FUTURE SHAPES", description: "Next-gen interfaces" },
    ];

    // Auto-play pages
    useEffect(() => {
        if (!isPlaying || !isVisible) return;

        const interval = setInterval(() => {
            setCurrentPage((prev) => (prev + 1) % images.length);
        }, 1000 / speed);

        return () => clearInterval(interval);
    }, [isPlaying, speed, images.length, isVisible]);
    useEffect(() => {
        // Debounce scroll events
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    // Minimal scroll handling
                    ticking = false;
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const preloadedImages = useRef(new Set());
    // Intersection Observer to detect when in viewport
    useEffect(() => {
        // Preload next and previous images
        const nextIndex = (currentPage + 1) % images.length;
        const prevIndex = (currentPage - 1 + images.length) % images.length;

        const imagesToPreload = [
            images[nextIndex].src,
            images[prevIndex].src
        ];

        imagesToPreload.forEach(src => {
            if (!preloadedImages.current.has(src)) {
                const img = new Image();
                img.src = src;
                preloadedImages.current.add(src);
            }
        });
    }, [currentPage, images]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (bookRef.current) {
            observer.observe(bookRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleNextPage = () => {
        setCurrentPage((prev) => (prev + 1) % images.length);
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => (prev - 1 + images.length) % images.length);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSpeedChange = (newSpeed) => {
        setSpeed(newSpeed);
    };

    return (
        <div className="footer-book-container" ref={bookRef}>
            <div className="book-wrapper">
                <div className="book-header">
                    <h2 className="book-title">
                        <span className="book-title-number">02</span>
                        RAPID VISUAL JOURNAL
                    </h2>
                    <p className="book-subtitle">
                        A fast-flipping visual diary of creativity, code, and chaos
                    </p>
                </div>

                <div className="book-main">
                    {/* Previous page (curled corner effect) */}
                    <div className="book-page book-page-prev">
                        <div className="page-curl"></div>
                        <div className="page-content">
                            <img
                                src={images[(currentPage - 1 + images.length) % images.length].src}
                                alt="Previous page"
                                className="page-image"
                            />
                            <div className="page-overlay"></div>
                        </div>
                    </div>

                    {/* Current page (main view) */}
                    <div className="book-page book-page-current">
                        <div className="page-content">
                            <img
                                src={images[currentPage].src}
                                alt={images[currentPage].title}
                                className="page-image"
                            />
                            <div className="page-info">
                                <h3 className="page-title">{images[currentPage].title}</h3>
                                <p className="page-description">{images[currentPage].description}</p>
                            </div>
                            <div className="page-glow"></div>
                        </div>
                    </div>

                    {/* Next page (peeking through) */}
                    <div className="book-page book-page-next">
                        <div className="page-content">
                            <img
                                src={images[(currentPage + 1) % images.length].src}
                                alt="Next page"
                                className="page-image"
                            />
                            <div className="page-overlay"></div>
                        </div>
                    </div>

                    {/* Book spine */}
                    <div className="book-spine">
                        <div className="spine-glow"></div>
                        <div className="spine-title">PORTFOLIO<br />JOURNAL</div>
                    </div>

                    {/* Page flip animation overlay */}
                    <div className={`page-flip-animation ${isPlaying ? 'flipping' : ''}`}>
                        <div className="flip-page"></div>
                    </div>
                </div>

                {/* Book controls */}
                <div className="book-controls">
                    <button className="book-control-btn" onClick={handlePrevPage}>
                        <SkipBack size={20} />
                    </button>

                    <button className="book-control-btn book-control-play" onClick={togglePlay}>
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>

                    <button className="book-control-btn" onClick={handleNextPage}>
                        <SkipForward size={20} />
                    </button>

                    <div className="speed-controls">
                        <span className="speed-label">FLIP SPEED:</span>
                        {[0.2, 0.4, 0.6, 1].map((s) => (
                            <button
                                key={s}
                                className={`speed-btn ${speed === s ? 'active' : ''}`}
                                onClick={() => handleSpeedChange(s)}
                            >
                                {s}x
                            </button>
                        ))}
                    </div>

                    <div className="page-counter">
                        <span className="current-page">{currentPage + 1}</span>
                        <span className="total-pages">/{images.length}</span>
                    </div>
                </div>

                <div className="book-footer">
                    <div className="book-hint">
                        <ChevronRight size={16} />
                        <span>SCROLL FOR MORE UNUSUALNESS</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterBook;