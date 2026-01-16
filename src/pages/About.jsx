// src/pages/About.jsx
import { useState } from 'react';
import { Award, Briefcase, GraduationCap, MapPin, Calendar, Sparkles } from 'lucide-react';
import '../styles/About.css';
import profile from '../assets/book-image1.png'
import myabtimage from '../assets/book-image6.png'
const About = () => {
    const [activeTimeline, setActiveTimeline] = useState('work');

    const workExperience = [
        {
            year: '2023 - Present',
            role: 'CREATIVE TECHNOLOGIST',
            company: 'DIGITAL DREAMS INC.',
            description: 'Pushing boundaries of digital experiences and questioning conventional UX patterns'
        },
        {
            year: '2021 - 2023',
            role: 'EXPERIMENTAL DEVELOPER',
            company: 'FRONTIER DIGITAL',
            description: 'Built unconventional web applications that challenge user expectations'
        },
        {
            year: '2019 - 2021',
            role: 'ART-TECH HYBRID',
            company: 'CREATIVE CODING LAB',
            description: 'Bridged the gap between artistic expression and technical implementation'
        }
    ];

    const education = [
        {
            year: '2018',
            degree: 'MS IN DIGITAL ARTS',
            institution: 'INTERDISCIPLINARY TECH INSTITUTE',
            description: 'Focus on computational creativity and digital expression'
        },
        {
            year: '2016',
            degree: 'BS IN COMPUTER SCIENCE',
            institution: 'UNIVERSITY OF INNOVATION',
            description: 'With minors in Philosophy and Visual Arts'
        }
    ];

    const funFacts = [
        'Believes interfaces should be discovered, not learned',
        'Once built a website that intentionally crashes at midnight',
        'Prefers the color #FF00FF over all others',
        'Thinks every portfolio should question its own existence',
        'Considers bugs as features waiting to be understood',
        'Owns more books on art theory than programming'
    ];

    return (
        <div className="about-page">
            <div className="about-container">
                <div className="about-header">
                    <h1 className="page-title">
                        <span className="title-number">03</span>
                        THE PERSON BEHIND THE PIXELS
                    </h1>
                    <p className="page-subtitle">
                        Or am I just an AI-generated persona? The mystery is part of the experience.
                    </p>
                </div>

                <div className="about-content">
                    <div className="about-main">
                        <div className="about-card bio-card">
                            <div className="bio-header">
                                <div className="bio-avatar">
                                    <img
                                        src={profile} // or import if using src
                                        alt="Peter Praise Creative"
                                        className="profile-image"
                                    />
                                </div>
                                <div className="bio-info">
                                    <h2 className="bio-name">PETER PRAISE CREATIVE</h2>
                                    <div className="bio-tags">
                                        <span className="bio-tag">
                                            <MapPin size={16} />
                                            DIGITAL NOMAD
                                        </span>
                                        <span className="bio-tag">
                                            <Calendar size={16} />
                                            TIMELESS
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bio-description">
                                <p>
                                    I exist in the intersection of code and creativity, where logic meets
                                    absurdity and convention meets rebellion. My work isn't about solving
                                    problems—it's about questioning whether they should exist in the first place.
                                </p>
                                <p>
                                    This portfolio is a manifestation of that philosophy. It's not meant to
                                    showcase skills in the traditional sense, but to demonstrate a different
                                    way of thinking about digital spaces and human-computer interaction.
                                </p>
                            </div>

                            <div className="bio-stats">
                                <div className="stat-item">
                                    <span className="stat-number">∞</span>
                                    <span className="stat-label">PROJECTS COMPLETED</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">42</span>
                                    <span className="stat-label">CONVENTIONS BROKEN</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">0</span>
                                    <span className="stat-label">REGULAR PORTFOLIOS</span>
                                </div>
                            </div>
                        </div>

                        <div className="about-card timeline-card">
                            <div className="timeline-header">
                                <button
                                    className={`timeline-tab ${activeTimeline === 'work' ? 'active' : ''}`}
                                    onClick={() => setActiveTimeline('work')}
                                >
                                    <Briefcase size={20} />
                                    EXPERIENCE
                                </button>
                                <button
                                    className={`timeline-tab ${activeTimeline === 'education' ? 'active' : ''}`}
                                    onClick={() => setActiveTimeline('education')}
                                >
                                    <GraduationCap size={20} />
                                    EDUCATION
                                </button>
                            </div>

                            <div className="timeline-content">
                                {(activeTimeline === 'work' ? workExperience : education).map((item, index) => (
                                    <div key={index} className="timeline-item">
                                        <div className="timeline-year">{item.year}</div>
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-info">
                                            <h3 className="timeline-title">
                                                {activeTimeline === 'work' ? item.role : item.degree}
                                            </h3>
                                            <div className="timeline-subtitle">
                                                {activeTimeline === 'work' ? item.company : item.institution}
                                            </div>
                                            <p className="timeline-description">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="about-sidebar">
                        <div className="about-card image-card">
                            <img
                                src={myabtimage}
                                alt="Creative workspace"
                                className="sidebar-image"
                            />
                            <div className="image-caption">
                                <p>"Where the magic (and occasional chaos) happens"</p>
                            </div>
                        </div>
                        <div className="about-card facts-card">
                            <h3 className="card-title">
                                <Award size={24} />
                                UNCONVENTIONAL FACTS
                            </h3>

                            <div className="facts-grid">
                                {funFacts.map((fact, index) => (
                                    <div key={index} className="fact-item">
                                        <div className="fact-number">{String(index + 1).padStart(2, '0')}</div>
                                        <p className="fact-text">{fact}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="about-card philosophy-card">
                            <h3 className="card-title">CREATIVE PHILOSOPHY</h3>
                            <div className="philosophy-content">
                                <div className="philosophy-item">
                                    <div className="philosophy-icon">❓</div>
                                    <div className="philosophy-text">
                                        <h4>QUESTION EVERYTHING</h4>
                                        <p>Why should buttons look like buttons? Why should menus be at the top?</p>
                                    </div>
                                </div>
                                <div className="philosophy-item">
                                    <div className="philosophy-icon">🎭</div>
                                    <div className="philosophy-text">
                                        <h4>EMBRACE PARADOX</h4>
                                        <p>Chaos can be organized. Randomness can be designed. Bugs can be beautiful.</p>
                                    </div>
                                </div>
                                <div className="philosophy-item">
                                    <div className="philosophy-icon">🌀</div>
                                    <div className="philosophy-text">
                                        <h4>CREATE EXPERIENCES</h4>
                                        <p>Software should be felt, not just used. Every interaction tells a story.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;