import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

const STORAGE_KEY = "novaora_wishlist";

function getInitialWishlist() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load wishlist:", error);
    return [];
  }
}

function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(
    getInitialWishlist
  );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  function isInWishlist(productId) {
    return wishlistItems.some(
      (item) => String(item.id) === String(productId)
    );
  }

  function addToWishlist(product) {
    setWishlistItems((currentItems) => {
      if (
        currentItems.some(
          (item) => String(item.id) === String(product.id)
        )
      ) {
        return currentItems;
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          originalPrice: product.originalPrice,
          discount: product.discount,
          rating: product.rating,
          reviewCount: product.reviewCount,
          images: product.images,
          stock: product.stock,
          badge: product.badge,
        },
      ];
    });
  }

  function removeFromWishlist(productId) {
    setWishlistItems((currentItems) =>
      currentItems.filter(
        (item) => String(item.id) !== String(productId)
      )
    );
  }

  function toggleWishlist(product) {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  function clearWishlist() {
    setWishlistItems([]);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

function useWishlist() {
  return useContext(WishlistContext);
}

export { WishlistProvider };
export default useWishlist;
