'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (showThankYou) {
      const timer = setTimeout(() => {
        setShowThankYou(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showThankYou]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        setShowThankYou(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='app-container'>
      {/* Navigation */}
      <nav className='nav'>
        <div className='container nav-inner'>
          <a
            href='#home'
            className='nav-logo'
          >
            Ray Software
          </a>
          <div className='nav-links'>
            <a
              href='#what-we-do'
              className='nav-link'
            >
              What We Do
            </a>
            <a
              href='#products'
              className='nav-link'
            >
              Products
            </a>
            <a
              href='#contact'
              className='nav-cta'
            >
              Contact
            </a>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='menu-toggle'
          >
            <svg
              className='menu-icon'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className='mobile-menu'>
            <div className='mobile-menu-inner'>
              <a
                href='#what-we-do'
                className='mobile-link'
                onClick={() => setIsMenuOpen(false)}
              >
                What We Do
              </a>
              <a
                href='#products'
                className='mobile-link'
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </a>
              <a
                href='#contact'
                className='mobile-link'
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id='home'
        className='hero'
      >
        {/* Background Effects */}
        <div className='hero-bg'></div>
        <div className='hero-glow-blue animate-pulse-slow'></div>
        <div className='hero-glow-purple animate-pulse-slow-delayed'></div>

        <div className='hero-content'>
          {/* Left - Company Name & Tagline */}
          <div className='hero-text'>
            <h1 className='hero-title'>
              <span className='hero-title-gradient'>Ray Software</span>
            </h1>

            <p className='hero-tagline'>
              Crafting exceptional digital experiences that inspire{' '}
              <span className='hero-highlight'>millions daily</span>
            </p>

            <div className='hero-buttons'>
              <a
                href='#products'
                className='btn-primary'
              >
                Explore Products
                <svg
                  className='btn-primary-icon'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </a>
              <a
                href='#contact'
                className='btn-secondary'
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right - Geometric Graphic */}
          <div className='hero-graphic'>
            <div className='hero-graphic-container'>
              {/* Animated Geometric Shapes */}
              <div className='hero-graphic-inner'>
                {/* Outer Ring */}
                <div className='outer-ring'></div>

                {/* Middle Hexagon */}
                <div
                  className='middle-hexagon'
                  style={{
                    clipPath:
                      'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                  }}
                ></div>

                {/* Center Square */}
                <div className='center-square'></div>

                {/* Inner Circle */}
                <div className='inner-circle'></div>

                {/* Floating Dots */}
                <div className='floating-dot floating-dot-1'></div>
                <div className='floating-dot floating-dot-2'></div>
                <div className='floating-dot floating-dot-3'></div>
                <div className='floating-dot floating-dot-4'></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section
        id='what-we-do'
        className='section-what-we-do'
      >
        <div className='container'>
          <div className='section-header'>
            <h2 className='section-title'>What We Do</h2>
            <p className='section-subtitle'>
              We build premium software that transforms industries and delights
              users
            </p>
          </div>

          <div className='features-grid'>
            {/* Feature 1 */}
            <div className='feature-card feature-card-blue'>
              <div className='feature-card-overlay feature-card-overlay-blue'></div>
              <div className='feature-card-content'>
                <div className='feature-icon feature-icon-blue'>🚀</div>
                <h3 className='feature-title'>Innovation First</h3>
                <p className='feature-description'>
                  Cutting-edge technology and forward-thinking solutions that
                  set industry standards
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className='feature-card feature-card-purple'>
              <div className='feature-card-overlay feature-card-overlay-purple'></div>
              <div className='feature-card-content'>
                <div className='feature-icon feature-icon-purple'>💎</div>
                <h3 className='feature-title'>Premium Quality</h3>
                <p className='feature-description'>
                  Meticulous attention to detail in every pixel, every
                  interaction, every feature
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className='feature-card feature-card-pink'>
              <div className='feature-card-overlay feature-card-overlay-pink'></div>
              <div className='feature-card-content'>
                <div className='feature-icon feature-icon-pink'>🤖</div>
                <h3 className='feature-title'>AI Powered</h3>
                <p className='feature-description'>
                  Intelligent systems that learn, adapt, and elevate user
                  experiences
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id='products'
        className='section-products'
      >
        <div className='container'>
          <div className='section-header'>
            <h2 className='section-title'>Our Products</h2>
            <p className='section-subtitle'>
              Thoughtfully crafted software for the modern world
            </p>
          </div>

          {/* Product Card - MyDressr */}
          <div className='product-card'>
            <div className='product-card-overlay'></div>

            <div className='product-card-inner'>
              {/* Product Info */}
              <div className='product-info'>
                <div className='product-badge'>
                  <span className='product-badge-text'>✨ FEATURED APP</span>
                </div>

                <h3 className='product-title'>MyDressr</h3>

                <p className='product-tagline'>Your wardrobe, reimagined</p>

                <p className='product-description'>
                  Transform how you style yourself with AI-powered fashion
                  intelligence. Organize your wardrobe, discover perfect
                  outfits, and express your unique style effortlessly.
                </p>

                <div className='product-buttons'>
                  <a
                    href='https://mydressr.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn-product-primary'
                  >
                    Visit MyDressr
                    <svg
                      className='btn-product-primary-icon'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2.5}
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </svg>
                  </a>
                  <a
                    href='https://mydressr.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn-product-secondary'
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Product Visual */}
              <div className='product-visual'>
                <div className='product-visual-glow'></div>

                {/* iPhone Mockup */}
                <div className='iphone-mockup'>
                  <div className='iphone-frame'>
                    <div className='iphone-screen'>
                      {/* Status Bar */}
                      <div className='iphone-status-bar'>
                        <span>9:41</span>
                        <div className='iphone-notch'></div>
                        <div className='iphone-status-icons'>
                          <svg
                            className='iphone-status-icon'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' />
                          </svg>
                        </div>
                      </div>

                      {/* App Content */}
                      <div className='iphone-content'>
                        <div className='iphone-app-header'>
                          <div className='iphone-app-icon'>👗</div>
                          <div>
                            <div className='iphone-app-title'>MyDressr</div>
                            <div className='iphone-app-subtitle'>
                              Fashion AI
                            </div>
                          </div>
                        </div>

                        <div className='iphone-card'>
                          <div className='iphone-card-title'>
                            Today's Outfit
                          </div>
                          <div className='iphone-card-grid'>
                            {['👔', '👗', '👠'].map((emoji, i) => (
                              <div
                                key={i}
                                className='iphone-card-item'
                              >
                                {emoji}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className='iphone-list'>
                          <div className='iphone-list-item'>
                            <div className='iphone-list-icon iphone-list-icon-blue'>
                              👜
                            </div>
                            <div className='iphone-list-text'>
                              <div className='iphone-list-title'>
                                Accessories
                              </div>
                              <div className='iphone-list-subtitle'>
                                24 items
                              </div>
                            </div>
                          </div>
                          <div className='iphone-list-item'>
                            <div className='iphone-list-icon iphone-list-icon-pink'>
                              🧥
                            </div>
                            <div className='iphone-list-text'>
                              <div className='iphone-list-title'>Outerwear</div>
                              <div className='iphone-list-subtitle'>
                                18 items
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='iphone-cta'>
                          <div className='iphone-cta-text'>
                            Get AI Recommendations
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id='contact'
        className='section-contact'
      >
        <div className='section-contact-overlay'></div>

        <div className='contact-container'>
          <div className='contact-header'>
            <h2 className='section-title'>Questions?</h2>
            <p className='section-subtitle'>
              Have a question about our apps? We'd love to hear from you.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className='contact-form'
          >
            <div>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                placeholder='Your name'
                className='form-input'
              />
            </div>
            <div>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                placeholder='your@email.com'
                className='form-input'
              />
            </div>
            <div>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder='Your question or feedback...'
                className='form-textarea'
              ></textarea>
            </div>
            <button
              type='submit'
              className='btn-submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className='footer'>
        <div className='container'>
          <div className='footer-inner'>
            <div className='footer-brand'>
              <div className='footer-logo'>Ray Software</div>
              <p className='footer-tagline'>
                Crafting exceptional digital experiences
              </p>
            </div>
            <div className='footer-links'>
              <a
                href='#home'
                className='footer-link'
              >
                Home
              </a>
              <a
                href='#what-we-do'
                className='footer-link'
              >
                What We Do
              </a>
              <a
                href='#products'
                className='footer-link'
              >
                Products
              </a>
              <a
                href='#contact'
                className='footer-link'
              >
                Contact
              </a>
            </div>
          </div>
          <div className='footer-bottom'>
            © 2025 Ray Software. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Thank You Modal */}
      {showThankYou && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <div className='modal-icon'>✓</div>
            <h3 className='modal-title'>Thank You!</h3>
            <p className='modal-text'>We'll get back to you soon.</p>
          </div>
        </div>
      )}
    </div>
  );
}
