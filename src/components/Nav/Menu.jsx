import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const Menu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef();
  const overlayRef = useRef();
  const menuItemsRef = useRef([]);
  const [expandedSection, setExpandedSection] = useState(null);

  const menuItems = [
    { 
      label: 'HOME', 
      href: '/',
      content: null
    },
    { 
      label: 'ABOUT', 
      href: '/about',
      content: {
        title: 'About AROCK',
        description: 'AROCK is a creator and curator at the intersection of music, technology, and culture. Based in New York and Los Angeles, AROCK has been a pioneering force in shaping the digital landscape of contemporary art and entertainment.',
        details: [
          'Music & Tech Pioneer',
          'Cultural Curator',
          'Creative Director',
          'Digital Innovator'
        ]
      }
    },
    { 
      label: 'WORK', 
      href: '/work',
      content: {
        title: 'Selected Work',
        description: 'A collection of groundbreaking projects spanning music production, digital art, and cultural curation.',
        projects: [
          {
            name: 'Digital Art Installations',
            description: 'Immersive experiences blending music and visual art'
          },
          {
            name: 'Music Production',
            description: 'Cutting-edge sound design and composition'
          },
          {
            name: 'Cultural Events',
            description: 'Curated experiences that bridge communities'
          },
          {
            name: 'Brand Collaborations',
            description: 'Strategic partnerships with leading cultural institutions'
          }
        ]
      }
    },
  ];

  useEffect(() => {
    if (isOpen) {
      gsap.set(menuRef.current, { display: 'block' });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      
      gsap.fromTo(
        menuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.6, ease: 'power3.out' }
      );

      gsap.fromTo(
        menuItemsRef.current,
        { x: 50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          delay: 0.2,
          ease: 'power2.out' 
        }
      );
    } else {
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(menuRef.current, { display: 'none' });
        }
      });
      
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-[998]"
        style={{ display: isOpen ? 'block' : 'none', opacity: 0 }}
      />

      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-[450px] bg-[#0a0a0a] z-[999] shadow-2xl overflow-hidden"
        style={{ display: 'none', transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col h-full p-12 overflow-y-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-white text-2xl font-bold tracking-wider">MENU</h2>
            <button
              onClick={onClose}
              className="text-white text-3xl hover:opacity-70 transition-opacity"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col gap-6 overflow-y-auto">
            {menuItems.map((item, index) => (
              <div
                key={index}
                ref={(el) => (menuItemsRef.current[index] = el)}
                style={{ opacity: 0, transform: 'translateX(50px)' }}
              >
                {item.label === 'HOME' ? (
                  <div
                    onClick={() => {
                      navigate(item.href);
                      onClose();
                    }}
                    className={`text-white text-4xl font-bold tracking-wider hover:opacity-70 transition-opacity cursor-pointer block ${
                      location.pathname === item.href ? 'opacity-100' : ''
                    }`}
                  >
                    {item.label}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <div
                        onClick={() => {
                          navigate(item.href);
                          onClose();
                        }}
                        className={`text-white text-4xl font-bold tracking-wider hover:opacity-70 transition-opacity cursor-pointer flex-1 ${
                          location.pathname === item.href ? 'opacity-100' : ''
                        }`}
                      >
                        {item.label}
                      </div>
                      <div
                        onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                        className="text-white text-2xl hover:opacity-70 transition-opacity cursor-pointer ml-4"
                      >
                        {expandedSection === index ? '−' : '+'}
                      </div>
                    </div>
                    {expandedSection === index && item.content && (
                      <div className="mt-4 pl-4 border-l-2 border-white/20 animate-fadeIn">
                        <h3 className="text-white text-xl font-semibold mb-3">{item.content.title}</h3>
                        <p className="text-white/80 text-sm mb-4 leading-relaxed">{item.content.description}</p>
                        
                        {item.content.details && (
                          <ul className="space-y-2 mb-4">
                            {item.content.details.map((detail, i) => (
                              <li key={i} className="text-white/70 text-sm">• {detail}</li>
                            ))}
                          </ul>
                        )}
                        
                        {item.content.projects && (
                          <div className="space-y-4 mb-4">
                            {item.content.projects.map((project, i) => (
                              <div key={i} className="border-b border-white/10 pb-3">
                                <h4 className="text-white font-semibold text-sm mb-1">{project.name}</h4>
                                <p className="text-white/60 text-xs">{project.description}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {item.content.contact && (
                          <div className="space-y-3 mb-4">
                            {item.content.contact.map((contact, i) => (
                              <div key={i}>
                                <span className="text-white/50 text-xs uppercase tracking-wider">{contact.type}:</span>
                                {contact.link ? (
                                  <a 
                                    href={contact.link} 
                                    className="text-white/80 text-sm ml-2 hover:text-white transition-colors"
                                  >
                                    {contact.value}
                                  </a>
                                ) : (
                                  <span className="text-white/80 text-sm ml-2">{contact.value}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {item.content.social && (
                          <div className="flex gap-4 mt-4">
                            {item.content.social.map((social, i) => (
                              <a
                                key={i}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/60 text-xs hover:text-white transition-colors uppercase tracking-wider"
                              >
                                {social.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Menu;