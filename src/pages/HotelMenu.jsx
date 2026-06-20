import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCursor } from '../CursorContext';
import { ArrowLeft, ShoppingBag, Plus, Minus, MapPin, Clock, Phone, ChevronDown } from 'lucide-react';

const MENU_DATA = [
  { id: 1, category: 'Starters', name: 'Truffle Edamame', price: 12, desc: 'Steamed edamame tossed in white truffle oil and sea salt.', image: '/hotel/edamame.png' },
  { id: 2, category: 'Starters', name: 'Wagyu Beef Tataki', price: 28, desc: 'Seared wagyu slices, ponzu dressing, crispy garlic, microgreens.', image: '/hotel/beef.png' },
  { id: 3, category: 'Mains', name: 'Miso Black Cod', price: 45, desc: 'Broiled Alaskan black cod marinated in sweet saikyo miso.', image: '/hotel/cod.png' },
  { id: 4, category: 'Mains', name: 'Truffle Mushroom Risotto', price: 32, desc: 'Acquerello rice, wild mushrooms, fresh black truffle shavings.', image: '/hotel/risotto.png' },
  { id: 5, category: 'Mains', name: 'Lobster Ravioli', price: 42, desc: 'Lobster stuffed ravioli in a rich saffron cream sauce with micro cilantro.', image: '/hotel/lobster.png' },
  { id: 6, category: 'Mains', name: 'Pan-Seared Duck Breast', price: 38, desc: 'Served medium rare with cherry reduction and parsnip puree.', image: '/hotel/duck.png' },
  { id: 7, category: 'Mains', name: 'Premium Omakase Sushi', price: 65, desc: 'Chef’s selection of 9 premium nigiri specific to the season.', image: '/hotel/sushi.png' },
  { id: 8, category: 'Desserts', name: 'Matcha Lava Cake', price: 16, desc: 'Warm matcha green tea cake with a liquid white chocolate center.', image: '/hotel/matcha.png' },
  { id: 9, category: 'Desserts', name: 'Yuzu Cheesecake', price: 14, desc: 'Japanese citrus cheesecake, graham bottom, raspberry coulis.', image: '/hotel/yuzu.png' },
  { id: 10, category: 'Mains', name: 'Herb-Crusted Rack of Lamb', price: 48, desc: 'New Zealand lamb, red wine reduction, seasonal vegetables.', image: '/hotel/lamb.png' },
  { id: 11, category: 'Mains', name: 'Filet Mignon', price: 55, desc: 'Prime center-cut filet, truffle mash, grilled asparagus.', image: '/hotel/filet.png' },
  { id: 12, category: 'Mains', name: 'Pan-Seared Scallops', price: 36, desc: 'Diver scallops, caviar, cauliflower foam, edible gold.', image: '/hotel/scallops.png' },
  { id: 13, category: 'Mains', name: 'Truffle Squid Ink Pasta', price: 34, desc: 'Fresh black pasta, sea urchin emulsion, grated black truffle.', image: '/hotel/pasta.png' },
  { id: 14, category: 'Mains', name: 'Chilean Sea Bass', price: 46, desc: 'Pan-roasted sea bass over a delicate parsnip puree with blossoms.', image: '/hotel/seabass.png' },
  { id: 15, category: 'Desserts', name: 'Classic Tiramisu', price: 15, desc: 'Espresso-soaked ladyfingers mascarpone, cocoa dust.', image: '/hotel/tiramisu.jpg' },
  { id: 16, category: 'Desserts', name: 'Dark Chocolate Fondant', price: 18, desc: 'Molten center, fresh raspberries, vanilla bean gelato.', image: '/hotel/chocolate.jpg' },
  { id: 17, category: 'Desserts', name: 'Fruit Mille-Feuille', price: 16, desc: 'Crispy puff pastry, vanilla diplomat cream, fresh berries.', image: '/hotel/tart.jpg' },
  { id: 18, category: 'Beverages', name: 'Signature Margarita', price: 18, desc: 'Reposado tequila, fresh lime, agave, volcanic salt rim.', image: '/hotel/margarita.jpg' },
  { id: 19, category: 'Beverages', name: 'Mint Mojito', price: 16, desc: 'White rum, fresh mint, lime juice, club soda splash.', image: '/hotel/mojito.jpg' },
  { id: 20, category: 'Beverages', name: 'Classic Martini', price: 19, desc: 'Premium gin, dry vermouth, lemon twist or olives.', image: '/hotel/martini.jpg' },
  { id: 21, category: 'Beverages', name: 'Smoked Old Fashioned', price: 22, desc: 'Bourbon, bitters, smoked with cherry wood in front of you.', image: '/hotel/old_fashioned.jpg' },
  { id: 22, category: 'Beverages', name: 'Hibiscus Negroni', price: 18, desc: 'Gin, Campari, sweet vermouth, hibiscus tea infusion.', image: '/hotel/negroni.jpg' },
  { id: 23, category: 'Beverages', name: 'Aperol Spritz', price: 17, desc: 'Aperol, Prosecco, soda water, fresh orange slice.', image: '/hotel/spritz.jpg' },
  { id: 24, category: 'Beverages', name: 'Blackberry Smash', price: 16, desc: 'Whiskey, fresh muddled blackberries, lemon juice.', image: '/hotel/smash.jpg' },
  { id: 25, category: 'Beverages', name: 'Classic Daiquiri', price: 17, desc: 'Light rum, fresh lime juice, cane sugar syrup.', image: '/hotel/daiquiri.jpg' },
];

