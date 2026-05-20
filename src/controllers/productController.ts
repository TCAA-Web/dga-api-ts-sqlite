import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

class ProductController {
  async getRecords(req: Request, res: Response) {
    try {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          price: true
        }
      });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  async getRecordsFromCategory(req: Request, res: Response) {
    const { slug } = req.params;
    try {
      const data = await prisma.product.findMany({
        where: {
          category: {
            slug
          }
        },
        select: {
          id: true,
          name: true,
          slug: true,
          price: true
        }
      });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  async getRecord(req: Request, res: Response) {
    const { slug } = req.params;
    try {
      const data = await prisma.product.findFirst({
        where: {
          slug
        }
      });
      if (!data) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }

  async createRecord(req: Request, res: Response) {
    const { name, image, description, price, categoryId } = req.body;
    const userId = req.user?.id;
    if (!name || !image || !description || !price || !categoryId) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    try {
      const product = await prisma.product.create({
        data: {
          name,
          image,
          description,
          price: Number(price),
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          userId: Number(userId),
          categoryId: Number(categoryId)
        }
      });
      res.status(201).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  }

  async updateRecord(req: Request, res: Response) {
    const { id } = req.params;
    const { name, image, description, price, categoryId } = req.body;
    try {
      const data = await prisma.product.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          image,
          description,
          price: Number(price),
          categoryId: Number(categoryId)
        }
      });
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  }

  async deleteRecord(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.product.delete({
        where: {
          id: Number(id)
        }
      });
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
}

export const productController = new ProductController();