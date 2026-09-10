import "./ProductFilters.css";

function ProductFilters({
    search,
    onSearchChange,
    qualityFilter,
    onQualityChange,
    products,
}) {
    const getCount = (quality) => {
        if (quality === "ALL") {
            return products.length;
        }

        return products.filter(
            (product) => product.quality === quality
        ).length;
    };

    return (
        <div className="product-filters">

            <div className="product-search">
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                />
            </div>

            <div className="quality-filters">

                <button
                    className={
                        qualityFilter === "ALL"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        onQualityChange("ALL")
                    }
                >
                    Todos ({getCount("ALL")})
                </button>

                <button
                    className={
                        qualityFilter === "G5"
                            ? "active g5"
                            : "g5"
                    }
                    onClick={() =>
                        onQualityChange("G5")
                    }
                >
                    G5 ({getCount("G5")})
                </button>

                <button
                    className={
                        qualityFilter === "PREMIUM"
                            ? "active premium"
                            : "premium"
                    }
                    onClick={() =>
                        onQualityChange("PREMIUM")
                    }
                >
                    Premium ({getCount("PREMIUM")})
                </button>

                <button
                    className={
                        qualityFilter === "IMPORTADA"
                            ? "active importada"
                            : "importada"
                    }
                    onClick={() =>
                        onQualityChange("IMPORTADA")
                    }
                >
                    Importada (
                    {getCount("IMPORTADA")})
                </button>

            </div>

        </div>
    );
}

export default ProductFilters;