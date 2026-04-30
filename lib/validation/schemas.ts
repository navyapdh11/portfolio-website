import { z } from "zod";

export const BookingSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(8, "Phone number too short").max(20),
  service: z.string().min(1, "Service is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
});

export const QuoteSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Invalid email format"),
  customerPhone: z.string().optional(),
  service: z.string().min(1, "Service is required"),
  bedrooms: z.number().nonnegative().optional(),
  bathrooms: z.number().nonnegative().optional(),
  frequency: z.string().optional(),
  addons: z.array(z.string()).optional(),
  estimatedPrice: z.number().nonnegative().optional(),
  suburb: z.string().optional(),
  state: z.string().optional(),
});

export const CustomerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(8, "Phone number too short"),
  addresses: z.array(z.string()).optional(),
});

export const ServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  icon: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  basePrice: z.number().nonnegative(),
  category: z.string().optional(),
  available: z.boolean().optional(),
  stock: z.number().nonnegative().optional(),
});

export const GallerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL"),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});
