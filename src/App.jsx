import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ArrowRight } from 'lucide-react';
import home from './assets/home.png';
import nature from './assets/Nature.png';
import luxury from './assets/luxury.png';
import footer from './assets/footer.png';
import footer_back from './assets/footer-back.jpg';
import './index.css';
import { motion } from 'framer-motion';
import Payment_Plan from './assets/Payment-Plan.pdf';

// PropertySlider Component
const PropertySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const properties = [
    {
      id: 1,
      name: "Hillside Villa",
      price: "$1,250,000",
      bedrooms: 4,
      bathrooms: 3.5,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=400&fit=crop",
      description: "Modern luxury villa with panoramic views and contemporary design.",
      gradient: ""
    },
    { 
      id: 2,
      name: "The Crestview",
      price: "$2,100,000",
      bedrooms: 5,
      bathrooms: 5.5,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&h=400&fit=crop",
      description: "Where elegance meets innovation—a seamless blend of architecture, luxury, and nature.",
      gradient: "from-orange-400 to-pink-600"
    },
    {
      id: 3,
      name: "The Willowbrook",
      price: "$1,850,000",
      bedrooms: 6,
      bathrooms: 4.5,
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&h=400&fit=crop",
      description: "Contemporary design meets natural beauty in this stunning retreat.",
      gradient: "from-emerald-400 to-teal-600"
    },
    {
      id: 4,
      name: "Aurora Retreat",
      price: "$3,200,000",
      bedrooms: 7,
      bathrooms: 6.5,
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=500&h=400&fit=crop",
      description: "A sanctuary with timeless design and exceptional craftsmanship.",
      gradient: "from-violet-400 to-indigo-600"
    },
    {
      id: 5,
      name: "Sunset Haven",
      price: "$2,750,000",
      bedrooms: 5,
      bathrooms: 4,
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&h=400&fit=crop",
      description: "Luxurious living with breathtaking sunset views and modern amenities.",
      gradient: "from-amber-400 to-orange-600"
    }
  ];

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev >= properties.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev <= 0 ? properties.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out "
        style={{
          transform: `translateX(-${(currentSlide * 100) / (window.innerWidth > 1024 ? 3 : 1)}%)`,
          width: `${properties.length * (window.innerWidth > 1024 ? 33.33 : 100)}%`
        }}
      >
        {properties.map((property, index) => (
          <div
            key={property.id}
            className="flex-shrink-0 w-full lg:w-1/3 px-3"
            style={{ width: window.innerWidth > 1024 ? '33.33%' : '100%' }}
          >
            <div className="relative group cursor-pointer h-80">
              <div className={`h-full bg-gradient-to-br ${property.gradient} rounded-2xl overflow-hidden relative shadow-lg hover:shadow-xl transition-all duration-300`}>
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${property.gradient} opacity-60`}></div>

                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-2xl font-light mb-2">{property.price}</div>
                  <h3 className="text-lg font-semibold mb-1">{property.name}</h3>
                  <div className="flex space-x-3 text-sm opacity-90 mb-2">
                    <span>{property.bedrooms} bed</span>
                    <span>{property.bathrooms} bath</span>
                  </div>
                </div>

                <button className="absolute top-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition opacity-0 group-hover:opacity-100">
                  <ArrowRight size={18} />
                </button>
              </div>

              {currentSlide === index && (
                <div className="P-2 PY-2 mt-4 transform transition-all duration-300">
                  <p className="text-gray-600 text-sm">{property.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:scale-105"
        disabled={isTransitioning}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:scale-105"
        disabled={isTransitioning}
      >
        <ChevronRight size={20} />
      </button>

      <div className="flex justify-center mt-8 space-x-2">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-black w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

const OaklandGreensWebsite = () => {
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Prime Locations');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const handleButtonClick = () => {
    try {
      if (Payment_Plan) {
        window.open(Payment_Plan, '_blank');
      } else {
        console.error('Payment_Plan is undefined');
        alert('Failed to open the payment plan file. Please ensure the file is correctly placed in the assets folder.');
      }
    } catch (error) {
      console.error('Error opening payment plan file:', error);
      alert('An error occurred while opening the payment plan file.');
    }
  };

  const items = [
    {
      title: 'Prime Locations',
      description: 'Our farmhouses are located in peaceful, private areas, giving you the perfect escape while still being close to modern conveniences. Enjoy the best of nature and luxury combined.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&h=400&fit=crop',
      gradient: 'from-blue-400/30 to-purple-600/30'
    },
    {
      title: 'Modern Comfort',
      description: 'Every home features state-of-the-art technology and premium finishes for ultimate comfort.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=400&fit=crop',
      gradient: 'from-green-400/30 to-yellow-600/30'
    },
    {
      title: 'State-of-the-Art Amenities',
      description: 'From infinity pools to smart home systems, every amenity is designed for luxury living.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&h=400&fit=crop',
      gradient: 'from-red-400/30 to-yellow-600/30'
    },
    {
      title: 'Natural Beauty',
      description: 'Surrounded by pristine landscapes and designed to complement natural surroundings.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=400&fit=crop',
      gradient: 'from-purple-400/30 to-pink-600/30'
    }
  ];

  const faqs = [
    {
      question: "Can I customize the design of a Oakland?",
      answer: "Absolutely. Each Oakland is tailored to reflect your unique vision. From layouts to finishes, we work with you to create a space that perfectly suits your style and needs."
    },
    {
      question: "Where are Oakland Greens located?",
      answer: "Our properties are located in prime locations across the region, carefully selected for their natural beauty and accessibility to modern conveniences."
    },
    {
      question: "What is the process for purchasing a Oakland?",
      answer: "Our process involves consultation, design, approval, and construction phases, with dedicated support throughout your journey."
    },
    {
      question: "Do you offer fully custom-built homes?",
      answer: "Yes, we specialize in fully custom-built luxury homes tailored to your exact specifications and lifestyle needs."
    },
    {
      question: "How long does it take to complete a home?",
      answer: "Timeline varies based on customization level and size of the project, typically ranging from 8-18 months."
    }
  ];

  const blogPosts = [
    {
      title: "The Rise of Boutique Architecture in Luxury Living",
      description: "Discover how boutique architecture is redefining luxury living with its focus on uniqueness, personalization, and timeless design.",
      author: "Emily Chambers",
      role: "Marketing Consultant",
      category: "Must Read",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop"
    },
    {
      title: "The Future of Luxury: AI and Automation in Home Design",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    },
    {
      title: "Are Sustainable Materials the Future of Homes?",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop"
    },
    {
      title: "Exploring Minimalism with a Touch of Luxury",
      category: "Design",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="bg-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.8s ease-out forwards;
        }
        
        .animate-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animate-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animate-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animate-delay-800 {
          animation-delay: 0.8s;
        }
        
        .opacity-0 {
          opacity: 0;
        }
        
        .section-fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        
        .section-fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stagger-children > * {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        
        .stagger-children.visible > *:nth-child(1) { transition-delay: 0.1s; }
        .stagger-children.visible > *:nth-child(2) { transition-delay: 0.2s; }
        .stagger-children.visible > *:nth-child(3) { transition-delay: 0.3s; }
        .stagger-children.visible > *:nth-child(4) { transition-delay: 0.4s; }
        .stagger-children.visible > *:nth-child(5) { transition-delay: 0.5s; }
        
        .stagger-children.visible > * {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-white font-semibold text-xl">OAKLAND</div>
          
          <button 
            onClick={toggleMenu}
            className="text-white text-2xl font-light focus:outline-none z-60 relative"
          >
            <div className={`transform transition-all duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className={`block w-6 h-0.5 bg-white transform transition-all duration-300 ${isOpen ? 'rotate-90 -translate-y-1.5' : 'rotate-0'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-black z-40 transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-12">
            <a 
              href="#" 
              className="block text-white text-5xl md:text-6xl font-light hover:text-gray-300 transition-all duration-300 hover:scale-110"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a 
              href="#" 
              className="block text-white text-5xl md:text-6xl font-light hover:text-gray-300 transition-all duration-300 hover:scale-110"
              onClick={toggleMenu}
            >
              Properties
            </a>
            <a 
              href="#" 
              className="block text-white text-5xl md:text-6xl font-light hover:text-gray-300 transition-all duration-300 hover:scale-110"
              onClick={toggleMenu}
            >
              About
            </a>
            <a 
              href="#" 
              className="block text-white text-5xl md:text-6xl font-light hover:text-gray-300 transition-all duration-300 hover:scale-110"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <section className="relative h-screen bg-gradient-to-b from-blue-400 to-blue-100 pt-24 pb-10 opacity-90">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center text-white z-20 mb-72 px-4"
        >
          <h1 className="text-4xl md:text-6xl font-light mb-4 hero leading-tight">
            Farmhouse<br />
            Living Like Never Before
          </h1>
          <p className="text-base md:text-lg max-w-md mx-auto opacity-90 mb-2">
            Discover luxury living designed for the ultimate<br />
            living experience with swimming pools and modern<br />
            amenities.
          </p>
          <button
            className="bg-white text-black px-4 py-2 rounded-2xl text-md"
            onClick={handleButtonClick}
          >
            Explore Payment Plan
          </button>
        </motion.div>

        <div className="absolute inset-0 pt-4 z-10">
          <div className="relative h-full flex justify-center items-center">
            <img
              src={home}
              alt="Home"
              className="absolute top-1/2 left-1/2 transform homes -translate-x-1/2 -translate-y-1/2 inset-0 object-cover fade-in-out-image"
              style={{ width: 702, marginTop: '122px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white opacity-85" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto luxury text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl font-semibold mb-4"
          >
            It's Luxury Living
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center  justify-center mb-8 nature"
          >
            <span className="text-5xl font-semibold">Embraced by</span>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mx-4 w-24 h-12 rounded-full overflow-hidden luxury flex items-center justify-center shadow-md border"
            >
              <img
                src={nature}
                alt="Nature"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <span className="text-5xl font-semibold">Nature.</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Oakland Greens offers more than a home—it's a lifestyle. Crafted with precision and
            surrounded by nature, each farmhouse reflects your unique style, blending luxury and
            tranquility in perfect harmony.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden shadow-sm px-2">
              <input
                type="email"
                placeholder="Your Email Address"
                className="bg-transparent px-6 py-2 focus:outline-none w-64 text-sm placeholder-gray-500"
              />
              <button className="bg-black text-white px-8 py-3 text-sm font-medium rounded-2xl hover:bg-gray-800 transition">
                Stay Updated
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-8 relative w-54 h-50">
            <img src={luxury} alt="" className="rounded-lg" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white pointer-events-none" />
          </div>

          <div className="flex justify-between items-start mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-light mb-4">
                Explore Our Luxury<br />Farmhouses.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-right"
            >
              <p className="text-gray-600 mb-2">Exclusive Luxury Farmhouses</p>
              <p className="text-gray-600">Crafted for You.</p>
            </motion.div>
          </div>

          <PropertySlider />
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-light mb-4">
              Exceptional Living Begins<br />with Every Detail.
            </h2>
            <p className="text-gray-600">
              Discover the Details That Make Every Oakland Greens Home a Masterpiece.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              transition={{ staggerChildren: 0.2 }}
              viewport={{ once: true }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  className="border-l-4 border-black pl-6 cursor-pointer"
                  onClick={() => handleClick(item.title)}
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
                  }}
                >
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square bg-gradient-to-br rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={items.find(item => item.title === selectedItem).image}
                  alt={selectedItem}
                  className="w-full h-full object-cover opacity-80"
                />
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${items.find(item => item.title === selectedItem).gradient}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex insights justify-between items-start mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-normal leading-tight">
                Discover insights,<br />
                trends, and inspiration.
              </h2>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition flex items-center text-sm font-medium"
            >
              View all <ArrowRight size={16} className="ml-2" />
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=450&fit=crop"
                  alt="Modern Architecture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-pink-500/10 to-blue-400/30"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <span className="bg-black text-white px-4 w-32 py-2 rounded-full text-sm mb-6">Must Read</span>
              <h3 className="text-3xl font-normal mb-4 leading-snug">
                The Rise of Boutique Architecture in Luxury Living
              </h3>
              <p className="text-gray-600 mb-8 text-base leading-relaxed">
                Discover how boutique architecture is redefining luxury living with its focus on uniqueness, personalization, and timeless design.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">EC</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Emily Chambers</div>
                    <div className="text-sm text-gray-500">Marketing Consultant</div>
                  </div>
                </div>
                <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm">Lifestyle</span>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-3xl mb-6 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
                  alt="AI Technology"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-600/40 rounded-3xl"></div>
              </div>
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">Innovation</span>
              <h3 className="text-xl font-medium mt-4 group-hover:text-gray-600 transition leading-snug">
                The Future of Luxury: AI and Automation in Home Design
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-3xl mb-6 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop"
                  alt="Sustainable Home"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-emerald-600/40 rounded-3xl"></div>
              </div>
              <span className="bg-green-700 text-white px-4 py-2 rounded-full text-sm">Sustainability</span>
              <h3 className="text-xl font-medium mt-4 group-hover:text-gray-600 transition leading-snug">
                Are Sustainable Materials the Future of Homes?
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-3xl mb-6 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop"
                  alt="Minimalist Interior"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/40 to-orange-400/30 rounded-3xl"></div>
              </div>
              <span className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm">Design</span>
              <h3 className="text-xl font-medium mt-4 group-hover:text-gray-600 transition leading-snug">
                Exploring Minimalism with a Touch of Luxury
              </h3>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-light mb-4">Frequently<br />asked questions.</h2>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Answers to your questions,</p>
              <p className="text-gray-600">every step of the way.</p>
            </div>
          </div>

          <div className="mt-16 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  className="w-full py-6 flex justify-between items-center text-left hover:bg-gray-50 transition"
                  onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`transform transition ${expandedFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="pb-6 text-gray-600 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${footer_back})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 flex items-end justify-center ">
          <div className="flex space-x-8">
            <img 
              src={footer} 
              alt="House 1"
              className="w-22 h-60 flex align-end object-cover rounded-lg opacity-80"
            />
          </div>
        </div>
        
        <motion.div
          className="relative z-10 text-center text-white px-4 footers"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Your dream <br />
            home awaits.
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Whether you're exploring our homes or envisioning
            something custom, we're here to bring your dream to life.
          </motion.p>

        <button className="bg-white text-black px-8  py-2 rounded-2xl text-md">
      Get Plan
    </button>
        </motion.div>
        
        <footer className="absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-black/30 text-white py-8 z-20">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex space-x-8 decoration-none">
              <a href="#" className="hover:text-gray-300 transition decoration-none">Contact</a>
              <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition">Terms</a>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Oakland Greens. All rights reserved.
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default OaklandGreensWebsite;