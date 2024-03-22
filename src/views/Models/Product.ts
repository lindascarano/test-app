export interface IProduct {
  prodID: number;
  prodName: string;
  prodDescription: string;
  prodPrice: number;
  prodImageUrl: string;
}

export const DefProduct: IProduct = {
  prodID: 0,
  prodName: "",
  prodDescription: "",
  prodPrice: 0,
  prodImageUrl: "",
};
