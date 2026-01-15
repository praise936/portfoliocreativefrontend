// src/pages/Contact.jsx
import { useState } from 'react';
import { Send, Mail, MapPin, Phone, Linkedin, Github, Twitter, Sparkles } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowConfetti(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Hide confetti after 3 seconds
            setTimeout(() => setShowConfetti(false), 3000);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: <Mail size={24} />,
            title: 'EMAIL',
            value: 'hello@unconventional.design',
            link: 'mailto:hello@unconventional.design'
        },
        {
            icon: <MapPin size={24} />,
            title: 'LOCATION',
            value: 'DIGITAL SPACE',
            link: null
        },
        {
            icon: <Phone size={24} />,
            title: 'PHONE',
            value: '+1 (555) 808-UNUSUAL',
            link: 'tel:+15558086878'
        }
    ];

    const socialLinks = [
        {
            icon: <Github size={24} />,
            name: 'GitHub',
            link: 'https://github.com',
            color: '#6e5494'
        },
        {
            icon: <Linkedin size={24} />,
            name: 'LinkedIn',
            link: 'https://linkedin.com',
            color: '#0077b5'
        },
        {
            icon: <Twitter size={24} />,
            name: 'Twitter',
            link: 'https://twitter.com',
            color: '#1da1f2'
        }
    ];

    return (
        <div className="contact-page">
            {/* Confetti effect */}
            {showConfetti && (
                <div className="confetti">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="confetti-piece"
                            style={{
                                '--x': Math.random() * 100,
                                '--y': Math.random() * 100,
                                '--r': Math.random() * 360,
                                '--c': ['var(--primary)', 'var(--secondary)', 'var(--accent)'][
                                    Math.floor(Math.random() * 3)
                                ],
                                '--d': Math.random() * 2 + 1
                            }}
                        />
          ))}
                </div>
            )}

            <div className="contact-container">
                <div className="contact-header">
                    <h1 className="page-title">
                        <span className="title-number">04</span>
                        BREAK THE FOURTH WALL
                    </h1>
                    <p className="page-subtitle">
                        Let's have a conversation that doesn't follow the usual script
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-card">
                            <div className="contact-card-header">
                                <Sparkles size={32} />
                                <h3>UNCONVENTIONAL CONTACT</h3>
                            </div>

                            <div className="contact-details">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="contact-detail">
                                        <div className="contact-icon">
                                            {info.icon}
                                        </div>
                                        <div className="contact-text">
                                            <span className="contact-title">{info.title}</span>
                                            {info.link ? (
                                                <a href={info.link} className="contact-value">
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <span className="contact-value">{info.value}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="contact-social">
                                <h4>FIND ME IN THE DIGITAL WILDERNESS</h4>
                                <div className="social-links">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.link}
                                            className="social-link"
                                            style={{ '--social-color': social.color }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {social.icon}
                                            <span>{social.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="contact-note">
                            <p>
                                <strong>NOTE:</strong> I respond to messages that challenge conventions,
                                propose impossible ideas, or simply make me think differently.
                            </p>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-header">
                                <h3>SEND A MESSAGE INTO THE VOID</h3>
                                <p>Or at least into my inbox. Either way, it's an adventure.</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">
                                    <span className="label-text">YOUR NAME</span>
                                    <span className="label-required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="What should I call you?"
                                    className="form-input"
                                />
                                <div className="input-underline"></div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">
                                    <span className="label-text">EMAIL ADDRESS</span>
                                    <span className="label-required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Where can I reach you?"
                                    className="form-input"
                                />
                                <div className="input-underline"></div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">
                                    <span className="label-text">SUBJECT</span>
                                    <span className="label-optional">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What's this about?"
                                    className="form-input"
                                />
                                <div className="input-underline"></div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">
                                    <span className="label-text">YOUR MESSAGE</span>
                                    <span className="label-required">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    placeholder="Say something interesting..."
                                    className="form-textarea"
                                />
                                <div className="input-underline"></div>
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        SENDING...
                                    </>
                                ) : (
                                    <>
                                        LAUNCH MESSAGE
                                        <Send size={20} />
                                    </>
                                )}
                            </button>

                            <div className="form-footer">
                                <p>
                                    <small>
                                        This form doesn't just send emails—it creates possibilities.
                                        Or at least that's what I tell myself.
                                    </small>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="contact-visual">
                    <div className="visual-message">
                        <div className="message-bubble">
                            <p>IS THIS EVEN A CONTACT FORM?</p>
                        </div>
                        <div className="message-bubble">
                            <p>OR JUST ANOTHER DIGITAL RITUAL?</p>
                        </div>
                        <div className="message-bubble">
                            <p>LET'S FIND OUT TOGETHER</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;