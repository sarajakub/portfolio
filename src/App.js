// Add this at the very top of App.js
import './index.css';
import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ArrowRight, ExternalLink } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-commerce Redesign",
      category: "Product Design",
      description: "Redesigned checkout flow, increasing conversion by 34%",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      tags: ["UX Research", "UI Design", "A/B Testing"]
    },
    {
      id: 2,
      title: "Healthcare Dashboard",
      category: "Product Design",
      description: "Patient monitoring system for clinical staff",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tags: ["Healthcare", "Data Viz", "Accessibility"]
    },
    {
      id: 3,
      title: "Mobile Banking App",
      category: "Product Design",
      description: "Simplified money management for Gen Z users",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      tags: ["Mobile", "FinTech", "User Testing"]
    }
  ];

  const research = [
    {
      id: 1,
      title: "Understanding Decision Fatigue in Digital Interfaces",
      venue: "CHI 2024",
      description: "How choice overload impacts user engagement in productivity apps",
      link: "#"
    },
    {
      id: 2,
      title: "Accessibility Patterns in Modern Design Systems",
      venue: "A11y Conference 2023",
      description: "Analysis of 50+ design systems and their accessibility practices",
      link: "#"
    },
    {
      id: 3,
      title: "Dark Patterns: A Taxonomy and User Impact Study",
      venue: "UX Research Journal",
      description: "Quantifying the effects of deceptive design on user trust",
      link: "#"
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Sara Jakubowicz
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['home', 'work', 'research', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize font-medium transition-colors ${
                  activeSection === section ? 'text-violet-600' : 'text-slate-600 hover:text-violet-600'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-violet-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-6 py-4 flex flex-col gap-4">
              {['home', 'work', 'research', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="capitalize font-medium text-left text-slate-600 hover:text-violet-600"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
            Product Designer & UX Researcher
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-violet-800 to-indigo-900 bg-clip-text text-transparent">
            Designing experiences that matter
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            I create intuitive products backed by research, with a focus on accessibility and user empowerment.
          </p>
          <button
            onClick={() => scrollToSection('work')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-full font-medium hover:bg-violet-700 transition-all hover:gap-4"
          >
            View My Work
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Selected Work</h2>
            <p className="text-xl text-slate-600">Product design projects that solved real problems</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-violet-600 font-medium mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-violet-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Research</h2>
            <p className="text-xl text-slate-600">Published work and contributions to the design community</p>
          </div>

          <div className="space-y-6">
            {research.map((paper) => (
              <div
                key={paper.id}
                className="group bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-violet-600 font-medium mb-2">{paper.venue}</div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-violet-600 transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-slate-600">{paper.description}</p>
                  </div>
                  <a
                    href={paper.link}
                    className="flex-shrink-0 p-3 bg-violet-100 text-violet-600 rounded-full hover:bg-violet-600 hover:text-white transition-all"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Let's Connect</h2>
          <p className="text-xl text-slate-600 mb-12">
            I'm always open to discussing new projects, collaborations, or opportunities.
          </p>
          
          <div className="flex justify-center gap-6 mb-12">
            <a
              href="mailto:sarajakub0@gmail.com"
              className="flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-full font-medium hover:bg-violet-700 transition-all"
            >
              <Mail size={20} />
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/sara-jakubowicz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-full font-medium hover:border-violet-600 hover:text-violet-600 transition-all"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>

          <div className="flex justify-center gap-6 text-slate-400">
            <a href="https://github.com/sarajakub" target="_blank" rel="noopener noreferrer" className="hover:text-violet-600 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/sara-jakubowicz" target="_blank" rel="noopener noreferrer" className="hover:text-violet-600 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto text-center text-slate-600">
          <p>© 2025 Sara Jakubowicz. Designed and built with React.</p>
        </div>
      </footer>
    </div>
  );
}