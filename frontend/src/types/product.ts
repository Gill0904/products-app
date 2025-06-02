export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  status: "available" | "out_of_stock" | "discontinued";
  createdAt: Date;
  updatedAt: Date;
}