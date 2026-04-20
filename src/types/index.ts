export type Item = {
  id: number;
  name: string;
  price: number;
};

export type ItemCreate = Omit<Item, "id">;
