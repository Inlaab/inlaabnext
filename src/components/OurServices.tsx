'use client';

import React, { useEffect, useRef } from 'react';

const OurServices = () => {
  // Refs for accordion elements
  const accordionButtonRef = useRef<HTMLButtonElement>(null);
  const accordionContentRef = useRef<HTMLDivElement>(null);
  const accordionIconRef = useRef<SVGSVGElement>(null);

  const devhubAccordionButtonRef = useRef<HTMLButtonElement>(null);
  const devhubAccordionContentRef = useRef<HTMLDivElement>(null);
  const devhubAccordionIconRef = useRef<SVGSVGElement>(null);

  // Refs for animation elements
  const serviceCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Accordion functionality for Insight
    const accordionButton = accordionButtonRef.current;
    const accordionContent = accordionContentRef.current;
    const accordionIcon = accordionIconRef.current;

    const handleInsightClick = () => {
      if (!accordionButton || !accordionContent || !accordionIcon) return;

      const isExpanded =
        accordionButton.getAttribute('aria-expanded') === 'true';

      // Toggle content with smooth animation
      if (isExpanded) {
        accordionContent.classList.remove('expanded');
        accordionButton.setAttribute('aria-expanded', 'false');
        accordionIcon.style.transform = 'rotate(0deg)';
      } else {
        accordionContent.classList.add('expanded');
        accordionButton.setAttribute('aria-expanded', 'true');
        accordionIcon.style.transform = 'rotate(180deg)';
      }
    };

    const handleInsightKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleInsightClick();
      }
    };

    if (accordionButton && accordionContent && accordionIcon) {
      accordionButton.addEventListener('click', handleInsightClick);
      accordionButton.addEventListener('keydown', handleInsightKeydown);
    }

    // Accordion functionality for DevHub
    const devhubButton = devhubAccordionButtonRef.current;
    const devhubContent = devhubAccordionContentRef.current;
    const devhubIcon = devhubAccordionIconRef.current;

    const handleDevhubClick = () => {
      if (!devhubButton || !devhubContent || !devhubIcon) return;

      const isExpanded = devhubButton.getAttribute('aria-expanded') === 'true';

      // Toggle content with smooth animation
      if (isExpanded) {
        devhubContent.classList.remove('expanded');
        devhubButton.setAttribute('aria-expanded', 'false');
        devhubIcon.style.transform = 'rotate(0deg)';
      } else {
        devhubContent.classList.add('expanded');
        devhubButton.setAttribute('aria-expanded', 'true');
        devhubIcon.style.transform = 'rotate(180deg)';
      }
    };

    const handleDevhubKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleDevhubClick();
      }
    };

    if (devhubButton && devhubContent && devhubIcon) {
      devhubButton.addEventListener('click', handleDevhubClick);
      devhubButton.addEventListener('keydown', handleDevhubKeydown);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animationPlayState = 'running';
        }
      });
    }, observerOptions);

    // Observe animated elements
    document
      .querySelectorAll('.animate-fade-in, .animate-slide-up')
      .forEach(el => {
        (el as HTMLElement).style.animationPlayState = 'paused';
        observer.observe(el);
      });

    // Add staggered animation to service cards
    serviceCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.animationDelay = `${0.4 + index * 0.1}s`;
        card.classList.add('animate-slide-up');
      }
    });

    // Cleanup
    return () => {
      observer.disconnect();

      if (accordionButton) {
        accordionButton.removeEventListener('click', handleInsightClick);
        accordionButton.removeEventListener('keydown', handleInsightKeydown);
      }

      if (devhubButton) {
        devhubButton.removeEventListener('click', handleDevhubClick);
        devhubButton.removeEventListener('keydown', handleDevhubKeydown);
      }
    };
  }, []);

  return (
    <>
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-inlaab-red text-sm font-medium mb-4 tracking-wide uppercase animate-fade-in">
              Where Strategy Meets Innovation
            </p>
            <h2 className="text-4xl md:text-5xl font-rajdhani font-bold text-gray-900 mb-8 animate-slide-up">
              Our Services
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-inlaab-red to-inlaab-orange mx-auto mb-8 animate-fade-in"></div>
            <p
              className="text-gray-600 max-w-4xl mx-auto leading-relaxed animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              Discover the synergy between business acumen and technological
              prowess through INLAAB&apos;s Insight and DevHub. Our
              comprehensive services are meticulously crafted to nurture your
              company&apos;s growth and digital evolution.
            </p>
          </div>

          {/* Insight Section */}
          <div className="mb-16">
            <h3
              className="text-5xl md:text-6xl font-heading italic text-gray-900 text-center mb-12 animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              Insight
            </h3>

            {/* Service Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* IDEALAB */}
              <div
                ref={el => {
                  if (el) serviceCardsRef.current[0] = el;
                }}
                className="service-card group"
              >
                <div className="service-icon-container group-hover:opacity-0 transition-opacity duration-500">
                  <svg
                    className="service-icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                {/* Background Icon (appears from bottom-left corner) */}
                <div className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-10 transition-all duration-700 ease-in-out transform scale-0 group-hover:scale-150 origin-bottom-left">
                  <svg
                    className="w-32 h-32 text-inlaab-red"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h4 className="service-title font-rajdhani">IDEALAB</h4>
                <p className="service-description">
                  Introducing your incubator for the extraordinary, where
                  initial concepts evolve into validated business models.
                  It&apos;s the fertile ground for disruptive startups, MVPs,
                  and early-stage ventures.
                </p>
              </div>

              {/* GROWING UP */}
              <div
                ref={el => {
                  if (el) serviceCardsRef.current[1] = el;
                }}
                className="service-card group"
              >
                <div className="service-icon-container group-hover:opacity-0 transition-opacity duration-500">
                  <svg
                    className="service-icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    <circle cx="12" cy="8" r="2" />
                  </svg>
                </div>
                {/* Background Icon (appears from bottom-left corner) */}
                <div className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-10 transition-all duration-700 ease-in-out transform scale-0 group-hover:scale-150 origin-bottom-left">
                  <svg
                    className="w-32 h-32 text-inlaab-red"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    <circle cx="12" cy="8" r="2" />
                  </svg>
                </div>
                <h4 className="service-title font-rajdhani">GROWING UP</h4>
                <p className="service-description">
                  Is dedicated to boosting the growth and scalability of small
                  and medium-sized businesses/projects. We conduct thorough
                  analyses of current operations to pinpoint improvement areas
                  and devise strategies that propel growth. From process
                  optimization and management tool implementation to logistics
                  and information management improvements, our aim is to unleash
                  our clients&apos; growth potential and elevate their
                  operations to new heights.
                </p>
              </div>

              {/* ADVANCED BUSINESS */}
              <div
                ref={el => {
                  if (el) serviceCardsRef.current[2] = el;
                }}
                className="service-card group"
              >
                <div className="service-icon-container group-hover:opacity-0 transition-opacity duration-500">
                  <svg
                    className="service-icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                    <path d="M7 7h2v2H7zm10 10h2v2h-2z" />
                  </svg>
                </div>
                {/* Background Icon (appears from bottom-left corner) */}
                <div className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-10 transition-all duration-700 ease-in-out transform scale-0 group-hover:scale-150 origin-bottom-left">
                  <svg
                    className="w-32 h-32 text-inlaab-red"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                    <path d="M7 7h2v2H7zm10 10h2v2h-2z" />
                  </svg>
                </div>
                <h4 className="service-title font-rajdhani">
                  ADVANCED BUSINESS
                </h4>
                <p className="service-description">
                  Embodies our suite of enterprise-level solutions tailored for
                  established companies poised to amplify their digital
                  transformation. We excel in analyzing, optimizing, and
                  redefining existing business models to integrate advanced
                  technological solutions. From implementing enterprise
                  management systems to automating key processes, our mission is
                  to enhance operational efficiency and foster sustainable
                  growth.
                </p>
              </div>
            </div>

            {/* Enhanced Accordion */}
            <div className="max-w-4xl mx-auto">
              <div className="accordion-container">
                <button
                  ref={accordionButtonRef}
                  className="accordion-trigger"
                  aria-expanded="false"
                >
                  <span className="accordion-title">Details</span>
                  <div className="accordion-icon-wrapper">
                    <svg
                      ref={accordionIconRef}
                      className="accordion-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </button>

                <div ref={accordionContentRef} className="accordion-content">
                  <div className="accordion-inner">
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-5">
                        <div className="detail-item">
                          <h5 className="detail-title">
                            Idea Conceptualization:
                          </h5>
                          <p className="detail-description">
                            Engaging in creative brainstorming to forge clear
                            and viable proposals.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">Prototyping:</h5>
                          <p className="detail-description">
                            Agile development of functional prototypes for early
                            concept validation and feedback.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">(UX) Design:</h5>
                          <p className="detail-description">
                            Crafting intuitive and engaging interfaces to ensure
                            an optimal end-user experience.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">Business Modeling:</h5>
                          <p className="detail-description">
                            Building robust and scalable business models to
                            support project viability and profitability.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">
                            Strategic Consulting:
                          </h5>
                          <p className="detail-description">
                            Deep analysis of the current situation of the
                            company and development of strategies for digital
                            transformation.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div className="detail-item">
                          <h5 className="detail-title">
                            Advanced Data Analysis:
                          </h5>
                          <p className="detail-description">
                            Use of advanced data analysis techniques to extract
                            valuable insights and make data-driven decisions.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">
                            Organizational Change Management:
                          </h5>
                          <p className="detail-description">
                            Design and implementation of strategies to manage
                            change and ensure a smooth transition to new
                            business models.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">
                            Operational Process Optimization:
                          </h5>
                          <p className="detail-description">
                            Identification and elimination of bottlenecks,
                            redundancies, and outdated processes to enhance
                            efficiency.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">
                            Management Tool Implementation:
                          </h5>
                          <p className="detail-description">
                            Deployment of enterprise management systems (ERP,
                            CRM) to centralize information and facilitate
                            decision-making.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">
                            Internal Capability Development:
                          </h5>
                          <p className="detail-description">
                            Training and development of internal talent to
                            enhance skills and competencies necessary for
                            growth.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DevHub Section */}
          <div className="mb-16 mt-16">
            <h3
              className="text-5xl md:text-6xl font-heading italic text-gray-900 text-center mb-12 animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              <span className="text-inlaab-red">DevHub</span>
            </h3>

            {/* Service Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* HARDWARE ENGINEERING */}
              <div
                ref={el => {
                  if (el) serviceCardsRef.current[3] = el;
                }}
                className="service-card group"
              >
                <div className="service-icon-container group-hover:opacity-0 transition-opacity duration-500">
                  <svg
                    className="service-icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
                  </svg>
                </div>
                {/* Background Icon (appears from bottom-left corner) */}
                <div className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-10 transition-all duration-700 ease-in-out transform scale-0 group-hover:scale-150 origin-bottom-left">
                  <svg
                    className="w-32 h-32 text-inlaab-red"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
                  </svg>
                </div>
                <h4 className="service-title font-rajdhani text-inlaab-red">
                  HARDWARE ENGINEERING
                </h4>
                <p className="service-description">
                  It is the area of the tangible, where we work on solutions
                  that require hardware, electronics, and existing technologies
                  in general, pursuing objectives such as: strategic migration
                  to new technologies, prototyping, research projects,
                  innovation processes, development, energy efficiency, and
                  optimization of industrial processes.
                </p>
              </div>

              {/* TAILORED SOFTWARE */}
              <div
                ref={el => {
                  if (el) serviceCardsRef.current[4] = el;
                }}
                className="service-card group"
              >
                <div className="service-icon-container group-hover:opacity-0 transition-opacity duration-500">
                  <svg
                    className="service-icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                  </svg>
                </div>
                {/* Background Icon (appears from bottom-left corner) */}
                <div className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-10 transition-all duration-700 ease-in-out transform scale-0 group-hover:scale-150 origin-bottom-left">
                  <svg
                    className="w-32 h-32 text-inlaab-red"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                  </svg>
                </div>
                <h4 className="service-title font-rajdhani text-inlaab-red">
                  TAILORED SOFTWARE
                </h4>
                <p className="service-description">
                  In the area of custom software development, we focus on
                  continually improving company processes and shaping
                  people&apos;s ideas. We create scalable and sustainable IT
                  structures, guided by a product-oriented vision and end-user
                  needs. Our methodology lies in implementing best practices in
                  software development processes, following our clients&apos;
                  strategic vision.
                </p>
              </div>

              {/* INNOVATIVE AI PRODUCTS */}
              <div
                ref={el => {
                  if (el) serviceCardsRef.current[5] = el;
                }}
                className="service-card group"
              >
                <div className="service-icon-container group-hover:opacity-0 transition-opacity duration-500">
                  <svg
                    className="service-icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
                  </svg>
                </div>
                {/* Background Icon (appears from bottom-left corner) */}
                <div className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-10 transition-all duration-700 ease-in-out transform scale-0 group-hover:scale-150 origin-bottom-left">
                  <svg
                    className="w-32 h-32 text-inlaab-red"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
                  </svg>
                </div>
                <h4 className="service-title font-rajdhani text-inlaab-red">
                  INNOVATIVE AI PRODUCTS
                </h4>
                <p className="service-description">
                  In this domain, our focus lies in crafting Artificial
                  Intelligence-driven solutions, recognizing the challenges
                  posed by the relentless growth of data in today&apos;s
                  interconnected landscape. Harnessing the power of AI is
                  imperative, as it streamlines processes, from automating
                  mundane tasks to conducting insightful data analyses,
                  ultimately paving the way for a personalized and efficient
                  multi-tasking assistant.
                </p>
              </div>
            </div>

            {/* Enhanced Accordion */}
            <div className="max-w-4xl mx-auto">
              <div className="accordion-container">
                <button
                  ref={devhubAccordionButtonRef}
                  className="accordion-trigger"
                  aria-expanded="false"
                >
                  <span className="accordion-title text-inlaab-red">
                    Details
                  </span>
                  <div className="accordion-icon-wrapper">
                    <svg
                      ref={devhubAccordionIconRef}
                      className="accordion-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </button>

                <div
                  ref={devhubAccordionContentRef}
                  className="accordion-content"
                >
                  <div className="accordion-inner">
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-5">
                        <div className="detail-item">
                          <h5 className="detail-title">
                            <strong>Automation:</strong>
                          </h5>
                          <p className="detail-description">
                            Automatic solutions ranging from mechatronic systems
                            to robotics, optimizing processes and increasing
                            efficiency.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">
                            <strong>
                              Integration of Technologies and Hardware:
                            </strong>
                          </h5>
                          <p className="detail-description">
                            Integration of remote sensing, unmanned vehicles,
                            and electronic security for smooth and secure
                            management.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">
                            <strong>Process Control and Optimization:</strong>
                          </h5>
                          <p className="detail-description">
                            Implementation of control systems to improve
                            operational efficiency and product quality.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">
                            <strong>Digital Assets:</strong>
                          </h5>
                          <p className="detail-description">
                            Development of multi-platform applications and
                            customized software to maximize digital assets and
                            enhance user experience.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">
                            <strong>
                              Process Automation and Digitalization:
                            </strong>
                          </h5>
                          <p className="detail-description">
                            Management of scalable databases and cloud systems
                            for agile information management.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div className="detail-item">
                          <h5 className="detail-title">
                            <strong>Software Integrations:</strong>
                          </h5>
                          <p className="detail-description">
                            Connection of third-party interfaces and popular
                            services for seamless integration.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">
                            <strong>Advanced Software:</strong>
                          </h5>
                          <p className="detail-description">
                            Specialization in system programming, software
                            updates, and innovative solutions in Web 3 and
                            Blockchain.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">
                            <strong>Intelligent Automation:</strong>
                          </h5>
                          <p className="detail-description">
                            Implementation of artificial vision solutions and
                            Machine Learning systems for adaptive automation.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">
                            <strong>Data Analytics:</strong>
                          </h5>
                          <p className="detail-description">
                            Utilization of Big Data and data intelligence to
                            extract valuable insights and make informed
                            decisions.
                          </p>
                        </div>

                        <div className="detail-item">
                          <h5 className="detail-title">
                            <strong>AI Assistant:</strong>
                          </h5>
                          <p className="detail-description">
                            Development of intelligent chatbots and artificial
                            intelligence systems to improve communication and
                            productivity.
                          </p>
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

      <style jsx>{`
        /* Enhanced Service Cards */
        .service-card {
          position: relative;
          text-align: center;
          padding: 2rem;
          border-radius: 1rem;
          background-color: white;
          box-shadow:
            0 1px 3px 0 rgba(0, 0, 0, 0.1),
            0 1px 2px 0 rgba(0, 0, 0, 0.06);
          transition: all 0.5s ease-out;
          cursor: pointer;
          overflow: hidden;
          transform: translateY(0);
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .service-icon-container {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 10;
        }

        .service-icon {
          width: 3rem;
          height: 3rem;
          color: #d52828;
          transition: all 0.3s;
        }

        .service-card:hover .service-icon {
          transform: scale(1.1) rotate(5deg);
          color: #f67f00;
        }

        .service-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
          letter-spacing: 0.025em;
          position: relative;
          z-index: 10;
          transition: color 0.3s;
        }

        .service-card:hover .service-title {
          color: #d52828;
        }

        .service-description {
          font-size: 0.875rem;
          color: #4b5563;
          line-height: 1.625;
          position: relative;
          z-index: 10;
          transition: color 0.3s;
        }

        .service-card:hover .service-description {
          color: #374151;
        }

        /* Enhanced Accordion */
        .accordion-container {
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          box-shadow:
            0 1px 3px 0 rgba(0, 0, 0, 0.1),
            0 1px 2px 0 rgba(0, 0, 0, 0.06);
          transition: all 0.3s;
          overflow: hidden;
          background-color: white;
        }

        .accordion-container:hover {
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .accordion-trigger {
          width: 100%;
          padding: 1.5rem 2rem;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s;
          outline: none;
          border: none;
          background: transparent;
        }

        .accordion-trigger:hover {
          background: linear-gradient(
            to right,
            #f9fafb,
            rgba(243, 244, 246, 0.5)
          );
        }

        .accordion-title {
          font-weight: 600;
          color: #111827;
          font-size: 1.125rem;
          letter-spacing: 0.025em;
        }

        .accordion-icon-wrapper {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background-color: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .accordion-trigger:hover .accordion-icon-wrapper {
          background: linear-gradient(135deg, #d52828 0%, #f67f00 100%);
        }

        .accordion-trigger:hover .accordion-icon {
          color: white;
        }

        .accordion-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #6b7280;
          transform: rotate(0deg);
          transition: all 0.3s ease-out;
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: all 0.5s ease-out;
        }

        .accordion-content.expanded {
          max-height: 1000px;
        }

        .accordion-inner {
          border-top: 1px solid rgba(229, 231, 235, 0.3);
          padding: 3rem 2rem;
          background: linear-gradient(
            135deg,
            rgba(249, 250, 251, 0.8) 0%,
            rgba(255, 255, 255, 0.95) 100%
          );
          backdrop-filter: blur(10px);
        }

        .detail-item {
          padding: 1.75rem 1.5rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(229, 231, 235, 0.2);
          backdrop-filter: blur(8px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .detail-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #dc2626, #ef4444, #f87171);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .detail-item:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(220, 38, 38, 0.1);
          box-shadow:
            0 8px 25px -8px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(220, 38, 38, 0.05);
        }

        .detail-item:hover::before {
          transform: scaleX(1);
        }

        .detail-title {
          font-weight: 500;
          color: #1f2937;
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
          letter-spacing: -0.025em;
          line-height: 1.4;
        }

        .detail-title strong {
          color: #dc2626;
          font-weight: 600;
        }

        .detail-description {
          font-size: 0.95rem;
          color: #6b7280;
          line-height: 1.7;
          font-weight: 400;
          letter-spacing: 0.01em;
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .accordion-content.expanded .detail-item {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .accordion-content.expanded .detail-item:nth-child(1) {
          animation-delay: 0.1s;
        }
        .accordion-content.expanded .detail-item:nth-child(2) {
          animation-delay: 0.2s;
        }
        .accordion-content.expanded .detail-item:nth-child(3) {
          animation-delay: 0.3s;
        }
        .accordion-content.expanded .detail-item:nth-child(4) {
          animation-delay: 0.4s;
        }
        .accordion-content.expanded .detail-item:nth-child(5) {
          animation-delay: 0.5s;
        }

        /* Responsive enhancements */
        @media (max-width: 768px) {
          .service-card {
            padding: 1.5rem;
          }

          .accordion-trigger {
            padding: 1.25rem 1.5rem;
          }

          .accordion-inner {
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default OurServices;
