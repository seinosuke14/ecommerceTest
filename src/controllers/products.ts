import { Categoria, Productoxcategoria } from "../models";
import Products from "../models/products";
import { Request, Response } from "express";
import { ProductImg } from "../models";
import { sequelize } from "../config/db";


export async function getAllProducts(_req: Request, res: Response) {
  try {
    const rows = await Products.findAll({
      attributes: ["id", "nombre", "price", "sku", "discount", "descriptions"],
      include: [{
        model: Categoria,
        as: "categorias",
        through: { attributes: [] }
      },
      {
        model: ProductImg,
        as: "imagenes",
        attributes: ["id", "url_image", "orden", "es_principal"],

      }
      ],
      order: [[{ model: ProductImg, as: 'imagenes' }, 'orden', 'ASC']]
    });
    res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getByIdProducts(req: Request, res: Response) {
  try {
    const row = await Products.findByPk(req.params.id, {
      attributes: ["id", "nombre", "price", "sku", "discount", "descriptions"],
      include: [
        {
          model: Categoria,
          as: "categorias",
          through: { attributes: [] }
        },
        {
          model: ProductImg,
          as: "imagenes", // ✅ Agrega esto
          attributes: ["id", "url_image", "orden", "es_principal"]
        }
      ],
      order: [
        [{ model: ProductImg, as: 'imagenes' }, 'orden', 'ASC']
      ]
    });
    if (!row) return res.sendStatus(404);
    res.json(row);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function PostProducts(req: Request, res: Response) {
  try {
    const { nombre, price, sku, discount, descriptions } = req.body;
    if (!nombre)
      return res.status(400).json({ error: "nombre is a required field" });
    const row = await Products.create({ nombre, price, sku, discount, descriptions });
    res.status(201).json(row);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
export async function PutProducts(req: Request, res: Response) {
  try {
    const row = await Products.findByPk(req.params.id);
    if (!row) return res.sendStatus(404);
    await row.update(req.body);
    res.json(row);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
export async function DeletebyId(req: Request, res: Response) {
  try {
    const n = await Products.destroy({ where: { id: req.params.id } });
    res.status(n ? 204 : 404).end();
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function bulkCreateProduct(req: Request, res: Response) {
  const { productos } = req.body;

  if (!Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: "Debes enviar un array de productos." });
  }

  const t = await sequelize.transaction();

  try {
    const productosCreated = [];

    for (const prod of productos) {
      // 1. Crear producto base
      const nuevoProducto = await Products.create(
        {
          nombre: prod.nombre,
          price: prod.price,
          sku: prod.sku,
          discount: prod.discount,
          descriptions: prod.descriptions
        },
        { transaction: t }
      );

      // 2. Insertar categorías manualmente (evita error de TS con setCategorias)
      if (Array.isArray(prod.categorias)) {
        const rowsPivot = prod.categorias.map((idCat: number) => ({
          producto_id: nuevoProducto.id,
          categoria_id: idCat
        }));

        await Productoxcategoria.bulkCreate(rowsPivot, { transaction: t });
      }
      // 3. Guardar para retornar
      productosCreated.push(nuevoProducto);

      if (Array.isArray(prod.productimg)) {
        const rowsPivot = prod.productimg.map((img: any) => ({
          product_id: nuevoProducto.id,
          url_image: img.url_image,
          orden: img.orden,
          es_principal: img.es_principal
        }));

        await ProductImg.bulkCreate(rowsPivot, { transaction: t });
      }
    }



    await t.commit();

    return res.status(201).json({
      message: "Carga masiva completada",
      productos: productosCreated
    });

  } catch (error) {
    await t.rollback();
    console.error("Error en carga masiva:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
