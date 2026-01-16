// src/pages/MessageDashboard.jsx
import { useState, useEffect } from 'react';
import {
    Mail,
    Eye,
    EyeOff,
    Archive,
    Trash2,
    Search,
    Filter,
    Clock,
    CheckCircle,
    MessageSquare,
    User,
    Calendar,
    RefreshCw
} from 'lucide-react';
import axios from 'axios';
import '../styles/MessageDashboard.css';

const API_BASE_URL = import.meta.env.VITE_API_URL

const MessageDashboard = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            // Note: This endpoint requires authentication
            const response = await axios.get(`${API_BASE_URL}/messages/`, {
                withCredentials: true // Include session cookies for Django auth
            });
            setMessages(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch messages. Please login and try again.');
            console.error('Error fetching messages:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateMessageStatus = async (id, newStatus) => {
        try {
            await axios.patch(`${API_BASE_URL}/messages/${id}/`,
                { status: newStatus },
                { withCredentials: true }
            );

            setMessages(messages.map(msg =>
                msg.id === id ? { ...msg, status: newStatus } : msg
            ));

            if (selectedMessage?.id === id) {
                setSelectedMessage({ ...selectedMessage, status: newStatus });
            }
        } catch (err) {
            console.error('Error updating message:', err);
        }
    };

    const deleteMessage = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        try {
            await axios.delete(`${API_BASE_URL}/messages/${id}/`, {
                withCredentials: true
            });

            setMessages(messages.filter(msg => msg.id !== id));
            if (selectedMessage?.id === id) {
                setSelectedMessage(null);
            }
        } catch (err) {
            console.error('Error deleting message:', err);
        }
    };

    const filteredMessages = messages.filter(message => {
        const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (message.subject && message.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
            message.message.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || message.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#FF6B6B';
            case 'read': return '#4ECDC4';
            case 'replied': return '#1DD1A1';
            case 'archived': return '#576574';
            default: return '#8395A7';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock size={14} />;
            case 'read': return <Eye size={14} />;
            case 'replied': return <CheckCircle size={14} />;
            case 'archived': return <Archive size={14} />;
            default: return <Mail size={14} />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <RefreshCw className="spinning" size={48} />
                <p>LOADING UNCONVENTIONAL MESSAGES...</p>
            </div>
        );
    }

    return (
        <div className="message-dashboard">
            <div className="dashboard-header">
                <div className="header-left">
                    <h1>
                        <span className="header-icon">
                            <Mail size={32} />
                        </span>
                        MESSAGE VOID
                    </h1>
                    <p className="dashboard-subtitle">
                        All the unconventional conversations, in one place
                    </p>
                </div>
                <div className="header-right">
                    <button
                        className="refresh-btn"
                        onClick={fetchMessages}
                    >
                        <RefreshCw size={20} />
                        REFRESH
                    </button>
                    <div className="stats">
                        <span className="stat">
                            <strong>{messages.length}</strong> TOTAL
                        </span>
                        <span className="stat">
                            <strong>{messages.filter(m => m.status === 'pending').length}</strong> NEW
                        </span>
                    </div>
                </div>
            </div>

            {error && (
                <div className="dashboard-error">
                    {error}
                </div>
            )}

            <div className="dashboard-controls">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filters">
                    <Filter size={20} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="messages-list">
                    <div className="list-header">
                        <span className="header-col sender">SENDER</span>
                        <span className="header-col subject">SUBJECT</span>
                        <span className="header-col date">DATE</span>
                        <span className="header-col status">STATUS</span>
                    </div>

                    <div className="messages-container">
                        {filteredMessages.length === 0 ? (
                            <div className="no-messages">
                                <MessageSquare size={48} />
                                <p>No messages found. The void is empty.</p>
                            </div>
                        ) : (
                            filteredMessages.map(message => (
                                <div
                                    key={message.id}
                                    className={`message-item ${selectedMessage?.id === message.id ? 'active' : ''}`}
                                    onClick={() => setSelectedMessage(message)}
                                >
                                    <div className="message-col sender">
                                        <div className="sender-avatar">
                                            <User size={16} />
                                        </div>
                                        <div className="sender-info">
                                            <strong>{message.name}</strong>
                                            <small>{message.email}</small>
                                        </div>
                                    </div>
                                    <div className="message-col subject">
                                        {message.subject || '(No Subject)'}
                                    </div>
                                    <div className="message-col date">
                                        <Calendar size={14} />
                                        {formatDate(message.created_at)}
                                    </div>
                                    <div className="message-col status">
                                        <span
                                            className="status-badge"
                                            style={{ backgroundColor: getStatusColor(message.status) }}
                                        >
                                            {getStatusIcon(message.status)}
                                            {message.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="message-detail">
                    {selectedMessage ? (
                        <>
                            <div className="detail-header">
                                <div className="detail-header-left">
                                    <h3>{selectedMessage.subject || '(No Subject)'}</h3>
                                    <div className="message-meta">
                                        <span className="meta-item">
                                            <User size={14} />
                                            {selectedMessage.name}
                                        </span>
                                        <span className="meta-item">
                                            <Mail size={14} />
                                            {selectedMessage.email}
                                        </span>
                                        <span className="meta-item">
                                            <Clock size={14} />
                                            {formatDate(selectedMessage.created_at)}
                                        </span>
                                    </div>
                                </div>
                                <div className="detail-header-right">
                                    <div className="status-actions">
                                        <select
                                            value={selectedMessage.status}
                                            onChange={(e) => updateMessageStatus(selectedMessage.id, e.target.value)}
                                        >
                                            <option value="pending">Mark as Pending</option>
                                            <option value="read">Mark as Read</option>
                                            <option value="replied">Mark as Replied</option>
                                            <option value="archived">Archive</option>
                                        </select>

                                        <button
                                            className="action-btn delete"
                                            onClick={() => deleteMessage(selectedMessage.id)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="message-body">
                                <div className="message-content">
                                    {selectedMessage.message}
                                </div>
                            </div>

                            <div className="message-footer">
                                <div className="tech-info">
                                    <h4>TECHNICAL DETAILS</h4>
                                    <div className="tech-details">
                                        {selectedMessage.ip_address && (
                                            <div className="tech-item">
                                                <span>IP Address:</span>
                                                <code>{selectedMessage.ip_address}</code>
                                            </div>
                                        )}
                                        {selectedMessage.user_agent && (
                                            <div className="tech-item">
                                                <span>User Agent:</span>
                                                <small>{selectedMessage.user_agent}</small>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="no-selection">
                            <MessageSquare size={64} />
                            <h3>SELECT A MESSAGE</h3>
                            <p>Click on a message from the list to view its contents here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageDashboard;