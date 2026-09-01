import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product, ProductVariant } from "../api/types";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./ProductCard.css";

export default function ProductCard({ product }: { product: Product }) {
  const hasVariants = product.variants && product.variants.length > 0;
  const { cart , addItem , updateQuantity } = useCart();
  const { user, openLogin } = useAuth();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    hasVariants ? product.variants?.[0] ?? null : null
  );
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  function handleVariantChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const variant = product.variants?.find((v) => v.id === Number(e.target.value)) ?? null;
    setSelectedVariant(variant);
    setAdded(false);
    setError(null);
    setQuantity(0);
  }

  const outOfStock = selectedVariant ? selectedVariant.stockQuantity <= 0 : true;

  async function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      openLogin();
      return;
    }
    if (!selectedVariant) return;

    setAdding(true);
    setError(null);
    setAdded(false);
    try {
      await addItem(product.id, selectedVariant.id, 1);
      setQuantity(1);
      setAdded(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not add to cart.");
    } finally {
      setAdding(false);
    }
  }

  async function handleQuantityChange(productId: number, variantId: number, quantity: number) {
    if (quantity < 1) return;
    setError(null);
    try {
      await updateQuantity(productId, variantId, quantity);
      setQuantity(quantity);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not update quantity.");
    }
  }


  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-card-image">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="product-card-placeholder">No image yet</div>
        )}
      </div>

      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>

        {selectedVariant && (
          <span className="product-card-price">
            Rs. {selectedVariant.price.toFixed(0)}
          </span>
        )}

        {hasVariants && (
          <select
            className="product-card-variant-select"
            value={selectedVariant?.id ?? ""}
            onClick={(e) => e.preventDefault()}
            onChange={handleVariantChange}
          >
            {product.variants?.map((variant) => (
              <option key={variant.id} value={variant.id}>
                  {variant.weightGrams} g - Rs. {variant.price.toFixed(0)}
              </option>
            ))}
          </select>
        )}

        {error && <p className="product-card-error">{error}</p>}

        { quantity == 0 ? 

                <button
          className="product-card-add"
          disabled={outOfStock || !hasVariants || adding}
          onClick={handleAddToCart}
        >
          {outOfStock ? "Sold out" : added ? "Added" : adding ? "Adding…" : "Add to cart"}
        </button>
        :

        <div className="product-quantity">
              <button
                className="product-qty-btn"
                onClick={() => handleQuantityChange(product.id,selectedVariant?.id || 0, quantity - 1)}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                className="product-qty-btn"
                onClick={() => handleQuantityChange(product.id,selectedVariant?.id || 0, quantity + 1)}
                disabled={quantity >= (selectedVariant?.stockQuantity ?? 0)}
              >
                +
              </button>
        </div>
}


      </div>
    </Link>
  );
}
