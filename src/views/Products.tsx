import { Button, Dialog, Typography } from "@mui/material";
import ProductForm from "./Components/ProductForm";
import { useEffect, useState } from "react";
import { IProduct } from "./Models/Product";
import ProductServices from "./Services/ProductServices";

export default function Products() {
  const [itemID, setItemID] = useState(0);
  const [itemShown, showItem] = useState(false);
  const [itemList, setItemList] = useState<IProduct[]>([]);

  const SVC = new ProductServices();

  useEffect(() => {
    GetList();
  }, []);

  const GetList = () => {
    const list: IProduct[] = SVC.GetProductList();
    setItemList(list);
  };

  const onItemClose = (saved: boolean) => {
    showItem(false);
    if (saved) {
      const list: IProduct[] = SVC.GetProductList();
      setItemList(list);
    }
  };

  const onItemDelete = (itemID: number) => {
    SVC.ProductDelete(itemID);
    GetList();
  };
  const onItemUpdate = (itemID: number) => {
    setItemID(itemID);
    showItem(true);
  };
  const onItemAdd = () => {
    setItemID(0);
    showItem(true);
  };
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Strumenti musicali
      </Typography>
      <Button variant="contained" color="primary" onClick={() => onItemAdd()}>
        Aggiungi strumento
      </Button>
      <table style={{ width: "1080px", marginTop: "64px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrizione</th>
            <th>Prezzo</th>
            <th>Immagine</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item, index) => (
            <tr key={index}>
              <td>{item.prodID}</td>
              <td>{item.prodName}</td>
              <td>{item.prodDescription}</td>
              <td>{item.prodPrice}</td>
              <td>
                <img src={item.prodImageUrl} alt={item.prodName} width="100" />
              </td>
              <td>
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={() => onItemUpdate(item.prodID)}
                >
                  Modifica
                </Button>
                <Button
                  style={{ marginLeft: "16px" }}
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => onItemDelete(item.prodID)}
                >
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={itemShown} onClose={() => showItem(true)}>
        <ProductForm
          itemID={itemID}
          onClose={(saved: boolean) => onItemClose(saved)}
        />
      </Dialog>
    </>
  );
}
