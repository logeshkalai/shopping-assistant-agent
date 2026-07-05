// Main JavaScript logic for AI-Powered Shopping Assistant Agent

document.addEventListener('DOMContentLoaded', () => {
    function getProductImage(nameOrCategory, categoryFallback) {
        if (!nameOrCategory) return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=60';
        
        const cleanQuery = nameOrCategory.trim().toLowerCase();
        
        const productImages = {
            'acer nitro': 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&auto=format&fit=crop&q=60',
            'tuf gaming': 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&auto=format&fit=crop&q=60',
            'victus': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&auto=format&fit=crop&q=60',
            'ideapad': 'https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=400&auto=format&fit=crop&q=60',
            'macbook': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop&q=60',
            'inspiron': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&auto=format&fit=crop&q=60',
            'galaxy m35': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&auto=format&fit=crop&q=60',
            'note 14': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop&q=60',
            'narzo': 'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?w=400&auto=format&fit=crop&q=60',
            'nord ce4': 'https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=400&auto=format&fit=crop&q=60',
            'iphone 15': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=60',
            'wh-1000xm5': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=60',
            'quietcomfort': 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&auto=format&fit=crop&q=60',
            'rockerz': 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=400&auto=format&fit=crop&q=60',
            'tune 760nc': 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&auto=format&fit=crop&q=60',
            'ultragear': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=60',
            'p2422h': 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&auto=format&fit=crop&q=60',
            'keychron': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=60',
            'mx master': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=60',
            'cricket bat': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&auto=format&fit=crop&q=60',
            'basketball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&auto=format&fit=crop&q=60',
            'quinoa': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=60',
            'cocoa': 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&auto=format&fit=crop&q=60',
            'air fryer': 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=400&auto=format&fit=crop&q=60',
            'vacuum': 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&auto=format&fit=crop&q=60'
        };

        for (const key in productImages) {
            if (cleanQuery.includes(key)) {
                return productImages[key];
            }
        }

        const categoryQuery = (categoryFallback || nameOrCategory).trim().toLowerCase();
        const categoryImages = {
            'laptop': 'https://images.unsplash.com/photo-1496181130204-7552cc1454b4?w=400&auto=format&fit=crop&q=60',
            'laptops': 'https://images.unsplash.com/photo-1496181130204-7552cc1454b4?w=400&auto=format&fit=crop&q=60',
            'phone': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=60',
            'phones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=60',
            'headphone': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=60',
            'headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=60',
            'monitor': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=60',
            'monitors': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=60',
            'keyboard': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=60',
            'keyboards': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=60',
            'mouse': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=60',
            'mice': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=60',
            'sports': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&auto=format&fit=crop&q=60',
            'sports equipment': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&auto=format&fit=crop&q=60',
            'sport': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&auto=format&fit=crop&q=60',
            'food': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&auto=format&fit=crop&q=60',
            'food & groceries': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&auto=format&fit=crop&q=60',
            'groceries': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&auto=format&fit=crop&q=60',
            'appliance': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=60',
            'appliances': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=60',
            'home appliance': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=60',
            'home appliances': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=60'
        };

        return categoryImages[categoryQuery] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=60';
    }

    function getProductExtendedDetails(product) {
        const category = (product.category || '').toLowerCase();
        const name = (product.name || '').toLowerCase();
        
        let colors = ['Titanium Gray', 'Phantom Black', 'Ice Blue'];
        let specs = {
            'Display': '6.1-inch OLED Super Retina XDR, 120Hz',
            'Processor': 'Octa-Core flagship chip',
            'RAM & Storage': '8GB RAM / 128GB SSD',
            'Battery': '5000 mAh with SuperVOOC Fast Charge',
            'Warranty': '1 Year Manufacturer Brand Warranty'
        };
        let features = [
            'Premium tactile glass coating design',
            'Supports 5G connectivity out-of-the-box',
            'Smart power management battery optimizer'
        ];

        if (name.includes('iphone 15 pro')) {
            colors = ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'];
            specs = {
                'Display': '6.1-inch Super Retina XDR OLED, 120Hz ProMotion',
                'Processor': 'Apple A17 Pro (3nm flagship chip)',
                'Camera': '48MP Main + 12MP Ultra-Wide + 12MP Telephoto',
                'Build Quality': 'Grade 5 Titanium frame, Ceramic Shield front',
                'Port Interface': 'USB Type-C (USB 3.0 up to 10Gb/s)'
            };
            features = [
                'Dynamic Island interactive notification pill',
                'Action Button for custom macros and shortcuts',
                'Ray-Tracing enabled A17 graphics for gaming'
            ];
        } else if (name.includes('oneplus nord')) {
            colors = ['Mega Blue', 'Super Silver', 'Chrome Black'];
            specs = {
                'Display': '6.67-inch Fluid AMOLED, 120Hz refresh rate',
                'Processor': 'Snapdragon 695 5G octa-core',
                'RAM & Storage': '8GB LPDDR4X RAM / 128GB UFS 2.2 Storage',
                'Battery': '5500 mAh battery with 80W SUPERVOOC charging',
                'Audio Output': 'Stereo Speakers with 300% Ultra Volume Mode'
            };
            features = [
                'Full charge in less than 40 minutes',
                'Sony LYT-600 main camera sensor with OIS stabilization',
                'Aqua Touch display support for damp finger controls'
            ];
        } else if (name.includes('acer nitro')) {
            colors = ['Matte Obsidian Black'];
            specs = {
                'Display': '15.6-inch FHD IPS display, 144Hz refresh rate',
                'Processor': 'Intel Core i5-13420H (8 Cores, up to 4.60 GHz)',
                'RAM & Storage': '16GB DDR5 5200MHz RAM / 512GB PCIe Gen4 SSD',
                'Graphics': 'NVIDIA GeForce RTX 3050 Laptop GPU (4GB GDDR6)',
                'Thermal Design': 'Dual-Fan, Quad-Exhaust cooling exhaust system'
            };
            features = [
                'RGB backlit keyboard with NitroSense management hotkey',
                'DTS:X Ultra 3D audio positional precision output',
                'Ethernet E2600 + Wi-Fi 6 wireless speed limits'
            ];
        } else if (name.includes('asus tuf')) {
            colors = ['Graphite Black', 'Mecha Gray'];
            specs = {
                'Display': '15.6-inch FHD anti-glare display, 144Hz Adaptive-Sync',
                'Processor': 'AMD Ryzen 5 7535HS (6 Cores, up to 4.55 GHz)',
                'RAM & Storage': '8GB DDR5 4800MHz RAM / 512GB NVMe PCIe 4.0 SSD',
                'Graphics': 'NVIDIA GeForce RTX 2050 (4GB GDDR6)',
                'Durability': 'MIL-STD-810H military-grade standard validation'
            };
            features = [
                'Arc Flow fans offering 84 blades for maximum airflow',
                'Two-way AI noise-canceling voice transmission',
                'Easy upgrade path with secondary M.2 SSD slot'
            ];
        } else if (name.includes('hp victus')) {
            colors = ['Performance Blue', 'Mica Silver'];
            specs = {
                'Display': '15.6-inch FHD IPS micro-edge panel, 144Hz refresh',
                'Processor': 'Intel Core i5-12450H (8 Cores, up to 4.40 GHz)',
                'RAM & Storage': '8GB DDR4 RAM / 512GB PCIe NVMe M.2 SSD',
                'Graphics': 'NVIDIA GeForce GTX 1650 (4GB GDDR6)',
                'Keyboard': 'Full-size backlit keyboard with numeric keypad'
            };
            features = [
                'Omen Gaming Hub control panel optimizations',
                'Wide rear vents design for high-load heat reduction',
                'HP Fast Charge (50% charge in 45 minutes)'
            ];
        } else if (category === 'phone') {
            colors = ['Phantom Black', 'Mystic Bronze', 'Emerald Green'];
            specs = {
                'Display': '6.5-inch Super AMOLED display, 90Hz refresh rate',
                'Processor': 'Octa-Core mobile chipset',
                'RAM & Storage': '6GB RAM / 128GB Storage',
                'Battery': '5000 mAh battery with 25W Fast Charging support',
                'Camera System': '64MP Main camera + 8MP Ultra-wide lens'
            };
            features = [
                'On-screen optical fingerprint scanner security',
                'IP67 water and dust resistance certification',
                'Supports expandable microSD storage slot'
            ];
        } else if (category === 'laptop') {
            colors = ['Space Gray', 'Mineral Silver', 'Midnight Black'];
            specs = {
                'Display': '14-inch Full HD display, IPS panel',
                'Processor': 'AMD Ryzen or Intel Core Multi-Core Processor',
                'RAM & Storage': '16GB DDR4 RAM / 512GB Solid State Drive',
                'Operating System': 'Windows 11 Home pre-activated',
                'Weight': '1.4 kg ultra-portable thin chassis design'
            };
            features = [
                'Integrated biometric fingerprint login sensor',
                'TrueHarmony sound system dual stereo speakers',
                'USB Type-C power delivery support'
            ];
        } else if (category === 'headphone') {
            colors = ['Slate Black', 'Platinum Silver', 'Navy Blue'];
            specs = {
                'Connectivity': 'Bluetooth 5.2 / 3.5mm wired connector',
                'Drivers': '40mm Dynamic dome drivers',
                'Frequency Range': '4 Hz - 40,000 Hz Hi-Res audio output',
                'Battery Life': 'Up to 30 hours of playback time with ANC Active',
                'Noise Cancelling': 'Dual-Sensor Active Noise Cancelling processor'
            };
            features = [
                'Quick-attention Speak-to-Chat music auto-pausing',
                'Touchpad gesture control on right ear cup casing',
                'Multipoint wireless pairing to two devices simultaneously'
            ];
        } else if (category === 'monitor') {
            colors = ['Charcoal Black'];
            specs = {
                'Panel Tech': 'IPS Wide-Viewing Angle display panel',
                'Aspect Ratio': '16:9 widescreen format',
                'Refresh Rate': '144Hz - 165Hz gaming-grade performance',
                'Inputs': '2x HDMI, 1x DisplayPort, Headphone Out jack',
                'Response Time': '1ms Gray-to-Gray fast response rating'
            };
            features = [
                'AMD FreeSync Premium screen tearing preventer',
                'Fully adjustable ergonomic stand (Tilt, Pivot, Swivel)',
                'Anti-glare screen coating for minimized eye strain'
            ];
        } else if (category === 'keyboard') {
            colors = ['Carbon Gray', 'Snow White'];
            specs = {
                'Layout': 'Tenkeyless compact layout design',
                'Key Switches': 'Hot-Swappable Gateron mechanical switch nodes',
                'Backlighting': 'RGB backlit array with 18 distinct patterns',
                'Connection': 'Bluetooth 5.1 / USB Type-C wired link',
                'Battery': '4000 mAh rechargeable lithium cell'
            };
            features = [
                'Mac & Windows custom keycaps replacements included',
                'Connects with up to 3 devices simultaneously',
                'Dual-angle adjustable rubber feet configurations'
            ];
        } else if (category === 'mouse') {
            colors = ['RGB Matte Black', 'Matte White'];
            specs = {
                'DPI Sensor': 'Up to 16,000 adjustable DPI optical tracking',
                'Switches': 'Omron mechanical key switches (50M clicks life)',
                'Weight': 'Under 75 grams lightweight speed chassis',
                'Connection': '2.4GHz Wireless ultra-low latency response',
                'Battery': 'Up to 70 hours of continuous active tracking'
            };
            features = [
                'On-board profile storage memory modules',
                'Ultra-flexible paracord charging cables included',
                'Slick virgin-grade PTFE glide skates feet'
            ];
        }
        
        return { colors, specs, features };
    }

    // Shared State
    let currentUser = null;
    let comparisonList = []; // Holds product IDs to compare
    let allProducts = [];

    // Selectors
    const navUser = document.getElementById('nav-user');
    const navGuest = document.getElementById('nav-guest');
    const currentUserSpan = document.getElementById('current-user-name');
    const productsContainer = document.getElementById('products-grid');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-filter');
    const priceRangeInput = document.getElementById('price-range');
    const priceValueText = document.getElementById('price-val');
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    
    // Auth Forms (if on login/register pages)
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');

    // Chatbot (if on chatbot page)
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    // Init price filter text
    if (priceRangeInput && priceValueText) {
        priceRangeInput.addEventListener('input', (e) => {
            priceValueText.textContent = `₹${parseInt(e.target.value).toLocaleString()}`;
        });
        priceRangeInput.addEventListener('change', () => fetchProducts());
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', () => fetchProducts());
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            fetchProducts();
        });
    }

    // Helper to check current pathname matching
    function pathMatches(route) {
        const path = window.location.pathname.toLowerCase();
        return path === route || path === `${route}.html` || path === `/${route}` || path === `/${route}.html`;
    }

    // --- Authentication Actions ---
    async function checkAuth() {
        try {
            const res = await fetch('/api/auth/profile');
            const data = await res.json();
            if (data.success) {
                currentUser = data.user;
                updateNavbarUI();
                fetchWishlist();
                
                // Route guard for non-admins trying to access manage products page
                if (pathMatches('products') && !currentUser.is_admin) {
                    alert("Access denied. Administrator privileges required.");
                    window.location.href = '/';
                }
            } else {
                currentUser = null;
                updateNavbarUI();
                
                // Route guard for guest access to products, chatbot, profile or payment page
                if (pathMatches('products') || pathMatches('chatbot') || pathMatches('profile') || pathMatches('payment')) {
                    alert("Please log in to access this page.");
                    window.location.href = 'login.html';
                }
            }
        } catch (err) {
            console.error("Auth check failed:", err);
            currentUser = null;
            updateNavbarUI();
        }
    }

    function updateNavbarUI() {
        if (!navUser || !navGuest) return;
        const navManage = document.getElementById('nav-manage-products');
        const navProfile = document.getElementById('nav-profile-link');
        const mobileMenuAdmin = document.getElementById('mobile-menu-admin-link');
        
        if (currentUser) {
            navUser.classList.remove('d-none');
            navGuest.classList.add('d-none');
            if (currentUserSpan) currentUserSpan.textContent = currentUser.name;
            if (navManage && currentUser.is_admin) {
                navManage.classList.remove('d-none');
            } else if (navManage) {
                navManage.classList.add('d-none');
            }
            if (mobileMenuAdmin && currentUser.is_admin) {
                mobileMenuAdmin.classList.remove('d-none');
            } else if (mobileMenuAdmin) {
                mobileMenuAdmin.classList.add('d-none');
            }
            if (navProfile) navProfile.classList.remove('d-none');
        } else {
            navUser.classList.add('d-none');
            navGuest.classList.remove('d-none');
            if (navManage) {
                navManage.classList.add('d-none');
            }
            if (mobileMenuAdmin) {
                mobileMenuAdmin.classList.add('d-none');
            }
            if (navProfile) navProfile.classList.add('d-none');
        }
        updateGlobalCartBadge();
    }

    async function updateGlobalCartBadge() {
        const badge = document.getElementById('bottom-cart-badge');
        if (!badge) return;
        try {
            const res = await fetch('/api/wishlist');
            if (res.status === 401) {
                badge.textContent = '0';
                badge.classList.add('d-none');
                return;
            }
            const items = await res.json();
            badge.textContent = items.length;
            if (items.length > 0) {
                badge.classList.remove('d-none');
            } else {
                badge.classList.add('d-none');
            }
        } catch (err) {
            console.error("Cart badge update failed:", err);
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const errorDiv = document.getElementById('login-error');

            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (data.success) {
                    window.location.href = '/';
                } else {
                    errorDiv.textContent = data.message || "Invalid credentials.";
                    errorDiv.classList.remove('d-none');
                }
            } catch (err) {
                console.error(err);
                errorDiv.textContent = "An error occurred. Please try again.";
                errorDiv.classList.remove('d-none');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const roleSelect = document.getElementById('reg-role');
            const is_admin = roleSelect ? roleSelect.value === 'admin' : false;
            const errorDiv = document.getElementById('reg-error');

            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, is_admin })
                });
                const data = await res.json();
                if (data.success) {
                    window.location.href = '/';
                } else {
                    errorDiv.textContent = data.message || "Registration failed.";
                    errorDiv.classList.remove('d-none');
                }
            } catch (err) {
                console.error(err);
                errorDiv.textContent = "An error occurred. Please try again.";
                errorDiv.classList.remove('d-none');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await fetch('/api/auth/logout', { method: 'POST' });
                window.location.href = '/login';
            } catch (err) {
                console.error(err);
            }
        });
    }

    const mobileLogoutBtn = document.getElementById('mobile-menu-logout-btn');
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await fetch('/api/auth/logout', { method: 'POST' });
                window.location.href = '/login';
            } catch (err) {
                console.error(err);
            }
        });
    }

    // --- Product Actions ---
    async function fetchProducts() {
        if (!productsContainer) return;
        
        let url = '/api/products';
        const params = [];
        
        if (searchInput && searchInput.value) {
            params.push(`query=${encodeURIComponent(searchInput.value)}`);
        }
        if (categorySelect && categorySelect.value) {
            params.push(`category=${encodeURIComponent(categorySelect.value)}`);
        }
        if (priceRangeInput && priceRangeInput.value > 0) {
            params.push(`max_price=${priceRangeInput.value}`);
        }
        
        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        try {
            productsContainer.innerHTML = '<div class="text-center w-100 py-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-2 text-muted">Searching products...</p></div>';
            const res = await fetch(url);
            allProducts = await res.json();
            renderProducts(allProducts);
        } catch (err) {
            console.error("Fetch products failed:", err);
            productsContainer.innerHTML = '<div class="text-center w-100 text-danger py-5"><p>Failed to load products. Please refresh.</p></div>';
        }
    }

    function renderProducts(products) {
        if (!productsContainer) return;
        if (products.length === 0) {
            productsContainer.innerHTML = '<div class="text-center w-100 py-5 text-muted"><p>No products match your search criteria.</p></div>';
            return;
        }

        productsContainer.innerHTML = '';
        products.forEach(p => {
            const isCompared = comparisonList.includes(p.product_id);
            const stars = getStarRatingHTML(p.rating);
            
            // Extract colors and configurations (specs)
            const details = getProductExtendedDetails(p);
            let specsText = '';
            if (details.specs) {
                const specKeys = ['Processor', 'RAM & Storage', 'Display', 'Connectivity', 'Drivers'];
                const specsArray = [];
                specKeys.forEach(k => {
                    if (details.specs[k]) {
                        specsArray.push(details.specs[k]);
                    }
                });
                if (specsArray.length > 0) {
                    specsText = specsArray.slice(0, 2).join(' | ');
                } else {
                    const keys = Object.keys(details.specs);
                    if (keys.length > 0) {
                        specsArray.push(details.specs[keys[0]]);
                        if (keys[1]) specsArray.push(details.specs[keys[1]]);
                        specsText = specsArray.join(' | ');
                    }
                }
            }

            let colorsHTML = '';
            if (details.colors && details.colors.length > 0) {
                colorsHTML = details.colors.map(col => `
                    <span class="badge me-1 mb-1 text-xs" style="font-size: 10px; background: rgba(255, 255, 255, 0.08); border: 1px solid var(--border-color); color: var(--text-secondary);">
                        ${col}
                    </span>
                `).join('');
            }

            // Pricing offer / discount text
            let offerText = '';
            if (p.price > 50000) {
                offerText = 'Save ₹5,000 (WELCOME10 Applied)';
            } else if (p.price > 10000) {
                offerText = 'Save ₹1,500 (WELCOME10 Applied)';
            } else {
                offerText = 'Save 10% (WELCOME10 Applied)';
            }

            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 mb-4';
            card.innerHTML = `
                <div class="card h-100 glass-card overflow-hidden">
                    <img src="${getProductImage(p.name, p.category)}" class="card-img-top product-card-img" alt="${p.name}" style="height: 180px; object-fit: cover; filter: brightness(0.95); border-bottom: 1px solid var(--border-color); transition: transform 0.3s ease;">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="badge-brand">${p.brand}</span>
                            <span class="badge-category">${p.category}</span>
                        </div>
                        <h5 class="card-title text-white mb-1 product-title-click" style="cursor: pointer; transition: color 0.2s;" data-id="${p.product_id}" onmouseover="this.style.color='var(--accent-cyan)'" onmouseout="this.style.color='white'">${p.name}</h5>
                        <div class="mb-2">${stars} <small class="text-muted">(${p.rating})</small></div>
                        
                        <!-- Configures (Specs) -->
                        ${specsText ? `<div class="text-xs text-info mb-2 text-truncate" style="font-size: 11px;"><i class="bi bi-cpu-fill me-1"></i>${specsText}</div>` : ''}

                        <!-- Colors Available -->
                        ${colorsHTML ? `<div class="mb-2 d-flex flex-wrap">${colorsHTML}</div>` : ''}

                        <p class="card-text text-secondary text-sm flex-grow-1">${p.description || "No description available."}</p>
                        
                        <!-- Offer badge & Price -->
                        <div class="d-flex flex-column mb-3 mt-2">
                            <h4 class="text-info font-weight-bold mb-0">₹${p.price.toLocaleString('en-IN')}</h4>
                            <small class="text-success text-xs fw-bold mt-1" style="font-size: 10px;"><i class="bi bi-tag-fill me-1"></i>${offerText}</small>
                        </div>

                        <div class="d-flex gap-2">
                            <button class="btn btn-glow-primary btn-sm flex-grow-1 buy-now-btn" data-id="${p.product_id}">
                                <i class="bi bi-cart-fill me-1"></i> Buy Now
                            </button>
                            <button class="btn btn-glow-outline btn-sm add-wishlist-btn" data-id="${p.product_id}">
                                <i class="bi bi-heart-fill"></i>
                            </button>
                            <button class="btn ${isCompared ? 'btn-info' : 'btn-glow-outline'} btn-sm compare-btn" data-id="${p.product_id}">
                                <i class="bi bi-shuffle"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.appendChild(card);
        });

        // Add event listeners to newly generated buttons
        document.querySelectorAll('.add-wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                toggleWishlist(id);
            });
        });

        document.querySelectorAll('.compare-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                toggleCompare(id, e.currentTarget);
            });
        });

        document.querySelectorAll('.buy-now-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                window.open(`payment.html?product_id=${id}`, '_blank');
            });
        });

        document.querySelectorAll('.product-title-click').forEach(title => {
            title.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                window.location.href = `product-details.html?id=${id}`;
            });
        });
    }

    function getStarRatingHTML(rating) {
        let starsHTML = '';
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="bi bi-star-fill star-filled"></i>';
        }
        if (halfStar) {
            starsHTML += '<i class="bi bi-star-half star-filled"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="bi bi-star star-empty"></i>';
        }
        return starsHTML;
    }

    // --- Wishlist Actions ---
    async function fetchWishlist() {
        updateGlobalCartBadge();
        if (!wishlistItemsContainer) return;
        try {
            const res = await fetch('/api/wishlist');
            if (res.status === 401) {
                wishlistItemsContainer.innerHTML = '<p class="text-muted text-center py-3">Login to view wishlist.</p>';
                return;
            }
            const items = await res.json();
            renderWishlist(items);
        } catch (err) {
            console.error("Wishlist fetch failed:", err);
        }
    }

    function renderWishlist(items) {
        if (!wishlistItemsContainer) return;
        if (items.length === 0) {
            wishlistItemsContainer.innerHTML = '<p class="text-muted text-center py-3">Your wishlist is empty.</p>';
            return;
        }

        wishlistItemsContainer.innerHTML = '';
        items.forEach(item => {
            const p = item.product;
            if (!p) return;
            const div = document.createElement('div');
            div.className = 'wishlist-item d-flex justify-content-between align-items-center';
            div.innerHTML = `
                <div class="d-flex align-items-center gap-2">
                    <img src="${getProductImage(p.name, p.category)}" class="rounded" style="width: 40px; height: 40px; object-fit: cover; border: 1px solid var(--border-color);">
                    <div>
                        <h6 class="text-white mb-0 text-truncate font-weight-semibold" style="max-width: 120px; font-size: 13px;">${p.name}</h6>
                        <small class="text-info">₹${p.price.toLocaleString('en-IN')}</small>
                    </div>
                </div>
                <div class="d-flex align-items-center gap-1">
                    <button class="btn btn-sm btn-glow-primary buy-now-btn py-1 px-2.5 me-1" data-id="${p.product_id}" style="font-size: 11px;">
                        <i class="bi bi-cart-fill me-1"></i>Buy
                    </button>
                    <button class="btn btn-sm btn-link text-danger remove-wishlist-btn p-0" data-id="${p.product_id}">
                        <i class="bi bi-trash-fill fs-6"></i>
                    </button>
                </div>
            `;
            wishlistItemsContainer.appendChild(div);
        });

        document.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                toggleWishlist(id, true); // Force removal
            });
        });

        document.querySelectorAll('#wishlist-items .buy-now-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                window.location.href = `payment.html?product_id=${id}`;
            });
        });
    }

    async function toggleWishlist(productId, forceRemove = false) {
        if (!currentUser) {
            alert("Please log in first to manage your wishlist.");
            window.location.href = '/login';
            return;
        }

        try {
            if (forceRemove) {
                const res = await fetch(`/api/wishlist/${productId}`, { method: 'DELETE' });
                const data = await res.json();
                if (data.success) {
                    fetchWishlist();
                }
            } else {
                // Try adding it
                const res = await fetch('/api/wishlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product_id: productId })
                });
                const data = await res.json();
                if (data.success) {
                    alert(data.message);
                    fetchWishlist();
                } else {
                    alert(data.message);
                }
            }
        } catch (err) {
            console.error("Wishlist operation failed:", err);
        }
    }

    // --- Product Comparison Actions ---
    function toggleCompare(productId, buttonElem) {
        const index = comparisonList.indexOf(productId);
        if (index > -1) {
            comparisonList.splice(index, 1);
            if (buttonElem) {
                buttonElem.classList.remove('btn-info');
                buttonElem.classList.add('btn-glow-outline');
                buttonElem.innerHTML = '<i class="bi bi-shuffle me-1"></i> Compare';
            }
        } else {
            if (comparisonList.length >= 3) {
                alert("You can compare up to 3 products at a time.");
                return;
            }
            comparisonList.push(productId);
            if (buttonElem) {
                buttonElem.classList.remove('btn-glow-outline');
                buttonElem.classList.add('btn-info');
                buttonElem.innerHTML = '<i class="bi bi-shuffle me-1"></i> Comparing';
            }
        }
        updateComparisonUI();
    }

    async function updateComparisonUI() {
        const compSection = document.getElementById('comparison-section');
        const compBody = document.getElementById('comparison-body');
        
        if (!compSection || !compBody) return;

        if (comparisonList.length === 0) {
            compSection.classList.add('d-none');
            return;
        }

        compSection.classList.remove('d-none');
        
        try {
            const res = await fetch('/api/products/compare', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product_ids: comparisonList })
            });
            const data = await res.json();
            renderComparisonTable(data, compBody);
        } catch (err) {
            console.error("Comparison load failed:", err);
        }
    }

    function renderComparisonTable(products, container) {
        if (products.length === 0) {
            container.innerHTML = '';
            return;
        }

        let headersHTML = '<th>Metric</th>';
        products.forEach(p => {
            headersHTML += `
                <th class="text-center">
                    <span class="d-block text-white font-weight-bold">${p.name}</span>
                    <small class="text-muted">${p.brand}</small>
                    <button class="btn btn-sm btn-link text-danger d-block mx-auto mt-1 remove-comp-btn" data-id="${p.product_id}">Remove</button>
                </th>
            `;
        });

        const rows = [
            { label: 'Price', key: 'price', format: (val) => `₹${val.toLocaleString('en-IN')}`, highlight: 'lowest' },
            { label: 'Rating', key: 'rating', format: (val) => `${val} ★`, highlight: 'highest' },
            { label: 'Category', key: 'category', format: (val) => val.toUpperCase() },
            { label: 'Description', key: 'description', format: (val) => val || 'N/A' },
            { label: 'Stock Status', key: 'stock', format: (val) => val > 0 ? `${val} available` : 'Out of stock' }
        ];

        let bodyHTML = '';
        rows.forEach(row => {
            let rowHTML = `<tr><td class="font-weight-bold text-secondary">${row.label}</td>`;
            
            let highlightIdx = -1;
            if (row.highlight === 'lowest') {
                let minVal = Infinity;
                products.forEach((p, idx) => {
                    if (p[row.key] < minVal) {
                        minVal = p[row.key];
                        highlightIdx = idx;
                    }
                });
            } else if (row.highlight === 'highest') {
                let maxVal = -1;
                products.forEach((p, idx) => {
                    if (p[row.key] > maxVal) {
                        maxVal = p[row.key];
                        highlightIdx = idx;
                    }
                });
            }

            products.forEach((p, idx) => {
                const isHighlight = idx === highlightIdx && products.length > 1;
                const formattedVal = row.format ? row.format(p[row.key]) : p[row.key];
                rowHTML += `
                    <td class="text-center ${isHighlight ? 'comparison-highlight text-info' : ''}">
                        ${formattedVal}
                    </td>
                `;
            });
            rowHTML += '</tr>';
            bodyHTML += rowHTML;
        });

        container.innerHTML = `
            <table class="table table-comparison text-white">
                <thead>
                    <tr>${headersHTML}</tr>
                </thead>
                <tbody>
                    ${bodyHTML}
                </tbody>
            </table>
        `;

        document.querySelectorAll('.remove-comp-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                const productBtn = document.querySelector(`.compare-btn[data-id="${id}"]`);
                toggleCompare(id, productBtn);
            });
        });
    }

    // --- Chatbot Actions ---
    function appendChatMessage(sender, text, products = []) {
        if (!chatMessages) return;

        const isUser = sender === 'user';
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-assistant'}`;
        
        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
            
        bubble.innerHTML = formattedText;
        chatMessages.appendChild(bubble);

        if (!isUser && products && products.length > 0) {
            const prodRow = document.createElement('div');
            prodRow.className = 'd-flex flex-wrap gap-2 mt-2';
            products.forEach(p => {
                const link = document.createElement('span');
                link.className = 'badge bg-purple pointer text-xs py-1 px-2 border-purple-thin';
                link.style.cursor = 'pointer';
                link.innerHTML = `<i class="bi bi-eye"></i> ${p.name} (₹${p.price.toLocaleString('en-IN')})`;
                link.addEventListener('click', () => {
                    if (productsContainer) {
                        if (searchInput) searchInput.value = p.name;
                        fetchProducts();
                    } else {
                        window.location.href = `/?query=${encodeURIComponent(p.name)}`;
                    }
                });
                prodRow.appendChild(link);
            });
            chatMessages.appendChild(prodRow);
        }

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        if (!chatMessages) return null;
        const indicator = document.createElement('div');
        indicator.className = 'chat-bubble chat-bubble-assistant typing-indicator-bubble';
        indicator.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    if (chatForm) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (!message) return;

            chatInput.value = '';
            appendChatMessage('user', message);
            const indicator = showTypingIndicator();

            try {
                const res = await fetch('/api/chatbot', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message })
                });
                const data = await res.json();
                
                if (indicator) indicator.remove();
                appendChatMessage('assistant', data.response, data.products);

                if (data.action === 'compare' && data.products) {
                    comparisonList = data.products.map(p => p.product_id);
                    updateComparisonUI();
                }
            } catch (err) {
                console.error("Chat error:", err);
                if (indicator) indicator.remove();
                appendChatMessage('assistant', "I apologize, but I ran into a technical difficulty connecting to the server. Please try again.");
            }
        });

        document.querySelectorAll('.suggestion-pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
                if (chatInput) {
                    chatInput.value = e.currentTarget.textContent;
                    chatForm.dispatchEvent(new Event('submit'));
                }
            });
        });
    }

    // --- Checkout & Payment Actions ---
    let checkoutModalInstance = null;

    function openCheckoutModal(productId) {
        if (!currentUser) {
            alert("Please log in to purchase products.");
            window.location.href = 'login.html';
            return;
        }

        const p = allProducts.find(item => item.product_id === productId);
        if (!p) return;

        const modalBody = document.getElementById('checkout-modal-body');
        modalBody.innerHTML = `
            <div class="mb-4">
                <h6 class="text-secondary mb-1">Product Details</h6>
                <h5 id="checkout-prod-name" class="text-white">${p.name}</h5>
                <p id="checkout-prod-desc" class="text-secondary text-sm">${p.description || ''}</p>
                <h3 class="text-info fw-bold mb-0" id="checkout-prod-price">₹${p.price.toLocaleString('en-IN')}</h3>
            </div>
            
            <form id="checkout-form">
                <input type="hidden" id="checkout-prod-id" value="${p.product_id}">
                
                <div class="mb-4">
                    <label class="form-label text-secondary mb-2">Select Payment Method</label>
                    <div class="d-flex flex-column gap-2">
                        <label class="d-flex align-items-center p-2 rounded border border-purple-thin bg-dark-alpha cursor-pointer" style="background: rgba(15, 12, 27, 0.4); cursor: pointer;">
                            <input type="radio" name="payment_method" value="UPI" checked class="me-2">
                            <span>UPI / GooglePay / PhonePe</span>
                        </label>
                        <label class="d-flex align-items-center p-2 rounded border border-purple-thin bg-dark-alpha cursor-pointer" style="background: rgba(15, 12, 27, 0.4); cursor: pointer;">
                            <input type="radio" name="payment_method" value="Credit/Debit Card" class="me-2">
                            <span>Credit / Debit Card</span>
                        </label>
                        <label class="d-flex align-items-center p-2 rounded border border-purple-thin bg-dark-alpha cursor-pointer" style="background: rgba(15, 12, 27, 0.4); cursor: pointer;">
                            <input type="radio" name="payment_method" value="Net Banking" class="me-2">
                            <span>Net Banking</span>
                        </label>
                        <label class="d-flex align-items-center p-2 rounded border border-purple-thin bg-dark-alpha cursor-pointer" style="background: rgba(15, 12, 27, 0.4); cursor: pointer;">
                            <input type="radio" name="payment_method" value="COD" class="me-2">
                            <span>Cash on Delivery (COD)</span>
                        </label>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-glow-primary w-100 py-2" id="checkout-submit-btn">
                    <i class="bi bi-shield-lock-fill me-2"></i>Complete Secure Payment
                </button>
            </form>
        `;

        const checkoutForm = document.getElementById('checkout-form');
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const prodId = parseInt(document.getElementById('checkout-prod-id').value);
            const method = document.querySelector('input[name="payment_method"]:checked').value;
            const submitBtn = document.getElementById('checkout-submit-btn');

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Processing Payment...';

            try {
                const res = await fetch('/api/payment/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product_id: prodId, payment_method: method })
                });
                const data = await res.json();
                
                if (data.success) {
                    const order = data.order;
                    modalBody.innerHTML = `
                        <div class="text-center mb-4">
                            <div class="d-inline-flex justify-content-center align-items-center rounded-circle mb-3" style="background: rgba(34, 197, 94, 0.15); width: 80px; height: 80px;">
                                <i class="bi bi-check-circle-fill text-success fs-1"></i>
                            </div>
                            <h4 class="text-white fw-bold">Payment Successful!</h4>
                            <p class="text-secondary text-sm">Thank you for your purchase. Your transaction details are listed below.</p>
                        </div>
                        
                        <div class="card bg-dark-alpha border-purple-thin p-3 mb-4" style="background: rgba(15, 12, 27, 0.5);">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-secondary">Product:</span>
                                <span class="text-white fw-bold text-truncate" style="max-width: 200px;">${order.product_name}</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-secondary">Amount Paid:</span>
                                <span class="text-info fw-bold">₹${order.amount.toLocaleString('en-IN')}</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-secondary">Payment Method:</span>
                                <span class="text-white">${order.payment_method}</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-secondary">Transaction ID:</span>
                                <span class="text-info font-monospace text-xs">${order.transaction_id}</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="text-secondary">Date & Time:</span>
                                <span class="text-white">${order.created_at}</span>
                            </div>
                        </div>

                        <button class="btn btn-glow-primary w-100" data-bs-dismiss="modal">
                            Close & Continue
                        </button>
                    `;
                    fetchProducts();
                } else {
                    alert(data.message || "Payment failed.");
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="bi bi-shield-lock-fill me-2"></i>Complete Secure Payment';
                }
            } catch (err) {
                console.error(err);
                alert("An error occurred during payment processing. Please try again.");
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="bi bi-shield-lock-fill me-2"></i>Complete Secure Payment';
            }
        });

        if (!checkoutModalInstance) {
            checkoutModalInstance = new bootstrap.Modal(document.getElementById('checkoutModal'));
        }
        checkoutModalInstance.show();
    }

    let detailsModalInstance = null;

    async function openDetailsModal(productId) {
        try {
            const res = await fetch(`/api/products/${productId}`);
            const p = await res.json();
            if (!p || p.success === false) {
                alert("Failed to load product details.");
                return;
            }

            const stars = getStarRatingHTML(p.rating);
            const modalBody = document.getElementById('details-modal-body');

            const extra = getProductExtendedDetails(p);
            
            const colorsHTML = extra.colors.map(col => `
                <span class="badge bg-secondary-glow text-white me-1 mb-1 border-purple-thin text-xs py-1.5 px-2.5">
                    <i class="bi bi-palette-fill text-info me-1"></i>${col}
                </span>
            `).join('');

            const featuresHTML = extra.features.map(feat => `
                <li class="text-secondary text-sm mb-1.5 d-flex align-items-start">
                    <i class="bi bi-patch-check-fill text-cyan-glow me-2 mt-0.5"></i>
                    <span>${feat}</span>
                </li>
            `).join('');

            let specsRowsHTML = '';
            for (const [key, val] of Object.entries(extra.specs)) {
                specsRowsHTML += `
                    <tr>
                        <td class="text-secondary ps-0 py-2 text-capitalize">${key}:</td>
                        <td class="text-white text-end fw-semibold py-2">${val}</td>
                    </tr>
                `;
            }

            modalBody.innerHTML = `
                <div class="mb-3 text-center">
                    <img src="${getProductImage(p.name, p.category)}" class="img-fluid rounded mb-3" style="max-height: 190px; width: 100%; object-fit: cover; border: 1px solid var(--border-color);">
                    <div class="d-flex justify-content-between mb-2 justify-content-center gap-2">
                        <span class="badge-brand d-inline-block">${p.brand}</span>
                        <span class="badge-category d-inline-block">${p.category}</span>
                    </div>
                    <h3 class="text-white fw-bold mt-1 mb-2">${p.name}</h3>
                    <div class="mb-3">${stars} <span class="text-muted">(${p.rating} ★)</span></div>
                </div>

                <div class="mb-4">
                    <small class="text-secondary d-block mb-1.5 fw-bold uppercase-track" style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">Available Colors</small>
                    <div class="d-flex flex-wrap">${colorsHTML}</div>
                </div>

                <div class="card border-purple-thin p-3 mb-4" style="background: rgba(15, 12, 27, 0.4); border: 1px solid var(--border-color);">
                     <h6 class="text-secondary mb-2"><i class="bi bi-file-text me-1 text-info"></i>Product Summary</h6>
                     <p class="text-secondary text-sm mb-0" style="line-height: 1.6;">${p.description || 'No detailed specifications listed.'}</p>
                </div>

                <div class="mb-4">
                    <small class="text-secondary d-block mb-2 fw-bold uppercase-track" style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">Highlight Features</small>
                    <ul class="list-unstyled mb-0">${featuresHTML}</ul>
                </div>

                <div class="table-responsive mb-4">
                     <small class="text-secondary d-block mb-2 fw-bold uppercase-track" style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">Technical Specifications</small>
                     <table class="table table-dark table-borderless align-middle mb-0">
                         <tbody>
                             ${specsRowsHTML}
                             <tr>
                                 <td class="text-secondary ps-0 py-2">Stock Availability:</td>
                                 <td class="text-end py-2">
                                     <span class="badge ${p.stock > 0 ? 'bg-success-glow text-success' : 'bg-danger-glow text-danger'}">
                                         ${p.stock > 0 ? `${p.stock} units in stock` : 'Out of Stock'}
                                     </span>
                                 </td>
                             </tr>
                             <tr class="border-top border-purple-thin" style="border-top: 1px solid var(--border-color) !important;">
                                 <td class="text-secondary ps-0 pt-3 pb-0 fs-5">Retail Price:</td>
                                 <td class="text-info text-end fw-bold pt-3 pb-0 fs-4">₹${p.price.toLocaleString('en-IN')}</td>
                             </tr>
                         </tbody>
                     </table>
                </div>

                <div class="d-flex gap-2">
                     <button class="btn btn-glow-primary flex-grow-1 py-2 details-buy-btn" data-id="${p.product_id}" ${p.stock <= 0 ? 'disabled' : ''}>
                         <i class="bi bi-cart-fill me-2"></i>Buy Now
                     </button>
                     <button class="btn btn-glow-outline px-4 py-2" data-bs-dismiss="modal">
                         Close
                     </button>
                </div>
            `;

            const buyBtn = modalBody.querySelector('.details-buy-btn');
            buyBtn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                if (detailsModalInstance) detailsModalInstance.hide();
                setTimeout(() => {
                    window.location.href = `payment.html?product_id=${id}`;
                }, 400);
            });

            if (!detailsModalInstance) {
                detailsModalInstance = new bootstrap.Modal(document.getElementById('detailsModal'));
            }
            detailsModalInstance.show();

        } catch (err) {
            console.error("Failed to load details:", err);
alert("An error occurred loading the product specifications.");
        }
     }

     // --- Profile Page Initialization ---
     if (pathMatches('profile')) {
         const loadProfile = async () => {
             try {
                 const res = await fetch('/api/auth/profile');
                 const data = await res.json();
                 if (data.success) {
                     document.getElementById('profile-name').value = data.user.name;
                     document.getElementById('profile-email').value = data.user.email;
                     document.getElementById('profile-phone').value = data.user.phone || '';
                     document.getElementById('profile-address').value = data.user.address || '';
                     
                     const sidebarName = document.getElementById('sidebar-user-name');
                     if (sidebarName) sidebarName.textContent = data.user.name;
                     
                     const sidebarBadge = document.getElementById('sidebar-user-badge');
                     if (sidebarBadge) {
                         sidebarBadge.textContent = data.user.is_admin ? "Administrator" : "Plus Member";
                     }
                     
                     const roleBadge = document.getElementById('profile-role-badge');
                     if (roleBadge) {
                         roleBadge.textContent = data.user.is_admin ? "Administrator" : "Standard Customer";
                         roleBadge.className = data.user.is_admin ? "badge bg-danger text-white mt-1" : "badge bg-info text-dark mt-1";
                     }
                     
                     const memberSince = document.getElementById('profile-member-since');
                     if (memberSince) {
                         memberSince.textContent = data.user.created_at || 'Recently';
                     }

                     const phoneStatusBadge = document.getElementById('profile-phone-status');
                     if (phoneStatusBadge) {
                         if (data.user.phone_verified) {
                             phoneStatusBadge.className = "badge bg-success-glow text-success text-xs fw-normal py-1 px-2";
                             phoneStatusBadge.innerHTML = '<i class="bi bi-patch-check-fill me-1"></i>Verified';
                             phoneStatusBadge.removeAttribute('data-bs-toggle');
                             phoneStatusBadge.removeAttribute('data-bs-target');
                             phoneStatusBadge.style.cursor = 'default';
                         } else {
                             phoneStatusBadge.className = "badge bg-warning-glow text-warning text-xs fw-normal py-1 px-2";
                             phoneStatusBadge.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-1"></i>Verify Now';
                             phoneStatusBadge.setAttribute('data-bs-toggle', 'modal');
                             phoneStatusBadge.setAttribute('data-bs-target', '#verifyPhoneModal');
                             phoneStatusBadge.style.cursor = 'pointer';
                         }
                     }
                 }
             } catch (err) {
                 console.error("Failed to load profile:", err);
             }
         };

         const loadOrders = async () => {
             const ordersContainer = document.getElementById('profile-orders-container');
             if (!ordersContainer) return;
             try {
                 const res = await fetch('/api/payment/orders');
                 if (res.status === 401) {
                     ordersContainer.innerHTML = '<p class="text-danger text-center py-3">Log in to view order history.</p>';
                     return;
                 }
                 const orders = await res.json();
                 if (orders.length === 0) {
                     ordersContainer.innerHTML = '<p class="text-secondary text-center py-4">No purchases recorded yet.</p>';
                     return;
                 }
                 
                 let tableHTML = `
                     <table class="table table-dark table-striped align-middle mb-0 text-sm">
                         <thead>
                             <tr>
                                 <th>Product</th>
                                 <th class="text-end">Paid</th>
                                 <th>Method</th>
                                 <th>Transaction ID</th>
                                 <th>Date</th>
                             </tr>
                         </thead>
                         <tbody>
                 `;
                 orders.forEach(order => {
                     tableHTML += `
                         <tr>
                             <td class="text-white fw-semibold">${order.product_name}</td>
                             <td class="text-info text-end fw-bold">₹${order.amount.toLocaleString('en-IN')}</td>
                             <td><span class="badge bg-secondary-glow text-white text-xs">${order.payment_method}</span></td>
                             <td><code class="text-cyan-glow">${order.transaction_id}</code></td>
                             <td class="text-secondary" style="font-size: 11px;">${order.created_at}</td>
                         </tr>
                     `;
                 });
                 tableHTML += '</tbody></table>';
                 ordersContainer.innerHTML = tableHTML;
             } catch (err) {
                 console.error("Orders fetch failed:", err);
                 ordersContainer.innerHTML = '<p class="text-danger text-center py-3">Error fetching purchase history.</p>';
             }
         };
         const loadPrivacy = async () => {
              try {
                  const res = await fetch('/api/auth/profile/privacy');
                  const data = await res.json();
                  if (data.success) {
                      document.getElementById('security-2fa').checked = data.privacy.two_factor_enabled;
                      document.getElementById('privacy-personalization').checked = data.privacy.marketing_consent;
                      document.getElementById('privacy-sharing').checked = data.privacy.analytics_consent;
                  }
              } catch (err) {
                  console.error("Failed to load privacy settings:", err);
              }
          };

          const loadAddresses = async () => {
              const addressesContainer = document.getElementById('addresses-container');
              if (!addressesContainer) return;
              try {
                  const res = await fetch('/api/auth/profile/addresses');
                  const data = await res.json();
                  if (data.success) {
                      addressesContainer.innerHTML = '';
                      if (data.addresses.length === 0) {
                          addressesContainer.innerHTML = '<p class="text-secondary text-sm mb-0">No shipping addresses added yet.</p>';
                          return;
                      }
                      data.addresses.forEach(addr => {
                          const div = document.createElement('div');
                          div.className = 'p-3 rounded mb-3 position-relative border-purple-thin';
                          div.style.background = 'rgba(15, 12, 27, 0.4)';
                          div.innerHTML = `
                              <button class="btn btn-sm btn-link text-danger position-absolute top-0 end-0 m-2 delete-addr-btn" data-id="${addr.id}">
                                  <i class="bi bi-trash-fill"></i>
                              </button>
                              <span class="badge bg-purple-glow text-white text-xs mb-2">${addr.label}</span>
                              <h6 class="text-white mb-1 fw-bold">${addr.recipient_name}</h6>
                              <p class="text-secondary text-xs mb-1"><i class="bi bi-telephone-fill me-1"></i>${addr.phone}</p>
                              <p class="text-secondary text-xs mb-0">${addr.address_text}</p>
                          `;
                          addressesContainer.appendChild(div);
                      });

                      // Attach delete handlers
                      addressesContainer.querySelectorAll('.delete-addr-btn').forEach(btn => {
                          btn.addEventListener('click', async (e) => {
                              const addrId = e.currentTarget.getAttribute('data-id');
                              if (confirm("Are you sure you want to delete this shipping address?")) {
                                  try {
                                      const delRes = await fetch(`/api/auth/profile/addresses/${addrId}`, { method: 'DELETE' });
                                      const delData = await delRes.json();
                                      if (delData.success) {
                                          loadAddresses();
                                      } else {
                                          alert(delData.message);
                                      }
                                  } catch (err) {
                                      console.error(err);
                                  }
                              }
                          });
                      });
                  }
              } catch (err) {
                  console.error("Addresses fetch failed:", err);
              }
          };

          const loadCards = async () => {
              const cardsContainer = document.getElementById('cards-container');
              if (!cardsContainer) return;
              try {
                  const res = await fetch('/api/auth/profile/cards');
                  const data = await res.json();
                  if (data.success) {
                      cardsContainer.innerHTML = '';
                      if (data.cards.length === 0) {
                          cardsContainer.innerHTML = '<div class="col-12 text-center py-3 text-secondary text-sm">No saved cards found.</div>';
                          return;
                      }
                      data.cards.forEach(card => {
                          const div = document.createElement('div');
                          div.className = 'col-md-6 col-lg-4 mb-3';
                          div.innerHTML = `
                              <div class="card bg-dark-alpha border-purple-thin p-3 h-100 position-relative" style="background: rgba(15, 12, 27, 0.5);">
                                  <button class="btn btn-sm btn-link text-danger position-absolute top-0 end-0 m-2 delete-card-btn" data-id="${card.id}">
                                      <i class="bi bi-trash-fill"></i>
                                  </button>
                                  <div class="d-flex justify-content-between align-items-center mb-3">
                                      <span class="badge bg-info-glow text-info text-xs"><i class="bi bi-credit-card-2-front me-1"></i>${card.card_brand}</span>
                                  </div>
                                  <h5 class="text-white font-monospace mb-2">${card.card_number_masked}</h5>
                                  <div class="d-flex justify-content-between mt-auto">
                                      <div>
                                          <small class="text-secondary text-xs d-block">Cardholder</small>
                                          <span class="text-white text-xs fw-bold text-uppercase">${card.cardholder_name}</span>
                                      </div>
                                      <div class="text-end">
                                          <small class="text-secondary text-xs d-block">Expiry</small>
                                          <span class="text-white text-xs font-monospace">${card.expiry}</span>
                                      </div>
                                  </div>
                              </div>
                          `;
                          cardsContainer.appendChild(div);
                      });

                      // Attach delete handlers
                      cardsContainer.querySelectorAll('.delete-card-btn').forEach(btn => {
                          btn.addEventListener('click', async (e) => {
                              const cardId = e.currentTarget.getAttribute('data-id');
                              if (confirm("Are you sure you want to remove this saved card?")) {
                                  try {
                                      const delRes = await fetch(`/api/auth/profile/cards/${cardId}`, { method: 'DELETE' });
                                      const delData = await delRes.json();
                                      if (delData.success) {
                                          loadCards();
                                      } else {
                                          alert(delData.message);
                                      }
                                  } catch (err) {
                                      console.error(err);
                                  }
                              }
                          });
                      });
                  }
              } catch (err) {
                  console.error("Cards fetch failed:", err);
              }
          };

          const loadSecurityLogs = async () => {
              const logsContainer = document.getElementById('security-logs-container');
              if (!logsContainer) return;
              try {
                  const res = await fetch('/api/auth/profile/security-logs');
                  const data = await res.json();
                  if (data.success) {
                      logsContainer.innerHTML = '';
                      if (data.logs.length === 0) {
                          logsContainer.innerHTML = '<tr><td colspan="4" class="text-center py-3 text-secondary">No recent activities.</td></tr>';
                          return;
                      }
                      data.logs.forEach(log => {
                          const tr = document.createElement('tr');
                          tr.innerHTML = `
                              <td class="text-white fw-bold"><i class="bi bi-shield-fill-check text-info me-2"></i>${log.event}</td>
                              <td class="text-secondary text-xs">${log.timestamp}</td>
                              <td><code class="text-cyan-glow text-xs">${log.ip}</code></td>
                              <td class="text-secondary text-xs">${log.device}</td>
                          `;
                          logsContainer.appendChild(tr);
                      });
                  }
              } catch (err) {
                  console.error("Security logs fetch failed:", err);
              }
          };

          // Address Form Submit Handler
          const addAddressForm = document.getElementById('add-address-form');
          if (addAddressForm) {
              addAddressForm.addEventListener('submit', async (e) => {
                  e.preventDefault();
                  const label = document.getElementById('address-label').value;
                  const recipient_name = document.getElementById('address-recipient').value;
                  const phone = document.getElementById('address-phone').value;
                  const address_text = document.getElementById('address-text').value;
                  const errorDiv = document.getElementById('add-address-error');

                  errorDiv.classList.add('d-none');
                  try {
                      const res = await fetch('/api/auth/profile/addresses', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ label, recipient_name, phone, address_text })
                      });
                      const data = await res.json();
                      if (data.success) {
                          addAddressForm.reset();
                          const modalEl = document.getElementById('addAddressModal');
                          const modalInstance = bootstrap.Modal.getInstance(modalEl);
                          if (modalInstance) modalInstance.hide();
                          loadAddresses();
                      } else {
                          errorDiv.textContent = data.message || "Failed to save address.";
                          errorDiv.classList.remove('d-none');
                      }
                  } catch (err) {
                      console.error(err);
                      errorDiv.textContent = "An error occurred. Please try again.";
                      errorDiv.classList.remove('d-none');
                  }
              });
          }

          // Card Form Submit Handler
          const addCardForm = document.getElementById('add-card-form');
          if (addCardForm) {
              addCardForm.addEventListener('submit', async (e) => {
                  e.preventDefault();
                  const cardholder_name = document.getElementById('card-holder').value;
                  const card_number = document.getElementById('card-number').value;
                  const expiry = document.getElementById('card-expiry').value;
                  const errorDiv = document.getElementById('add-card-error');

                  errorDiv.classList.add('d-none');
                  try {
                      const res = await fetch('/api/auth/profile/cards', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ cardholder_name, card_number, expiry })
                      });
                      const data = await res.json();
                      if (data.success) {
                          addCardForm.reset();
                          const modalEl = document.getElementById('addCardModal');
                          const modalInstance = bootstrap.Modal.getInstance(modalEl);
                          if (modalInstance) modalInstance.hide();
                          loadCards();
                      } else {
                          errorDiv.textContent = data.message || "Failed to save card.";
                          errorDiv.classList.remove('d-none');
                      }
                  } catch (err) {
                      console.error(err);
                      errorDiv.textContent = "An error occurred. Please try again.";
                      errorDiv.classList.remove('d-none');
                  }
              });
          }

          // OTP Phone Verification Handler
          const verifyPhoneForm = document.getElementById('verify-phone-form');
          if (verifyPhoneForm) {
              verifyPhoneForm.addEventListener('submit', async (e) => {
                  e.preventDefault();
                  const otp = document.getElementById('otp-input').value;
                  const errorDiv = document.getElementById('verify-phone-error');

                  errorDiv.classList.add('d-none');
                  try {
                      const res = await fetch('/api/auth/profile/verify-phone', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ otp })
                      });
                      const data = await res.json();
                      if (data.success) {
                          verifyPhoneForm.reset();
                          const modalEl = document.getElementById('verifyPhoneModal');
                          const modalInstance = bootstrap.Modal.getInstance(modalEl);
                          if (modalInstance) modalInstance.hide();
                          
                          // Update phone badge status
                          const phoneStatusBadge = document.getElementById('profile-phone-status');
                          if (phoneStatusBadge) {
                              phoneStatusBadge.className = "badge bg-success-glow text-success text-xs fw-normal py-1 px-2";
                              phoneStatusBadge.innerHTML = '<i class="bi bi-patch-check-fill me-1"></i>Verified';
                              phoneStatusBadge.removeAttribute('data-bs-toggle');
                              phoneStatusBadge.removeAttribute('data-bs-target');
                              phoneStatusBadge.style.cursor = 'default';
                          }
                      } else {
                          errorDiv.textContent = data.message || "Invalid OTP code.";
                          errorDiv.classList.remove('d-none');
                      }
                  } catch (err) {
                      console.error(err);
                      errorDiv.textContent = "An error occurred. Please try again.";
                      errorDiv.classList.remove('d-none');
                  }
              });
          }

           setTimeout(() => {
               loadProfile();
               loadOrders();
               loadPrivacy();
               loadAddresses();
               loadCards();
               loadSecurityLogs();
           }, 300);

          // Save Privacy settings listener
          const savePrivacyBtn = document.getElementById('btn-save-privacy');
          if (savePrivacyBtn) {
              savePrivacyBtn.addEventListener('click', async () => {
                  const two_factor_enabled = document.getElementById('security-2fa').checked;
                  const marketing_consent = document.getElementById('privacy-personalization').checked;
                  const analytics_consent = document.getElementById('privacy-sharing').checked;
                  
                  const successDiv = document.getElementById('privacy-success');
                  const errorDiv = document.getElementById('privacy-error');
                  
                  successDiv.classList.add('d-none');
                  errorDiv.classList.add('d-none');
                  
                  savePrivacyBtn.disabled = true;
                  savePrivacyBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Saving...';
                  
                  try {
                      const res = await fetch('/api/auth/profile/privacy', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ two_factor_enabled, marketing_consent, analytics_consent })
                      });
                      const data = await res.json();
                      if (data.success) {
                          successDiv.textContent = data.message || "Privacy settings saved successfully.";
                          successDiv.classList.remove('d-none');
                      } else {
                          errorDiv.textContent = data.message || "Failed to save privacy settings.";
                          errorDiv.classList.remove('d-none');
                      }
                  } catch (err) {
                      console.error("Save privacy error:", err);
                      errorDiv.textContent = "An error occurred. Please try again.";
                      errorDiv.classList.remove('d-none');
                  } finally {
                      savePrivacyBtn.disabled = false;
                      savePrivacyBtn.innerHTML = '<i class="bi bi-shield-check me-2 text-info"></i>Save Privacy Settings';
                  }
              });
          }

          // Export Data listener
          const exportBtn = document.getElementById('btn-export-data');
          if (exportBtn) {
              exportBtn.addEventListener('click', async () => {
                  exportBtn.disabled = true;
                  exportBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Exporting Data...';
                  try {
                      const res = await fetch('/api/auth/profile/export');
                      if (res.status === 200) {
                          const blob = await res.blob();
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.style.display = 'none';
                          a.href = url;
                          a.download = `user_data_export.json`;
                          document.body.appendChild(a);
                          a.click();
                          window.URL.revokeObjectURL(url);
                      } else {
                          alert("Failed to export data. Please try again.");
                      }
                  } catch (err) {
                      console.error("Export data failed:", err);
                      alert("An error occurred during data export.");
                  } finally {
                      exportBtn.disabled = false;
                      exportBtn.innerHTML = '<i class="bi bi-filetype-json me-2"></i>Request JSON Data Export';
                  }
              });
          }

          // Terminate session helper
          const revokeSessionBtn = document.getElementById('btn-terminate-mobile-session');
          if (revokeSessionBtn) {
              revokeSessionBtn.addEventListener('click', (e) => {
                  const listItem = e.currentTarget.closest('.list-group-item');
                  if (listItem) {
                      listItem.style.opacity = '0.5';
                      e.currentTarget.disabled = true;
                      e.currentTarget.textContent = 'Revoked';
                      alert("Mobile App session successfully revoked. Any devices logged in on that session will be forced to log in again.");
                  }
              });
          }

          // Delete Account logic
          const confirmDeleteBtn = document.getElementById('btn-confirm-delete-account');
          if (confirmDeleteBtn) {
              confirmDeleteBtn.addEventListener('click', async () => {
                  const passwordInput = document.getElementById('delete-profile-password');
                  const errorDiv = document.getElementById('delete-profile-error');
                  
                  const current_password = passwordInput.value;
                  if (!current_password) {
                      errorDiv.textContent = "Please enter your password to confirm account deletion.";
                      errorDiv.classList.remove('d-none');
                      return;
                  }
                  
                  errorDiv.classList.add('d-none');
                  confirmDeleteBtn.disabled = true;
                  confirmDeleteBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Processing Erasure...';
                  
                  try {
                      const res = await fetch('/api/auth/profile/delete', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ current_password })
                      });
                      const data = await res.json();
                      if (data.success) {
                          alert(data.message || "Account permanently deleted. Redirecting you to home page.");
                          const modalEl = document.getElementById('deleteAccountModal');
                          const modalInstance = bootstrap.Modal.getInstance(modalEl);
                          if (modalInstance) {
                              modalInstance.hide();
                          }
                          window.location.href = 'dashboard.html';
                      } else {
                          errorDiv.textContent = data.message || "Incorrect credentials verification.";
                          errorDiv.classList.remove('d-none');
                      }
                  } catch (err) {
                      console.error("Delete account error:", err);
                      errorDiv.textContent = "An error occurred deleting account. Please try again.";
                      errorDiv.classList.remove('d-none');
                  } finally {
                          confirmDeleteBtn.disabled = false;
                          confirmDeleteBtn.innerHTML = '<i class="bi bi-trash-fill me-1"></i>Delete Account';
                      }
                  });
              }

              // Auto-activate tab based on URL hash
              const activateTabFromHash = () => {
                  const hash = window.location.hash || '#pane-profile';
                  const tabTriggerEl = document.querySelector(`button[data-bs-target="${hash}"]`);
                  if (tabTriggerEl) {
                      const tab = new bootstrap.Tab(tabTriggerEl);
                      tab.show();
                      
                      // Handle mobile bottom navigation active indicators
                      document.querySelectorAll('.mobile-bottom-nav .nav-item-bottom').forEach(nav => nav.classList.remove('active'));
                      if (hash === '#pane-wishlist') {
                          const cartNav = document.getElementById('btn-bottom-cart');
                          if (cartNav) cartNav.classList.add('active');
                      } else if (hash === '#pane-profile') {
                          const profileNav = document.getElementById('btn-bottom-profile');
                          if (profileNav) profileNav.classList.add('active');
                      }
                  }
              };
              
              window.addEventListener('hashchange', activateTabFromHash);
              // Run on initial load
              setTimeout(activateTabFromHash, 100);
         
         const profileForm = document.getElementById('profile-update-form');
         if (profileForm) {
             profileForm.addEventListener('submit', async (e) => {
                 e.preventDefault();
                 const name = document.getElementById('profile-name').value;
                 const email = document.getElementById('profile-email').value;
                 const phone = document.getElementById('profile-phone').value;
                 const address = document.getElementById('profile-address').value;
                 const current_password = document.getElementById('profile-curr-password').value;
                 const new_password = document.getElementById('profile-new-password').value;
                 
                 const successDiv = document.getElementById('profile-success');
                 const errorDiv = document.getElementById('profile-error');
                 
                 successDiv.classList.add('d-none');
                 errorDiv.classList.add('d-none');
                 
                 const submitBtn = document.getElementById('profile-submit-btn');
                 submitBtn.disabled = true;
                 submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Saving Changes...';
                 
                 try {
                     const res = await fetch('/api/auth/profile/update', {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({ name, email, phone, address, current_password, new_password })
                     });
                     const data = await res.json();
                     
                     if (data.success) {
                         successDiv.textContent = data.message || "Profile updated successfully!";
                         successDiv.classList.remove('d-none');
                         if (currentUserSpan) currentUserSpan.textContent = data.user.name;
                         document.getElementById('profile-curr-password').value = '';
                         document.getElementById('profile-new-password').value = '';
                         
                         loadProfile();
                     } else {
                         errorDiv.textContent = data.message || "Failed to update profile.";
                         errorDiv.classList.remove('d-none');
                     }
                 } catch (err) {
                     console.error(err);
                     errorDiv.textContent = "An error occurred updating profile. Please try again.";
                     errorDiv.classList.remove('d-none');
                 } finally {
submitBtn.disabled = false;
                     submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Save Changes';
                 }
             });
         }
      }

      // --- Product Details Page Initialization ---
      if (pathMatches('product-details')) {
          const urlParams = new URLSearchParams(window.location.search);
          const productId = parseInt(urlParams.get('id'));
          if (!productId) {
              alert("No product selected.");
              window.location.href = 'dashboard.html';
              return;
          }

          let wishlistActive = false;

          const loadProductFullDetails = async () => {
              try {
                  const res = await fetch(`/api/products/${productId}`);
                  const product = await res.json();
                  if (!product || product.success === false) {
                      document.getElementById('product-details-container').innerHTML = '<div class="text-danger py-4 text-center">Failed to load product details.</div>';
                      return;
                  }

                  // Render details
                  document.getElementById('details-image').src = getProductImage(product.name, product.category);
                  document.getElementById('details-brand').textContent = product.brand;
                  document.getElementById('details-category-badge').textContent = product.category.toUpperCase();
                  document.getElementById('details-name').textContent = product.name;
                  document.getElementById('details-description-short').textContent = product.description || 'No description available.';
                  document.getElementById('details-price').textContent = `₹${product.price.toLocaleString('en-IN')}`;

                  // Stock Status
                  const stockEl = document.getElementById('details-stock-status');
                  if (product.stock > 0) {
                      stockEl.innerHTML = `<span class="badge bg-success-glow text-success text-xs"><i class="bi bi-check-circle me-1"></i>In Stock (${product.stock} units available)</span>`;
                  } else {
                      stockEl.innerHTML = `<span class="badge bg-danger-glow text-danger text-xs"><i class="bi bi-x-circle me-1"></i>Out of Stock</span>`;
                  }

                  // Rating Stars
                  const ratingVal = product.rating || 0.0;
                  const starContainer = document.getElementById('details-rating-container');
                  const reviewStarContainer = document.getElementById('details-review-stars');
                  const avgRatingText = document.getElementById('details-review-avg-rating');
                  
                  if (starContainer) {
                      starContainer.innerHTML = renderStars(ratingVal) + ` <span class="text-white fw-bold ms-2">${ratingVal.toFixed(1)}</span>`;
                  }
                  if (reviewStarContainer) {
                      reviewStarContainer.innerHTML = renderStars(ratingVal);
                  }
                  if (avgRatingText) {
                      avgRatingText.textContent = ratingVal.toFixed(1);
                  }

                  // Action Buttons Setup
                  const buyBtn = document.getElementById('btn-details-buy');
                  if (buyBtn) {
                      buyBtn.href = `payment.html?product_id=${product.id}`;
                  }

                  // Specifications and Features
                  const extra = getProductExtendedDetails(product);
                  const specsTable = document.getElementById('details-specs-table');
                  if (specsTable) {
                      specsTable.innerHTML = '';
                      for (const [key, val] of Object.entries(extra.specs)) {
                          specsTable.innerHTML += `
                              <tr>
                                  <td class="text-secondary ps-3 py-2.5 text-capitalize" style="width: 35%;">${key}</td>
                                  <td class="text-white fw-bold py-2.5">${val}</td>
                              </tr>
                          `;
                      }
                  }

                  const featuresList = document.getElementById('details-features-list');
                  if (featuresList) {
                      featuresList.innerHTML = '';
                      extra.features.forEach(feat => {
                          featuresList.innerHTML += `
                              <li class="text-secondary mb-2 d-flex align-items-start">
                                  <i class="bi bi-check-circle-fill text-success me-2 mt-1" style="font-size: 14px;"></i>
                                  <span>${feat}</span>
                              </li>
                          `;
                      });
                  }

                  // Mock Reviews
                  loadMockReviews(product);

                  // Check Wishlist Status
                  checkWishlistStatus(product.id);

                  // Load Related Products
                  loadRelatedRecommendations(product.category, product.id);

              } catch (err) {
                  console.error(err);
              }
          };

          const checkWishlistStatus = async (pId) => {
              try {
                  const res = await fetch('/api/wishlist');
                  const data = await res.json();
                  if (data.success) {
                      const item = data.wishlist.find(i => i.product.id === pId);
                      wishlistActive = !!item;
                      updateWishlistButtonUI();
                  }
              } catch (err) {
                  console.error(err);
              }
          };

          const updateWishlistButtonUI = () => {
              const wlBtn = document.getElementById('btn-details-wishlist');
              const wlIcon = document.getElementById('btn-wishlist-icon');
              if (wlBtn && wlIcon) {
                  if (wishlistActive) {
                      wlIcon.className = "bi bi-heart-fill text-danger me-1";
                      wlBtn.classList.add('border-danger');
                  } else {
                      wlIcon.className = "bi bi-heart me-1";
                      wlBtn.classList.remove('border-danger');
                  }
              }
          };

          // Wishlist Toggle Event
          const wlBtn = document.getElementById('btn-details-wishlist');
          if (wlBtn) {
              wlBtn.addEventListener('click', async () => {
                  try {
                      if (wishlistActive) {
                          const res = await fetch(`/api/wishlist/${productId}`, { method: 'DELETE' });
                          const data = await res.json();
                          if (data.success) {
                              wishlistActive = false;
                              updateWishlistButtonUI();
                          }
                      } else {
                          const res = await fetch('/api/wishlist', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ product_id: productId })
                          });
                          const data = await res.json();
                          if (data.success) {
                              wishlistActive = true;
                              updateWishlistButtonUI();
                          } else {
                              alert(data.message || "Please log in to save items to your wishlist.");
                          }
                      }
                  } catch (err) {
                      console.error(err);
                  }
              });
          }

          // Interactive Color Selector
          const colorDots = document.querySelectorAll('.color-dot');
          const colorLabel = document.getElementById('selected-color-label');
          colorDots.forEach(dot => {
              dot.addEventListener('click', (e) => {
                  colorDots.forEach(d => d.classList.remove('active'));
                  e.currentTarget.classList.add('active');
                  const colorName = e.currentTarget.getAttribute('data-name');
                  colorLabel.textContent = `Selected: ${colorName}`;
              });
          });

          // Helper to Render Stars
          const renderStars = (rating) => {
              let stars = '';
              const fullStars = Math.floor(rating);
              const halfStar = rating % 1 >= 0.5;
              for (let i = 1; i <= 5; i++) {
                  if (i <= fullStars) {
                      stars += '<i class="bi bi-star-fill me-1"></i>';
                  } else if (i === fullStars + 1 && halfStar) {
                      stars += '<i class="bi bi-star-half me-1"></i>';
                  } else {
                      stars += '<i class="bi bi-star me-1"></i>';
                  }
              }
              return stars;
          };

          // Mock Reviews generator
          const loadMockReviews = (product) => {
              const reviewsList = document.getElementById('details-reviews-list');
              if (!reviewsList) return;
              
              const mockFeedbacks = [
                  "Absolute value for money! The build quality is amazing and fits perfectly into my workflow.",
                  "Really happy with the battery life and display quality. Exceeded my expectations.",
                  "Works well, but delivery was slightly delayed. The product itself is perfect.",
                  "Excellent product, matches all the specs advertised. Recommended for purchase!",
                  "Good packaging, premium feel, and the user interface feels fast. Highly recommend."
              ];
              
              const reviewers = [
                  { name: "Rahul S.", initial: "R" },
                  { name: "Aishwarya K.", initial: "A" },
                  { name: "Suresh P.", initial: "S" }
              ];

              reviewsList.innerHTML = '';
              reviewers.forEach((rev, idx) => {
                  const rating = idx === 0 ? 5 : (idx === 1 ? 4 : Math.floor(product.rating));
                  reviewsList.innerHTML += `
                      <div class="review-card">
                          <div class="d-flex align-items-center gap-3 mb-2">
                              <div class="avatar-circle">${rev.initial}</div>
                              <div>
                                  <h6 class="text-white fw-bold mb-0 text-sm">${rev.name}</h6>
                                  <div class="d-flex text-warning text-xs mt-0.5">
                                      ${renderStars(rating)}
                                  </div>
                              </div>
                              <span class="badge bg-success-glow text-success text-xs ms-auto"><i class="bi bi-patch-check me-1"></i>Verified</span>
                          </div>
                          <p class="text-secondary text-xs mb-0 mt-2 italic">
                              "${mockFeedbacks[idx % mockFeedbacks.length]}"
                          </p>
                      </div>
                  `;
              });
          };

          // Related Products
          const loadRelatedRecommendations = async (category, currentId) => {
              const container = document.getElementById('details-related-products');
              if (!container) return;
              try {
                  const res = await fetch(`/api/products?category=${category}`);
                  const products = await res.json();
                  if (res.ok) {
                      container.innerHTML = '';
                      const related = products.filter(p => p.id !== currentId).slice(0, 3);
                      if (related.length === 0) {
                          container.innerHTML = '<div class="col-12 text-secondary py-3 text-center">No similar products found.</div>';
                          return;
                      }

                      related.forEach(p => {
                          const col = document.createElement('div');
                          col.className = 'col-md-4';
                          col.innerHTML = `
                              <div class="card glass-card h-100 border border-purple-thin product-card hover-lift" style="cursor: pointer;" onclick="window.location.href='product-details.html?id=${p.id}'">
                                  <img src="${getProductImage(p.name, p.category)}" class="card-img-top" alt="${p.name}" style="height: 160px; object-fit: cover; border-top-left-radius: 12px; border-top-right-radius: 12px;">
                                  <div class="card-body text-start p-3">
                                      <span class="text-secondary text-xs text-uppercase fw-bold">${p.brand}</span>
                                      <h6 class="text-white fw-bold mb-2 text-truncate text-sm">${p.name}</h6>
                                      <div class="d-flex justify-content-between align-items-center mt-3">
                                          <span class="text-info fw-extrabold text-sm">₹${p.price.toLocaleString('en-IN')}</span>
                                          <span class="badge bg-purple-glow text-white text-xs"><i class="bi bi-star-fill text-warning me-1"></i>${p.rating}</span>
                                      </div>
                                  </div>
                              </div>
                          `;
                          container.appendChild(col);
                      });
                  }
              } catch (err) {
                  console.error(err);
              }
          };

          loadProductFullDetails();
      }

     // --- Payment Page Initialization ---
     if (pathMatches('payment')) {
         const urlParams = new URLSearchParams(window.location.search);
         const productId = parseInt(urlParams.get('product_id'));
         if (!productId) {
             alert("No product selected for purchase.");
             window.location.href = 'dashboard.html';
             return;
         }

         let selectedAddressId = null;
         let selectedPaymentMethod = "UPI";
         let selectedSavedCardId = null;
         let productPrice = 0;

         // Load Product Details
         const loadProductDetails = async () => {
             const prodContainer = document.getElementById('checkout-product-details');
             if (!prodContainer) return;
             try {
                 const res = await fetch(`/api/products/${productId}`);
                 const p = await res.json();
                 if (!p || p.success === false) {
                     prodContainer.innerHTML = '<div class="text-danger py-4">Failed to load product.</div>';
                     return;
                 }
                 productPrice = p.price;
                 
                 // Show product summary
                 prodContainer.innerHTML = `
                     <div class="d-flex align-items-center gap-3">
                         <img src="${getProductImage(p.name, p.category)}" class="rounded" style="width: 70px; height: 70px; object-fit: cover; border: 1px solid var(--border-color);">
                         <div class="flex-grow-1 overflow-hidden">
                             <h6 class="text-white mb-1 fw-bold text-truncate">${p.name}</h6>
                             <span class="badge-category mb-0">${p.category}</span>
                             <span class="text-secondary text-sm d-block mt-1">Qty: 1</span>
                         </div>
                     </div>
                 `;

                 // Update Invoice prices
                 const subtotal = p.price;
                 const gst = subtotal * 0.18; // 18% inclusive GST
                 const total = subtotal; // Inclusive GST, shipping free

                 document.getElementById('invoice-subtotal').textContent = `₹${(subtotal - gst).toLocaleString('en-IN', {maximumFractionDigits:2})}`;
                 document.getElementById('invoice-gst').textContent = `₹${gst.toLocaleString('en-IN', {maximumFractionDigits:2})}`;
                 document.getElementById('invoice-total').textContent = `₹${total.toLocaleString('en-IN')}`;

                 // Load related product suggestions
                 loadRelatedProducts(p.category);
             } catch (err) {
                 console.error(err);
                 prodContainer.innerHTML = '<div class="text-danger py-4">Error loading product details.</div>';
             }
         };

         // Load Related Products Suggestions
         const loadRelatedProducts = async (category) => {
             const grid = document.getElementById('related-products-grid');
             if (!grid) return;
             try {
                 const res = await fetch(`/api/recommendations?category=${category}&min_rating=3.0`);
                 const items = await res.json();
                 grid.innerHTML = '';
                 
                 // Filter out the current product being purchased
                 const filtered = items.filter(item => item.product && item.product.product_id !== productId).slice(0, 3);
                 
                 if (filtered.length === 0) {
                     document.getElementById('related-products-section').classList.add('d-none');
                     return;
                 }
                 
                 filtered.forEach(item => {
                     const prodItem = item.product;
                     const stars = getStarRatingHTML(prodItem.rating);
                     const col = document.createElement('div');
                     col.className = 'col-md-4';
                     col.innerHTML = `
                         <div class="card h-100 glass-card overflow-hidden text-start" style="background: rgba(15, 12, 27, 0.4); border: 1px solid var(--border-color);">
                             <img src="${getProductImage(prodItem.name, prodItem.category)}" class="card-img-top" alt="${prodItem.name}" style="height: 120px; object-fit: cover; filter: brightness(0.9);">
                             <div class="card-body p-3 d-flex flex-column">
                                 <h6 class="text-white mb-1 text-truncate fw-bold" style="font-size: 14px;">${prodItem.name}</h6>
                                 <div class="mb-2 text-xs">${stars} <small class="text-muted">(${prodItem.rating})</small></div>
                                 <h5 class="text-info font-weight-bold mb-3">₹${prodItem.price.toLocaleString('en-IN')}</h5>
                                 <button class="btn btn-glow-outline btn-sm w-100 mt-auto view-related-btn" data-id="${prodItem.product_id}">
                                     <i class="bi bi-cart-fill me-1"></i> Buy This Too
                                 </button>
                             </div>
                         </div>
                     `;
                     grid.appendChild(col);
                 });
                 
                 grid.querySelectorAll('.view-related-btn').forEach(btn => {
                     btn.addEventListener('click', (e) => {
                         const id = e.currentTarget.getAttribute('data-id');
                         window.open(`payment.html?product_id=${id}`, '_blank');
                     });
                 });
             } catch (err) {
                 console.error("Related products load failed:", err);
                 document.getElementById('related-products-section').classList.add('d-none');
             }
         };

         // Load Shipping Addresses
         const loadCheckoutAddresses = async () => {
             const container = document.getElementById('checkout-addresses-list');
             if (!container) return;
             try {
                 const res = await fetch('/api/auth/profile/addresses');
                 const data = await res.json();
                 if (data.success) {
                     container.innerHTML = '';
                     if (data.addresses.length === 0) {
                         container.innerHTML = `
                             <div class="col-12 text-center py-4">
                                 <p class="text-secondary mb-3">No shipping addresses found in your profile.</p>
                                 <button class="btn btn-sm btn-glow-primary" data-bs-toggle="modal" data-bs-target="#addAddressModal">
                                     <i class="bi bi-plus-circle me-1"></i>Add Shipping Address
                                 </button>
                             </div>
                         `;
                         selectedAddressId = null;
                         return;
                      }

                      data.addresses.forEach((addr, idx) => {
                          const isChecked = idx === 0;
                          if (isChecked) selectedAddressId = addr.id;

                          const div = document.createElement('div');
                          div.className = 'col-md-6';
                          div.innerHTML = `
                              <label class="d-flex align-items-start p-3 rounded border cursor-pointer h-100 ${isChecked ? 'border-purple-thin' : ''}" style="background: rgba(15, 12, 27, 0.4); cursor: pointer;" id="addr-label-${addr.id}">
                                  <input type="radio" name="checkout_address_sel" value="${addr.id}" ${isChecked ? 'checked' : ''} class="mt-1 me-3 align-self-start address-radio-btn" data-id="${addr.id}">
                                  <div class="text-start">
                                      <span class="badge bg-purple-glow text-white text-xs mb-1">${addr.label}</span>
                                      <span class="text-white fw-bold d-block text-xs">${addr.recipient_name}</span>
                                      <small class="text-secondary text-xs d-block mb-1"><i class="bi bi-telephone me-1"></i>${addr.phone}</small>
                                      <small class="text-secondary text-xs d-block">${addr.address_text}</small>
                                  </div>
                              </label>
                          `;
                          container.appendChild(div);
                      });

                      // Add change listeners
                      container.querySelectorAll('.address-radio-btn').forEach(radio => {
                          radio.addEventListener('change', (e) => {
                              const id = parseInt(e.currentTarget.getAttribute('data-id'));
                              selectedAddressId = id;
                              // Update borders
                              container.querySelectorAll('label').forEach(lbl => lbl.classList.remove('border-purple-thin'));
                              document.getElementById(`addr-label-${id}`).classList.add('border-purple-thin');
                          });
                      });
                 }
             } catch (err) {
                 console.error(err);
                 container.innerHTML = '<div class="text-danger py-3">Failed to load shipping addresses.</div>';
             }
         };

         // Load Saved Cards
         const loadCheckoutCards = async () => {
             const container = document.getElementById('checkout-cards-list');
             if (!container) return;
             try {
                 const res = await fetch('/api/auth/profile/cards');
                 const data = await res.json();
                 if (data.success) {
                     container.innerHTML = '';
                     if (data.cards.length === 0) {
                         container.innerHTML = `
                             <div class="col-12 text-secondary text-sm">
                                 No saved cards found. Please click "New Card" to add one.
                             </div>
                         `;
                         selectedSavedCardId = null;
                         return;
                     }

                     data.cards.forEach((card, idx) => {
                         const isChecked = idx === 0;
                         if (isChecked) selectedSavedCardId = card.id;

                         const div = document.createElement('div');
                         div.className = 'col-md-6';
                         div.innerHTML = `
                             <label class="d-flex align-items-start p-3 rounded border cursor-pointer h-100 ${isChecked ? 'border-purple-thin' : ''}" style="background: rgba(15, 12, 27, 0.4); cursor: pointer;" id="card-label-${card.id}">
                                 <input type="radio" name="checkout_card_sel" value="${card.id}" ${isChecked ? 'checked' : ''} class="mt-1 me-3 card-radio-btn" data-id="${card.id}">
                                 <div class="text-start w-100">
                                     <div class="d-flex justify-content-between align-items-center mb-2">
                                         <span class="badge bg-info-glow text-info text-xs"><i class="bi bi-credit-card-fill me-1"></i>${card.card_brand}</span>
                                     </div>
                                     <span class="text-white font-monospace text-xs d-block mb-1">${card.card_number_masked}</span>
                                     <small class="text-secondary text-xs text-uppercase d-block">${card.cardholder_name} (Exp: ${card.expiry})</small>
                                 </div>
                             </label>
                         `;
                         container.appendChild(div);
                     });

                     // Add change listeners
                     container.querySelectorAll('.card-radio-btn').forEach(radio => {
                         radio.addEventListener('change', (e) => {
                             const id = parseInt(e.currentTarget.getAttribute('data-id'));
                             selectedSavedCardId = id;
                             container.querySelectorAll('label').forEach(lbl => lbl.classList.remove('border-purple-thin'));
                             document.getElementById(`card-label-${id}`).classList.add('border-purple-thin');
                         });
                     });
                 }
             } catch (err) {
                 console.error(err);
                 container.innerHTML = '<div class="text-danger text-sm">Failed to load saved cards.</div>';
             }
         };

         // Listen to payment method radios
         document.querySelectorAll('input[name="payment_method_sel"]').forEach(radio => {
             radio.addEventListener('change', (e) => {
                 selectedPaymentMethod = e.currentTarget.value;
                 
                 // Hide all sub-panels
                 document.querySelectorAll('.payment-fields-pane').forEach(pane => pane.classList.add('d-none'));
                 
                 // Show matching sub-panel
                 if (selectedPaymentMethod === "UPI") {
                     document.getElementById('payment-field-upi').classList.remove('d-none');
                 } else if (selectedPaymentMethod === "Credit/Debit Card") {
                     document.getElementById('payment-field-card').classList.remove('d-none');
                     loadCheckoutCards();
                 } else if (selectedPaymentMethod === "Net Banking") {
                     document.getElementById('payment-field-net').classList.remove('d-none');
                 } else if (selectedPaymentMethod === "COD") {
                     document.getElementById('payment-field-cod').classList.remove('d-none');
                 }
             });
         });

         // Add address modal submit callback for checkout refresh
         const checkAddrForm = document.getElementById('add-address-form');
         if (checkAddrForm) {
             checkAddrForm.addEventListener('submit', async (e) => {
                 e.preventDefault();
                 const label = document.getElementById('address-label').value;
                 const recipient_name = document.getElementById('address-recipient').value;
                 const phone = document.getElementById('address-phone').value;
                 const address_text = document.getElementById('address-text').value;
                 const errorDiv = document.getElementById('add-address-error');

                 errorDiv.classList.add('d-none');
                 try {
                     const res = await fetch('/api/auth/profile/addresses', {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({ label, recipient_name, phone, address_text })
                     });
                     const data = await res.json();
                     if (data.success) {
                         checkAddrForm.reset();
                         const modalEl = document.getElementById('addAddressModal');
                         const modalInstance = bootstrap.Modal.getInstance(modalEl);
                         if (modalInstance) modalInstance.hide();
                         loadCheckoutAddresses();
                     } else {
                         errorDiv.textContent = data.message || "Failed to save address.";
                         errorDiv.classList.remove('d-none');
                     }
                 } catch (err) {
                     console.error(err);
                     errorDiv.textContent = "An error occurred. Please try again.";
                     errorDiv.classList.remove('d-none');
                 }
             });
         }

         // Add card modal submit callback for checkout refresh
         const checkCardForm = document.getElementById('add-card-form');
         if (checkCardForm) {
             checkCardForm.addEventListener('submit', async (e) => {
                 e.preventDefault();
                 const cardholder_name = document.getElementById('card-holder').value;
                 const card_number = document.getElementById('card-number').value;
                 const expiry = document.getElementById('card-expiry').value;
                 const errorDiv = document.getElementById('add-card-error');

                 errorDiv.classList.add('d-none');
                 try {
                     const res = await fetch('/api/auth/profile/cards', {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({ cardholder_name, card_number, expiry })
                      });
                      const data = await res.json();
                      if (data.success) {
                          checkCardForm.reset();
                          const modalEl = document.getElementById('addCardModal');
                          const modalInstance = bootstrap.Modal.getInstance(modalEl);
                          if (modalInstance) modalInstance.hide();
                          loadCheckoutCards();
                      } else {
                          errorDiv.textContent = data.message || "Failed to save card.";
                          errorDiv.classList.remove('d-none');
                      }
                 } catch (err) {
                     console.error(err);
                     errorDiv.textContent = "An error occurred. Please try again.";
                     errorDiv.classList.remove('d-none');
                 }
             });
         }

         // Checkout Button Submit Handler
         const payBtn = document.getElementById('btn-complete-checkout');
         if (payBtn) {
             payBtn.addEventListener('click', async () => {
                 if (!selectedAddressId) {
                     alert("Please select or add a shipping address to proceed.");
                     return;
                 }

                 // If card selection is active but no saved card is selected
                 if (selectedPaymentMethod === "Credit/Debit Card" && !selectedSavedCardId) {
                     alert("Please select or add a payment card to proceed.");
                     return;
                 }

                 // If UPI option is active but UPI ID is empty
                 if (selectedPaymentMethod === "UPI") {
                     const upiIdVal = document.getElementById('upi-id-input').value;
                     if (!upiIdVal) {
                         alert("Please enter your UPI ID.");
                         return;
                     }
                 }

                 payBtn.disabled = true;
                 payBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Processing Secure Payment...';

                 try {
                     const res = await fetch('/api/payment/checkout', {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({ product_id: productId, payment_method: selectedPaymentMethod })
                     });
                     const data = await res.json();
                     if (data.success) {
                         // Payment success! Let's display the success receipt state
                         document.getElementById('checkout-panels-row').classList.add('d-none');
                         const relSec = document.getElementById('related-products-section');
                         if (relSec) relSec.classList.add('d-none');
                         
                         // Populate receipt fields
                         document.getElementById('receipt-item-name').textContent = data.order.product_name;
                         document.getElementById('receipt-txn-id').textContent = data.order.transaction_id;
                         document.getElementById('receipt-amount').textContent = `₹${data.order.amount.toLocaleString('en-IN')}`;
                         document.getElementById('receipt-method').textContent = data.order.payment_method;
                         document.getElementById('receipt-date').textContent = data.order.created_at;

                         // Fetch selected address text for receipt
                         try {
                             const addrRes = await fetch('/api/auth/profile/addresses');
                             const addrData = await addrRes.json();
                             if (addrData.success) {
                                 const selectedAddr = addrData.addresses.find(a => a.id === selectedAddressId);
                                 if (selectedAddr) {
                                     document.getElementById('receipt-address').textContent = `${selectedAddr.recipient_name}, ${selectedAddr.address_text}`;
                                 }
                             }
                         } catch (addrErr) {
                             console.error("Failed to load address for receipt:", addrErr);
                         }

                         // Show Success receipt
                         document.getElementById('success-receipt-container').classList.remove('d-none');
                     } else {
                         alert(data.message || "Payment processing failed. Please try again.");
                         payBtn.disabled = false;
                         payBtn.innerHTML = '<i class="bi bi-shield-lock-fill me-2"></i>Pay Securely Now';
                     }
                 } catch (err) {
                     console.error("Payment error:", err);
                     alert("An error occurred during payment processing.");
                     payBtn.disabled = false;
                     payBtn.innerHTML = '<i class="bi bi-shield-lock-fill me-2"></i>Pay Securely Now';
                 }
             });
         }

         // Load initial checkout state
         loadProductDetails();
         loadCheckoutAddresses();
     }

    // --- Direct Search API Redirect Helper ---
    const urlParams = new URLSearchParams(window.location.search);
    const searchVal = urlParams.get('query');
    if (searchVal && searchInput) {
        searchInput.value = searchVal;
    }

    // Run Initial Data Fetches
    checkAuth();
    fetchProducts();
});