const CATEGORIES = ['All', 'Starters', 'Mains', 'Desserts', 'Beverages'];

const HotelMenu = () => {
  const { hoverEnter, hoverLeave } = useCursor();
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  
  const menuRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const filteredMenuFull = activeCategory === 'All' 
    ? MENU_DATA 
    : MENU_DATA.filter(item => item.category === activeCategory);
    
  // Show only up to visibleCount
  const filteredMenu = filteredMenuFull.slice(0, visibleCount);

  // When category changes, reset visible count to 6
  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  const updateCart = (id, delta) => {
    setCart(prev => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const item = MENU_DATA.find(i => i.id === Number(id));
    return total + (item.price * qty);
  }, 0);

  const cartItemsCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050505] text-primary min-h-screen font-sans selection:bg-accent selection:text-bg">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-40 px-8 py-6 flex justify-between items-center transition-all duration-300 bg-gradient-to-b from-black/80 to-transparent">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-none backdrop-blur-md px-4 py-2 rounded-full bg-white/5 border border-white/10"
          onMouseEnter={() => hoverEnter('hover')}
          onMouseLeave={hoverLeave}
        >
          <ArrowLeft size={18} /> Portfolio
        </Link>
        
        <button 
          className="relative p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-colors cursor-none text-white shadow-xl"
          onClick={() => setIsCartOpen(!isCartOpen)}
          onMouseEnter={() => hoverEnter('hover')}
          onMouseLeave={hoverLeave}
        >
          <ShoppingBag size={20} />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full scale-animation">
              {cartItemsCount}
            </span>
          )}
        </button>
      </nav>

      {/* Hero Landing Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="/hotel/hero.png" 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="relative z-10 text-center flex flex-col items-center px-4 w-full max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-serif tracking-tight text-white mb-6 uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Luxe
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 max-w-2xl font-light tracking-wide mb-12"
          >
            Gastronomy redefined. Experience culinary excellence crafted by world-class chefs at our signature hotel restaurant.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            onClick={scrollToMenu}
            className="text-white/70 hover:text-white flex flex-col items-center gap-4 transition-colors cursor-none group"
            onMouseEnter={() => hoverEnter('hover')}
            onMouseLeave={hoverLeave}
          >
            <span className="text-sm tracking-widest uppercase relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[1px] after:bg-white/50 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-center">Explore Menu</span>
            <ChevronDown size={24} className="animate-bounce mt-2 opacity-50" />
          </motion.button>
        </div>
      </section>

      {/* About The Hotel Section */}
      <section className="py-32 px-8 bg-[#0a0a0a] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
              <img 
                src="/hotel/about.png" 
                alt="Restaurant Interior"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 flex flex-col"
          >
            <h4 className="text-accent uppercase tracking-[0.3em] text-sm mb-4 font-semibold">The Philosophy</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              A sanctuary for the modern epicurean.
            </h2>
            <p className="text-secondary text-lg leading-relaxed mb-6">
              Located in the heart of the city, Luxe Cuisine offers a transcendent dining experience. We believe in sourcing only the finest seasonal ingredients, combining traditional Japanese techniques with modern European innovation.
            </p>
            <p className="text-secondary text-lg leading-relaxed mb-10">
              Each dish is a masterpiece, designed not just to satiate, but to evoke emotion and memory. Whether you are retreating to your luxury suite or dining in our grand hall, culinary perfection awaits.
            </p>
            
            <div className="flex gap-12 border-t border-white/10 pt-8">
              <div>
                <h5 className="text-white text-3xl font-serif mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>3</h5>
                <span className="text-secondary text-sm uppercase tracking-wider">Michelin Stars</span>
              </div>
              <div>
                <h5 className="text-white text-3xl font-serif mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>20+</h5>
                <span className="text-secondary text-sm uppercase tracking-wider">Years Excellence</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section ref={menuRef} className="py-32 px-8 bg-[#050505] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16">
            <h4 className="text-accent uppercase tracking-[0.3em] text-sm mb-4 font-semibold">Digital Dining</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Curated Selection
            </h2>
            <div className="w-full flex justify-center gap-4 overflow-x-auto pb-4 scrollbar-hide py-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-8 py-3 rounded-full text-sm tracking-wider uppercase transition-all whitespace-nowrap cursor-none ${
                    activeCategory === cat 
                      ? 'bg-white text-black font-bold' 
                      : 'bg-transparent text-secondary hover:text-white border border-white/20 hover:border-white/50'
                  }`}
                  onMouseEnter={() => hoverEnter('hover')}
                  onMouseLeave={hoverLeave}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredMenu.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#0a0a0a] rounded-xl overflow-hidden group flex flex-col border border-white/5 hover:border-white/15 transition-colors"
                >
                  <div className="w-full h-64 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      onError={(e) => {
                        e.target.src = "/hotel/risotto.png"; // Fallback image
                      }}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <span className="text-white font-semibold">${item.price}</span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6">
                      <h3 className="text-2xl font-serif text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
                      <p className="text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-6">
                      <span className="text-xs tracking-[0.2em] text-secondary uppercase">{item.category}</span>
                      
                      {cart[item.id] ? (
                        <div className="flex items-center gap-4 bg-white/10 rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateCart(item.id, -1)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-none text-white"
                            onMouseEnter={() => hoverEnter('hover')}
                            onMouseLeave={hoverLeave}
                          ><Minus size={16} /></button>
                          <span className="font-semibold text-white px-2">{cart[item.id]}</span>
                          <button 
                            onClick={() => updateCart(item.id, 1)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-none text-white"
                            onMouseEnter={() => hoverEnter('hover')}
                            onMouseLeave={hoverLeave}
                          ><Plus size={16} /></button>
                        </div>
                      ) : (
                        <button
                          onClick={() => updateCart(item.id, 1)}
                          className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-semibold cursor-none text-sm tracking-wide"
                          onMouseEnter={() => hoverEnter('hover')}
                          onMouseLeave={hoverLeave}
                        >
                          Add to Order
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visibleCount < filteredMenuFull.length ? (
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setVisibleCount(filteredMenuFull.length)}
              className="mt-16 px-10 py-4 bg-transparent border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-colors cursor-none uppercase tracking-widest text-sm font-bold"
              onMouseEnter={() => hoverEnter('hover')}
              onMouseLeave={hoverLeave}
            >
              Load More
            </motion.button>
          ) : filteredMenuFull.length > 6 ? (
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                setVisibleCount(6);
                menuRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-16 px-10 py-4 bg-transparent border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-colors cursor-none uppercase tracking-widest text-sm font-bold"
              onMouseEnter={() => hoverEnter('hover')}
              onMouseLeave={hoverLeave}
            >
              Show Less
            </motion.button>
          ) : null}
        </div>
      </section>

      {/* Contact & Location Section */}
      <section className="py-24 px-8 bg-[#0a0a0a] relative z-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-accent">
              <MapPin size={20} />
            </div>
            <h4 className="text-xl text-white font-serif mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Location</h4>
            <p className="text-secondary leading-relaxed">
              123 Luxury Avenue,<br />
              Metropolis District,<br />
              NY 10001
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-accent">
              <Clock size={20} />
            </div>
            <h4 className="text-xl text-white font-serif mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Opening Hours</h4>
            <p className="text-secondary leading-relaxed">
              Mon-Thu: 17:00 - 23:00<br />
              Fri-Sat: 17:00 - 00:00<br />
              Sun: 16:00 - 22:00
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-accent">
              <Phone size={20} />
            </div>
            <h4 className="text-xl text-white font-serif mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Reservations</h4>
            <p className="text-secondary leading-relaxed mb-4">
              +1 (212) 555-0199<br />
              dining@luxehotel.com
            </p>
            <button 
              className="text-white border-b border-white hover:text-accent hover:border-accent transition-colors pb-1 cursor-none uppercase tracking-wider text-sm font-semibold"
              onMouseEnter={() => hoverEnter('hover')}
              onMouseLeave={hoverLeave}
            >
              Book a Table
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 bg-[#050505] relative z-20 text-center border-t border-white/5">
        <p className="text-secondary/60 text-sm">© {new Date().getFullYear()} Luxe Hotel & Cuisine. All rights reserved.</p>
      </footer>

      {/* Slide-out Cart Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 cursor-none"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[450px] bg-[#0a0a0a] border-l border-white/10 z-50 p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-serif text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Room Service</h2>
                <div className="flex items-center gap-4">
                  {Object.keys(cart).length > 0 && (
                    <button 
                      onClick={() => setCart({})}
                      className="text-secondary hover:text-red-400 font-semibold transition-colors cursor-none text-sm uppercase tracking-wider bg-white/5 px-4 py-2 rounded-full border border-white/10"
                      onMouseEnter={() => hoverEnter('hover')}
                      onMouseLeave={hoverLeave}
                    >
                      Clear All
                    </button>
                  )}
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-secondary hover:text-white transition-colors cursor-none p-2 border border-white/10 rounded-full hover:bg-white/5"
                    onMouseEnter={() => hoverEnter('hover', 'Close')}
                    onMouseLeave={hoverLeave}
                  >
                    <Plus size={24} className="rotate-45" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-4 space-y-8 scrollbar-hide">
                {Object.entries(cart).length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-secondary opacity-50">
                    <ShoppingBag size={48} className="mb-4" />
                    <p>Your dining cart is empty.</p>
                  </div>
                ) : (
                  Object.entries(cart).map(([id, qty]) => {
                    const item = MENU_DATA.find(i => i.id === Number(id));
                    return (
                      <div key={id} className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col flex-1 justify-between py-1">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-white">{item.name}</span>
                            <span className="font-semibold text-white ml-4">${item.price * qty}</span>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-secondary text-sm">${item.price} each</span>
                            <div className="flex items-center gap-3 bg-white/5 rounded-full px-2 py-1 border border-white/10">
                              <button onClick={() => updateCart(item.id, -1)} className="p-1 hover:text-white text-secondary rounded-full cursor-none transition-colors"><Minus size={14} /></button>
                              <span className="font-semibold text-sm w-4 text-center text-white">{qty}</span>
                              <button onClick={() => updateCart(item.id, 1)} className="p-1 hover:text-white text-secondary rounded-full cursor-none transition-colors"><Plus size={14} /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {cartTotal > 0 && (
                <div className="mt-8 pt-8 border-t border-white/10 bg-[#0a0a0a]">
                  <div className="flex justify-between items-center mb-6 text-xl">
                    <span className="text-secondary">Subtotal</span>
                    <span className="font-bold text-white text-2xl">${cartTotal}</span>
                  </div>
                  <button 
                    className="w-full py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors cursor-none"
                    onMouseEnter={() => hoverEnter('hover')}
                    onMouseLeave={hoverLeave}
                  >
                    Place Order Room Service
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelMenu;
