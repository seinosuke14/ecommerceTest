import { Categoria } from "../models";
import Products from "../models/products";
import { Request, Response } from "express";
import { ProductImg } from "../models";


export async function getAllProducts(_req: Request, res: Response) {
  try {
    const rows = await Products.findAll({
      attributes: ["id", "nombre", "price", "sku", "discount", "url_image", "descriptions"],
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
      attributes: ["id", "nombre", "price", "sku", "discount", "url_image", "descriptions"],
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
    const { nombre, price, sku, discount, url_image, descriptions } = req.body;
    if (!nombre)
      return res.status(400).json({ error: "nombre is a required field" });
    const row = await Products.create({ nombre, price, sku, discount, url_image, descriptions });
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
