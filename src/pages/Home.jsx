// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code, Palette, Cpu } from 'lucide-react';
import '../styles/Home.css';
import FooterBook from '../components/FooterBook';
import { useNavigate } from 'react-router-dom';

// Import images (upload these to your assets folder)
import portraitAbstract from '../assets/portrait-abstract.jpeg'; // Creative portrait with glitch/neon effects
// import codeArt from '../assets/code-art.png'; // Artistic visualization of code as flowing patterns
import codeArt from '../assets/creative-pattern.jpeg'; // Abstract geometric pattern for background
import creativePattern from '../assets/creative-pattern.jpeg'; // Abstract geometric pattern for background
// Temporary placeholders - replace with your actual images



const Home = () => {
    const [textIndex, setTextIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();
    const dynamicTexts = [
        "IS THIS EVEN A PORTFOLIO?",
        "OR IS IT ART?",
        "MAYBE IT'S BOTH",
        "DEFINITELY UNUSUAL",
        "WELCOME ANYWAY"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % dynamicTexts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const skills = [
        { icon: <Code />, name: "Full Stack", level: 99 },
        { icon: <Palette />, name: "UI/UX Design", level: 80 },
        { icon: <Cpu />, name: "AI/ML", level: 45 },
        { icon: <Sparkles />, name: "Creativity", level: 100 },
    ];

    return (
        <div className="home-page">
            {/* Animated background elements */}
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
            <div className="bg-orb orb-3"></div>

            {/* Floating pattern image in background */}
            <div className="floating-image">
                <img
                    src={creativePattern}
                    alt="Abstract creative pattern"
                    className="pattern-image"
                />
            </div>

            {/* Mouse follower */}
            <div
                className="mouse-follower"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                }}
            ></div>

            <div className="home-container">
                <section className="hero-section">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <Sparkles size={16} />
                            <span>UNCONVENTIONAL PORTFOLIO</span>
                        </div>

                        <h1 className="hero-title">
                            <span className="hero-title-line">BREAKING THE</span>
                            <span className="hero-title-line">
                                <span className="hero-highlight">MOLD</span>
                                <span className="hero-sparkle">✨</span>
                            </span>
                            <span className="hero-title-line">OF PORTFOLIOS</span>
                        </h1>

                        <div className="dynamic-text-container">
                            <div className="dynamic-text">
                                {dynamicTexts[textIndex]}
                            </div>
                            <div className="text-underline"></div>
                        </div>

                        <p className="hero-description">
                            This isn't your typical portfolio. It's an experience, a statement,
                            and a testament to creative thinking in digital spaces.
                            Welcome to where code meets art.
                        </p>

                        <div className="hero-buttons">
                            <button onClick={() => navigate('/projects')} className="btn-primary">
                                EXPLORE THE UNUSUAL
                                <ArrowRight size={20} />
                            </button>
                            <button className="btn-secondary">
                                QUESTION EVERYTHING
                            </button>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="visual-container float-animation">
                            <img
                                src={portraitAbstract}
                                alt="Abstract creative portrait"
                                className="portrait-image"
                            />
                            <div className="image-overlay-effects"></div>
                            <div className="visual-orb spin-slow"></div>
                            <div className="visual-grid"></div>
                            <div className="visual-lines">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="visual-line" style={{ '--i': i }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="skills-section">
                    <h2 className="section-title">
                        <span className="title-number">01</span>
                        PARADOXICAL SKILLS
                    </h2>

                    <div className="skills-container">
                        <div className="skills-grid">
                            {skills.slice(0, 2).map((skill, index) => (
                                <div key={index} className="skill-card">
                                    <div className="skill-icon">
                                        {skill.icon}
                                    </div>
                                    <div className="skill-info">
                                        <h3 className="skill-name">{skill.name}</h3>
                                        <div className="skill-bar">
                                            <div
                                                className="skill-progress"
                                                style={{ width: `${skill.level}%` }}
                                            >
                                                <div className="skill-glow"></div>
                                            </div>
                                        </div>
                                        <span className="skill-percent">{skill.level}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="skills-image-container">
                            <img
                                src={codeArt}
                                alt="Code as art visualization"
                                className="code-art-image"
                            />
                        </div>

                        <div className="skills-grid">
                            {skills.slice(2, 4).map((skill, index) => (
                                <div key={index + 2} className="skill-card">
                                    <div className="skill-icon">
                                        {skill.icon}
                                    </div>
                                    <div className="skill-info">
                                        <h3 className="skill-name">{skill.name}</h3>
                                        <div className="skill-bar">
                                            <div
                                                className="skill-progress"
                                                style={{ width: `${skill.level}%` }}
                                            >
                                                <div className="skill-glow"></div>
                                            </div>
                                        </div>
                                        <span className="skill-percent">{skill.level}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <FooterBook />
        </div>
    );
};

export default Home;