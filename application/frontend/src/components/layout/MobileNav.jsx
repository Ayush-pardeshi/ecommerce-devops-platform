import { NavLink } from "react-router-dom";

function MobileNav({ open, onClose }) {
  if (!open) {
    return null;
  }

  const items = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/products" },
    { label: "Categories", path: "/categories" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Cart", path: "/cart" },
    { label: "Account", path: "/login" },
  ];

  return (
    <div className="mobile-nav-overlay" onClick={onClose}>
      <aside
        className="mobile-nav"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mobile-nav-header">
          <strong>NOVAORA</strong>

          <button type="button" onClick={onClose} aria-label="Close menu">
            ×
          </button>
        </div>

        <nav>
          {items.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "mobile-nav-link active" : "mobile-nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mobile-nav-footer">
          <span>Secure shopping</span>
          <span>Easy returns</span>
        </div>
      </aside>
    </div>
  );
}

export default MobileNav;
