// src/pages/Projects.jsx
import { useState } from 'react';
import { ExternalLink, Github, Sparkles, Eye, Code } from 'lucide-react';
import '../styles/Projects.css';

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const projects = [
        {
            id: 1,
            title: "NEURAL DREAMSCAPE",
            category: "creative",
            description: "An AI-generated interactive dream visualization that responds to brainwave patterns",
            tech: ["React", "TensorFlow.js", "Three.js", "WebGL"],
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
            github: "#",
            live: "#"
        },
        {
            id: 2,
            title: "QUANTUM CALCULATOR",
            category: "experimental",
            description: "A calculator that exists in multiple states simultaneously until observed",
            tech: ["Quantum JS", "React", "Math.js"],
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w-800&auto=format&fit=crop",
            github: "#",
            live: "#"
        },
        {
            id: 3,
            title: "EMOTION SYNTHESIZER",
            category: "ai",
            description: "Transforms text into emotional color palettes and soundscapes",
            tech: ["Python", "FastAPI", "React", "Web Audio API"],
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w-800&auto=format&fit=crop",
            github: "#",
            live: "#"
        },
        {
            id: 4,
            title: "PARALLAX PARADOX",
            category: "creative",
            description: "A scrolling experience that breaks conventional spatial relationships",
            tech: ["GSAP", "React", "Custom CSS"],
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w-800&auto=format&fit=crop",
            github: "#",
            live: "#"
        },
        {
            id: 5,
            title: "CHAOS ORGANIZER",
            category: "experimental",
            description: "An organizational tool that embraces randomness and serendipity",
            tech: ["Node.js", "React", "Randomness API"],
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w-800&auto=format&fit=crop",
            github: "#",
            live: "#"
        },
        {
            id: 6,
            title: "VOID CHAT",
            category: "ai",
            description: "A messaging app where messages disappear into the void after reading",
            tech: ["Socket.io", "React", "MongoDB", "Redis"],
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w-800&auto=format&fit=crop",
            github: "#",
            live: "#"
        },
    ];

    const filters = [
        { id: 'all', label: 'ALL PROJECTS', icon: <Sparkles size={16} /> },
        { id: 'creative', label: 'CREATIVE CODING', icon: <Eye size={16} /> },
        { id: 'experimental', label: 'EXPERIMENTAL', icon: <Code size={16} /> },
        { id: 'ai', label: 'AI/ML', icon: <Sparkles size={16} /> },
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <div className="projects-page">
            <div className="projects-container">
                <div className="projects-header">
                    <h1 className="page-title">
                        <span className="title-number">02</span>
                        UNCONVENTIONAL CREATIONS
                    </h1>
                    <p className="page-subtitle">
                        Projects that question the status quo and explore the boundaries of what's possible
                    </p>
                </div>

                <div className="projects-filters">
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter.id)}
                        >
                            {filter.icon}
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map(project => (
                        <div key={project.id} className="project-card">
                            <div className="project-image">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                />
                                <div className="project-overlay">
                                    <div className="project-tech">
                                        {project.tech.map((tech, index) => (
                                            <span key={index} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="project-content">
                                <div className="project-header">
                                    <h3 className="project-title">{project.title}</h3>
                                    <span className={`project-category ${project.category}`}>
                                        {project.category.toUpperCase()}
                                    </span>
                                </div>

                                <p className="project-description">{project.description}</p>

                                <div className="project-links">
                                    <a href={project.github} className="project-link">
                                        <Github size={20} />
                                        <span>CODE</span>
                                    </a>
                                    <a href={project.live} className="project-link">
                                        <ExternalLink size={20} />
                                        <span>LIVE</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="projects-footer">
                    <div className="projects-notice">
                        <Sparkles size={24} />
                        <p>
                            These projects exist in the space between utility and art.
                            Each one challenges conventional thinking about what software should be.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;