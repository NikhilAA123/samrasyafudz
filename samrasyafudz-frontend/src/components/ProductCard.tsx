import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product, ProductVariant } from "../api/types";
import "./ProductCard.css";

export default function ProductCard({ product }: { product: Product }) {
  const hasVariants = product.variants && product.variants.length > 0;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    hasVariants ? product.variants?.[0] ?? null : null
  );

  function handleVariantChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const variant = product.variants?.find((v) => v.id === Number(e.target.value)) ?? null;
    setSelectedVariant(variant);
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

      </div>
    </Link>
  );
}