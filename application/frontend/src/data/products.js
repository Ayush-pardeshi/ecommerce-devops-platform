const products = [
  {
    id: 1,
    name: "ProBook 14 Laptop",
    brand: "Aureon",
    category: "electronics",
    description:
      "Slim everyday laptop with a sharp display, reliable performance and long battery life.",
    price: 64999,
    originalPrice: 74999,
    discount: 13,
    rating: 4.7,
    reviewCount: 284,
    stock: 12,
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=85",
    ],
    specifications: {
      Display: "14-inch FHD",
      Processor: "Intel Core i5",
      Memory: "16 GB",
      Storage: "512 GB SSD",
    },
    variants: ["Silver", "Space Grey"],
  },

  {
    id: 2,
    name: "NoiseCancel Wireless Headphones",
    brand: "Sonicra",
    category: "electronics",
    description:
      "Over-ear wireless headphones with active noise cancellation and immersive sound.",
    price: 5999,
    originalPrice: 7999,
    discount: 25,
    rating: 4.6,
    reviewCount: 531,
    stock: 25,
    badge: "Popular",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85",
    ],
    specifications: {
      Type: "Over-ear",
      Connectivity: "Bluetooth 5.3",
      Battery: "40 hours",
      Feature: "Active Noise Cancellation",
    },
    variants: ["Black", "White"],
  },

  {
    id: 3,
    name: "AeroFit Smart Watch",
    brand: "Aureon",
    category: "electronics",
    description:
      "Minimal smart watch with fitness tracking, notifications and everyday health insights.",
    price: 4499,
    originalPrice: 5999,
    discount: 25,
    rating: 4.5,
    reviewCount: 318,
    stock: 18,
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85",
    ],
    specifications: {
      Display: "AMOLED",
      Battery: "7 days",
      WaterResistance: "5 ATM",
      Connectivity: "Bluetooth",
    },
    variants: ["Black", "Graphite", "Silver"],
  },

  {
    id: 4,
    name: "Studio Mechanical Keyboard",
    brand: "Keyform",
    category: "electronics",
    description:
      "Compact mechanical keyboard designed for productive work and comfortable typing.",
    price: 3499,
    originalPrice: 4299,
    discount: 19,
    rating: 4.8,
    reviewCount: 192,
    stock: 30,
    badge: "Top Rated",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=85",
    ],
    specifications: {
      Layout: "75%",
      Switches: "Mechanical",
      Connectivity: "USB-C",
      Backlight: "White LED",
    },
    variants: ["Black", "White"],
  },

  {
    id: 5,
    name: "UltraView 27 Monitor",
    brand: "Viewora",
    category: "electronics",
    description:
      "27-inch monitor with crisp resolution and a clean design for work and entertainment.",
    price: 18999,
    originalPrice: 22999,
    discount: 17,
    rating: 4.6,
    reviewCount: 147,
    stock: 9,
    badge: "Limited",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=900&q=85",
    ],
    specifications: {
      Size: "27-inch",
      Resolution: "2560 × 1440",
      RefreshRate: "100 Hz",
      Panel: "IPS",
    },
    variants: ["Black"],
  },

  {
    id: 6,
    name: "Urban Essential Overshirt",
    brand: "Northline",
    category: "fashion",
    description:
      "Relaxed everyday overshirt made for versatile layering across seasons.",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.5,
    reviewCount: 89,
    stock: 40,
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=900&q=85",
    ],
    specifications: {
      Material: "Cotton blend",
      Fit: "Relaxed",
      Pattern: "Solid",
      Care: "Machine wash",
    },
    variants: ["Black", "Olive", "Beige"],
  },

  {
    id: 7,
    name: "Classic Leather Sneakers",
    brand: "Velora",
    category: "fashion",
    description:
      "Clean low-top sneakers combining everyday comfort with understated style.",
    price: 2799,
    originalPrice: 3999,
    discount: 30,
    rating: 4.6,
    reviewCount: 215,
    stock: 22,
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85",
    ],
    specifications: {
      Material: "Synthetic leather",
      Sole: "Rubber",
      Style: "Low-top",
      Closure: "Lace-up",
    },
    variants: ["White", "Black"],
  },

  {
    id: 8,
    name: "Relaxed Fit Everyday Tee",
    brand: "Northline",
    category: "fashion",
    description:
      "Soft cotton t-shirt with a relaxed silhouette for everyday wear.",
    price: 799,
    originalPrice: 1199,
    discount: 33,
    rating: 4.4,
    reviewCount: 174,
    stock: 65,
    badge: "Everyday Pick",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85",
    ],
    specifications: {
      Material: "100% Cotton",
      Fit: "Relaxed",
      Neck: "Crew",
      Care: "Machine wash",
    },
    variants: ["White", "Black", "Grey", "Navy"],
  },

  {
    id: 9,
    name: "Minimalist Chronograph",
    brand: "Meridian",
    category: "accessories",
    description:
      "Refined everyday watch with a clean dial and understated metal case.",
    price: 4299,
    originalPrice: 5499,
    discount: 22,
    rating: 4.7,
    reviewCount: 103,
    stock: 14,
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900&q=85",
    ],
    specifications: {
      Movement: "Quartz",
      Case: "Stainless steel",
      Strap: "Leather",
      WaterResistance: "5 ATM",
    },
    variants: ["Black", "Brown"],
  },

  {
    id: 10,
    name: "Everyday Canvas Backpack",
    brand: "Trailmark",
    category: "accessories",
    description:
      "Practical daily backpack with a spacious main compartment and laptop sleeve.",
    price: 1699,
    originalPrice: 2299,
    discount: 26,
    rating: 4.6,
    reviewCount: 241,
    stock: 31,
    badge: "Popular",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=85",
    ],
    specifications: {
      Material: "Canvas",
      Capacity: "22 L",
      Laptop: "Up to 15-inch",
      Closure: "Zip",
    },
    variants: ["Black", "Olive"],
  },

  {
    id: 11,
    name: "Linen Comfort Cushion Set",
    brand: "Haven & Co.",
    category: "home",
    description:
      "Soft textured cushion covers designed to add a subtle premium touch to your space.",
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    rating: 4.5,
    reviewCount: 76,
    stock: 28,
    badge: "Home Pick",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=900&q=85",
    ],
    specifications: {
      Material: "Linen blend",
      Set: "4 cushions",
      Size: "45 × 45 cm",
      Care: "Machine wash",
    },
    variants: ["Natural", "Grey"],
  },

  {
    id: 12,
    name: "Ceramic Table Lamp",
    brand: "Haven & Co.",
    category: "home",
    description:
      "Warm ambient table lamp with a simple ceramic body and fabric shade.",
    price: 2199,
    originalPrice: 2999,
    discount: 27,
    rating: 4.7,
    reviewCount: 118,
    stock: 16,
    badge: "Top Rated",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=85",
    ],
    specifications: {
      Material: "Ceramic",
      Bulb: "LED",
      Light: "Warm white",
      Power: "10 W",
    },
    variants: ["White", "Beige"],
  },

  {
    id: 13,
    name: "Hydrating Face Serum",
    brand: "Luma Skin",
    category: "beauty",
    description:
      "Lightweight daily serum formulated for hydrated and refreshed-looking skin.",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.6,
    reviewCount: 356,
    stock: 44,
    badge: "Bestseller",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=85",
    ],
    specifications: {
      Volume: "30 ml",
      SkinType: "All skin types",
      Finish: "Lightweight",
      Usage: "Morning & evening",
    },
    variants: ["30 ml"],
  },

  {
    id: 14,
    name: "Everyday Fragrance",
    brand: "Aurelle",
    category: "beauty",
    description:
      "Fresh modern fragrance with a balanced profile designed for everyday wear.",
    price: 1599,
    originalPrice: 1999,
    discount: 20,
    rating: 4.5,
    reviewCount: 204,
    stock: 20,
    badge: "Popular",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=85",
    ],
    specifications: {
      Volume: "50 ml",
      Type: "Eau de parfum",
      Profile: "Fresh",
      Longevity: "6–8 hours",
    },
    variants: ["50 ml", "100 ml"],
  },

  {
    id: 15,
    name: "Performance Running Shoes",
    brand: "Stridemark",
    category: "sports",
    description:
      "Lightweight running shoes with responsive cushioning for daily training.",
    price: 3299,
    originalPrice: 4499,
    discount: 27,
    rating: 4.8,
    reviewCount: 287,
    stock: 19,
    badge: "Top Rated",
    images: [
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&q=85",
    ],
    specifications: {
      Upper: "Mesh",
      Sole: "Rubber",
      Cushioning: "Responsive foam",
      Activity: "Running",
    },
    variants: ["Black", "Grey", "Blue"],
  },

  {
    id: 16,
    name: "Insulated Steel Bottle",
    brand: "Trailmark",
    category: "sports",
    description:
      "Double-wall insulated bottle designed to keep drinks cold or hot for hours.",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.7,
    reviewCount: 421,
    stock: 55,
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=85",
    ],
    specifications: {
      Capacity: "750 ml",
      Material: "Stainless steel",
      Insulation: "Double wall",
      Lid: "Leak resistant",
    },
    variants: ["Black", "Silver", "Green"],
  },

  {
    id: 17,
    name: "Wireless Noise Cancelling Headphones",
    brand: "SonicFlow",
    category: "electronics",
    description: "Over-ear wireless headphones with active noise cancellation and long battery life.",
    price: 6499,
    originalPrice: 8999,
    discount: 28,
    rating: 4.6,
    reviewCount: 842,
    stock: 24,
    badge: "Top Rated",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85"],
    specifications: {
      Connectivity: "Bluetooth 5.3",
      Battery: "40 hours",
      Driver: "40 mm",
      NoiseCancellation: "Active"
    },
    variants: ["Black", "White", "Blue"]
  },

  {
    id: 18,
    name: "Smart Fitness Watch",
    brand: "PulseOne",
    category: "electronics",
    description: "Fitness smartwatch with activity tracking and daily notifications.",
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    rating: 4.5,
    reviewCount: 617,
    stock: 31,
    badge: "Trending",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85"],
    specifications: {
      Display: "AMOLED",
      Battery: "7 days",
      WaterResistance: "5 ATM",
      Connectivity: "Bluetooth"
    },
    variants: ["Black", "Silver", "Rose Gold"]
  },

  {
    id: 19,
    name: "Minimal Leather Backpack",
    brand: "UrbanCraft",
    category: "fashion",
    description: "Clean everyday backpack with a spacious interior and laptop compartment.",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.6,
    reviewCount: 354,
    stock: 42,
    badge: "Best Seller",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=85"],
    specifications: {
      Material: "Faux leather",
      Capacity: "18 L",
      Laptop: "Up to 15 inch",
      Closure: "Zip"
    },
    variants: ["Black", "Brown", "Tan"]
  },

  {
    id: 20,
    name: "Classic Cotton Overshirt",
    brand: "Northline",
    category: "fashion",
    description: "Relaxed cotton overshirt designed for comfortable everyday layering.",
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    rating: 4.4,
    reviewCount: 218,
    stock: 36,
    badge: "New",
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=85"],
    specifications: {
      Material: "Cotton",
      Fit: "Relaxed",
      Sleeve: "Full sleeve",
      Care: "Machine wash"
    },
    variants: ["Black", "Olive", "Beige"]
  },

  {
    id: 21,
    name: "Modern Table Lamp",
    brand: "LumaHome",
    category: "home",
    description: "Minimal table lamp with warm lighting for desks, bedrooms and reading corners.",
    price: 1499,
    originalPrice: 2199,
    discount: 32,
    rating: 4.7,
    reviewCount: 389,
    stock: 27,
    badge: "Top Rated",
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=85"],
    specifications: {
      Light: "Warm LED",
      Power: "8 W",
      Material: "Metal",
      Switch: "Inline"
    },
    variants: ["Black", "White", "Gold"]
  },

  {
    id: 22,
    name: "Soft Knit Cushion Set",
    brand: "HavenLiving",
    category: "home",
    description: "Decorative knit cushions designed to add texture and comfort to your living space.",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.5,
    reviewCount: 176,
    stock: 48,
    badge: "Value Pick",
    images: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=900&q=85"],
    specifications: {
      Material: "Cotton blend",
      Size: "18 x 18 inch",
      Filling: "Poly fiber",
      Care: "Machine washable"
    },
    variants: ["Cream", "Grey", "Olive"]
  },

  {
    id: 23,
    name: "Hydrating Face Serum",
    brand: "PureForm",
    category: "beauty",
    description: "Lightweight hydrating serum designed for a fresh and balanced skin feel.",
    price: 799,
    originalPrice: 1199,
    discount: 33,
    rating: 4.6,
    reviewCount: 532,
    stock: 64,
    badge: "Popular",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=85"],
    specifications: {
      Volume: "30 ml",
      SkinType: "All skin types",
      Texture: "Lightweight",
      Finish: "Non-greasy"
    },
    variants: ["30 ml", "50 ml"]
  },

  {
    id: 24,
    name: "Daily Grooming Kit",
    brand: "VerveCare",
    category: "beauty",
    description: "Compact grooming essentials designed for a simple daily personal-care routine.",
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    rating: 4.4,
    reviewCount: 293,
    stock: 39,
    badge: "Best Seller",
    images: ["https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=900&q=85"],
    specifications: {
      Pieces: "5",
      Case: "Travel case",
      Material: "Stainless steel",
      Use: "Daily grooming"
    },
    variants: ["Black", "Silver"]
  },

  {
    id: 25,
    name: "Classic Analog Watch",
    brand: "Meridian",
    category: "accessories",
    description: "Timeless analog watch with a clean dial and comfortable everyday strap.",
    price: 2899,
    originalPrice: 3999,
    discount: 28,
    rating: 4.7,
    reviewCount: 451,
    stock: 19,
    badge: "Top Rated",
    images: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900&q=85"],
    specifications: {
      Movement: "Quartz",
      Case: "Stainless steel",
      Strap: "Leather",
      WaterResistance: "3 ATM"
    },
    variants: ["Black", "Brown", "Blue"]
  },

  {
    id: 26,
    name: "Everyday Sunglasses",
    brand: "Vista",
    category: "accessories",
    description: "Lightweight sunglasses with a versatile frame for everyday outdoor use.",
    price: 1199,
    originalPrice: 1799,
    discount: 33,
    rating: 4.3,
    reviewCount: 184,
    stock: 57,
    badge: "New",
    images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900&q=85"],
    specifications: {
      Frame: "Acetate",
      Lens: "UV protected",
      Shape: "Round",
      Fit: "Medium"
    },
    variants: ["Black", "Tortoise", "Clear"]
  },

  {
    id: 27,
    name: "Training Duffle Bag",
    brand: "Motion",
    category: "sports",
    description: "Durable training duffle with separate compartments for gym and travel essentials.",
    price: 1699,
    originalPrice: 2499,
    discount: 32,
    rating: 4.5,
    reviewCount: 327,
    stock: 44,
    badge: "Popular",
    images: ["https://images.unsplash.com/photo-1553068718-7d9e7a1e5c2b?w=900&q=85"],
    specifications: {
      Capacity: "35 L",
      Material: "Polyester",
      Compartments: "4",
      Strap: "Adjustable"
    },
    variants: ["Black", "Grey", "Navy"]
  },

  {
    id: 28,
    name: "Yoga Mat Pro",
    brand: "FlexCore",
    category: "sports",
    description: "Cushioned non-slip yoga mat designed for comfortable workouts.",
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    rating: 4.6,
    reviewCount: 412,
    stock: 52,
    badge: "Best Seller",
    images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=900&q=85"],
    specifications: {
      Thickness: "6 mm",
      Material: "TPE",
      Surface: "Non-slip",
      Length: "183 cm"
    },
    variants: ["Black", "Blue", "Green"]
  },

  {
    id: 29,
    name: "Compact Bluetooth Speaker",
    brand: "EchoMini",
    category: "electronics",
    description: "Portable Bluetooth speaker delivering clear sound in a compact design.",
    price: 2199,
    originalPrice: 2999,
    discount: 27,
    rating: 4.5,
    reviewCount: 638,
    stock: 33,
    badge: "Trending",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900&q=85"],
    specifications: {
      Connectivity: "Bluetooth 5.2",
      Battery: "12 hours",
      WaterResistance: "IPX5",
      Power: "10 W"
    },
    variants: ["Black", "Blue", "Red"]
  },

  {
    id: 30,
    name: "Ceramic Coffee Set",
    brand: "TableStory",
    category: "home",
    description: "Elegant ceramic coffee set designed for relaxed mornings and everyday serving.",
    price: 1099,
    originalPrice: 1599,
    discount: 31,
    rating: 4.6,
    reviewCount: 265,
    stock: 28,
    badge: "New",
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=85"],
    specifications: {
      Pieces: "4",
      Material: "Ceramic",
      Capacity: "250 ml",
      DishwasherSafe: "Yes"
    },
    variants: ["White", "Beige", "Black"]
  },

];

export default products;