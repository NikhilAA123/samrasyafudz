import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/catalog";
import type { Product, ProductVariant } from "../api/types";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const { addItem, updateQuantity } = useCart();
  const { user, openLogin } = useAuth();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProductById(Number(id))
      .then((p) => {
        setProduct(p);
        if (p.variants && p.variants.length > 0) {
          setSelectedVariant(p.variants[0]);
        }
      })
      .catch(() => setError("This product could not be found."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container"><p className="home-status">Loading…</p></div>;

  if (error || !product) {
    return (
      <div className="container product-detail-error">
        <p className="error-text">{error ?? "Product not found."}</p>
        <Link to="/" className="btn-secondary">Back to shop</Link>
      </div>
    );
  }

  const hasVariants = product.variants && product.variants.length > 0;
  const outOfStock = selectedVariant ? selectedVariant.stockQuantity <= 0 : true;

  function handleVariantChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const variantId = Number(e.target.value);
    const variant = product?.variants?.find((v) => v.id === variantId) ?? null;
    setSelectedVariant(variant);
    setAddedMessage(null);
    setQuantity(0);
  }

  async function handleAddToCart() {
    if (!user) {
      openLogin();
      return;
    }
    if (!selectedVariant) return;

    setAddingToCart(true);
    setError(null);
    setAddedMessage(null);
    try {
      await addItem(product!.id, selectedVariant.id, 1);
      setQuantity(1);
      setAddedMessage("Added to cart.");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not add to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  }

  async function handleQuantityChange(variantId: number, quantity: number) {
    if (quantity < 1) return;
    setError(null);
    setAddedMessage(null);
    try {
      await updateQuantity(product!.id, variantId, quantity);
      setQuantity(quantity);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not update quantity.");
    }
  }

  return (
    <div className="container product-detail">
      <Link to="/" className="product-detail-back">← Back to shop</Link>

      <div className="product-detail-grid">
        <div className="product-detail-image">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="product-card-placeholder">No image yet</div>
          )}
        </div>

        <div className="product-detail-info">
          <span className="product-card-category">{product?.category?.name}</span>
          <h1>{product?.name}</h1>

          {hasVariants ? (
            <>
              <div className="product-detail-variant-select">
                <label htmlFor="variant">Weight</label>
                <select id="variant" value={selectedVariant?.id ?? ""} onChange={handleVariantChange}>
                  {product.variants && product.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.weightGrams}g — ₹{v.price.toFixed(0)}
                    </option>
                  ))}
                </select>
              </div>

              <p className="product-detail-price">₹{selectedVariant?.price.toFixed(0)}</p>

              <div className="product-detail-stock">
                {outOfStock ? (
                  <span className="error-text">Currently out of stock</span>
                ) : (
                  <span>{selectedVariant?.stockQuantity} in stock</span>
                )}
              </div>
            </>
          ) : (
            <p className="error-text" style={{ marginTop: 16 }}>
              No sizes available for this product yet.
            </p>
          )}

          <p className="product-detail-description">
            {product.description || "No description added yet."}
          </p>

          {error && <p className="error-text">{error}</p>}
          {addedMessage && <p className="product-detail-added">{addedMessage}</p>}

          {quantity === 0 ? (
            <button
              className="btn-primary"
              disabled={outOfStock || !hasVariants || addingToCart}
              onClick={handleAddToCart}
              style={{ marginTop: 20 }}
            >
              {outOfStock ? "Sold out" : addingToCart ? "Adding…" : "Add to cart"}
            </button>
          ) : (
            <div className="product-detail-quantity" style={{ marginTop: 20 }}>
              <button
                className="product-qty-btn"
                onClick={() => handleQuantityChange(selectedVariant?.id ?? 0, quantity - 1)}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                className="product-qty-btn"
                onClick={() => handleQuantityChange(selectedVariant?.id ?? 0, quantity + 1)}
                disabled={quantity >= (selectedVariant?.stockQuantity ?? 0)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}