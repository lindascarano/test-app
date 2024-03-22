import { IProduct } from "../Models/Product";

export default class ProductServices {
  ProductAdd(product: IProduct) {
    const list: IProduct[] = this.GetProductList();
    const newID: number= Math.max(...list.map(o => o.prodID), 0) + 1;
    product.prodID = newID;
    list.push(product);
    this.UpdateList(list);
  }

  ProductUpdate(product: IProduct) {

    const list: IProduct[] = this.GetProductList();
    const newList: IProduct[] = [];
    list.forEach((item) => {
      if (item.prodID === product.prodID) {
        newList.push(product);
      }
      else{
        newList.push(item);
      }
    });
       
    this.UpdateList(newList);
  }

  ProductDelete(productID: number) {
    let list: IProduct[] = this.GetProductList();
    list = list.filter((item) => item.prodID !== productID);
    this.UpdateList(list);
  }

  GetProduct(productID: number) {
    let list: IProduct[] = this.GetProductList();
    list = list.filter((item) => item.prodID === productID);
    return list[0] ?? {};
  }

  GetProductList() {
    const list: string = localStorage.getItem("products") ?? "";
    return list === "" ? [] : JSON.parse(list);
  }

  UpdateList = (list: IProduct[]) => {
    localStorage.setItem("products", JSON.stringify(list));
  };
}
