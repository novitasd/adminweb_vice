import {
    FiEdit2,
    FiTrash2,
    FiChevronUp,
    FiChevronDown,
} from "react-icons/fi";

import "./ProductTable.css";

const qualityOrder = {
    G5: 1,
    PREMIUM: 2,
    IMPORTADA: 3,
};

function ProductTable({
    products,
    onEdit,
    onDelete,
    onReorder,
}) {

    // Ordenar primero por calidad y después por sortOrder
    const sortedProducts = [...products].sort((a, b) => {
        const qualityDifference =
            (qualityOrder[a.quality] ?? 99) -
            (qualityOrder[b.quality] ?? 99);

        if (qualityDifference !== 0) {
            return qualityDifference;
        }

        return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    });


    // ==============================
    // MOVER PRODUCTO
    // ==============================

    function moveProduct(product, direction) {

        // Productos de la misma calidad
        const sameQuality = sortedProducts.filter(
            (item) => item.quality === product.quality
        );

        const currentIndex = sameQuality.findIndex(
            (item) => item.id === product.id
        );

        if (currentIndex === -1) {
            return;
        }

        const newIndex =
            direction === "up"
                ? currentIndex - 1
                : currentIndex + 1;

        // Si ya está arriba o abajo del grupo
        if (
            newIndex < 0 ||
            newIndex >= sameQuality.length
        ) {
            return;
        }

        // Crear nuevo orden del grupo
        const reorderedQuality = [...sameQuality];

        [
            reorderedQuality[currentIndex],
            reorderedQuality[newIndex],
        ] = [
            reorderedQuality[newIndex],
            reorderedQuality[currentIndex],
        ];


        // ==========================================
        // CONSERVAR EL ORDEN DE LAS OTRAS CALIDADES
        // ==========================================

        const updatedProducts = sortedProducts.map(
            (item) => {

                const newPosition =
                    reorderedQuality.findIndex(
                        (product) =>
                            product.id === item.id
                    );

                if (newPosition !== -1) {
                    return {
                        ...item,
                        sortOrder: newPosition + 1,
                    };
                }

                return item;
            }
        );


        // ==========================================
        // ENVIAR AL BACKEND
        // ==========================================

        const productsToSave = updatedProducts.map(
            (item, index) => ({
                id: item.id,
                sortOrder: index + 1,
            })
        );

        onReorder(productsToSave);
    }


    // ==============================
    // NOMBRE DE CALIDAD
    // ==============================

    function getQualityLabel(quality) {

        const labels = {
            G5: "G5",
            PREMIUM: "Premium",
            IMPORTADA: "Importada",
        };

        return labels[quality] ?? quality ?? "-";
    }


    return (
        <div className="product-table-wrapper">

            <table className="product-table">

                <thead>

                    <tr>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Categoría</th>
                        <th>Calidad</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Orden</th>
                        <th>Acciones</th>
                    </tr>

                </thead>


                <tbody>

                    {sortedProducts.map((product) => (

                        <tr key={product.id}>

                            <td data-label="Nombre">
                                {product.name}
                            </td>


                            <td data-label="Marca">
                                {product.brand?.name ?? "-"}
                            </td>


                            <td data-label="Categoría">
                                {product.category?.name ?? "-"}
                            </td>


                            <td data-label="Calidad">

                                <span
                                    className={`quality ${
                                        product.quality?.toLowerCase() ?? ""
                                    }`}
                                >
                                    {getQualityLabel(
                                        product.quality
                                    )}
                                </span>

                            </td>


                            <td data-label="Precio">
                                S/ {product.price}
                            </td>


                            <td data-label="Estado">

                                <span
                                    className={
                                        product.active
                                            ? "status active"
                                            : "status inactive"
                                    }
                                >
                                    {product.active
                                        ? "Activo"
                                        : "Inactivo"}
                                </span>

                            </td>


                            {/* =========================
                                BOTONES DE ORDEN
                            ========================= */}

                            <td
                                className="order-actions"
                                data-label="Orden"
                            >

                                <button
                                    type="button"
                                    className="icon-btn reorder"
                                    onClick={() =>
                                        moveProduct(
                                            product,
                                            "up"
                                        )
                                    }
                                    title="Subir"
                                >
                                    <FiChevronUp />
                                </button>


                                <button
                                    type="button"
                                    className="icon-btn reorder"
                                    onClick={() =>
                                        moveProduct(
                                            product,
                                            "down"
                                        )
                                    }
                                    title="Bajar"
                                >
                                    <FiChevronDown />
                                </button>

                            </td>


                            {/* =========================
                                ACCIONES
                            ========================= */}

                            <td
                                className="actions"
                                data-label="Acciones"
                            >

                                <button
                                    type="button"
                                    className="icon-btn edit"
                                    onClick={() =>
                                        onEdit(product)
                                    }
                                    title="Editar"
                                >
                                    <FiEdit2 />
                                </button>


                                <button
                                    type="button"
                                    className="icon-btn delete"
                                    onClick={() =>
                                        onDelete(product)
                                    }
                                    title="Eliminar"
                                >
                                    <FiTrash2 />
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ProductTable;