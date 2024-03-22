import { useEffect, useState } from "react";
import { IProduct, DefProduct } from "../Models/Product";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ProductServices from "../Services/ProductServices";
import React from "react";

export interface IProductForm {
  itemID: number;
  onClose: (saved: boolean) => void;
}

export default function ProductForm(props: IProductForm) {
  const [item, setItem] = useState<IProduct>(DefProduct);

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imgUrlError, setImageUrlError] = useState("");

  const SVC = new ProductServices();

  useEffect(() => {
    props.itemID === 0 ? setItem(DefProduct) : GetItem(props.itemID);
  }, [props.itemID]);

  const Validate = () => {
    let valid = true;
    if (item.prodName === "") {
      setNameError("Nome prodotto obbligatorio");
      valid = false;
    }
    if (item.prodDescription === "") {
      setDescriptionError("Descrizione obbligatoria");
      valid = false;
    }
    if (item.prodPrice === 0) {
      setPriceError("Prezzo obbligatorio");
      valid = false;
    }
    if (item.prodImageUrl === "") {
      setImageUrlError("Url immagine obbligatorio");
      valid = false;
    }
    return valid;
  };

  const ResetErrors = () => {
    setNameError("");
    setDescriptionError("");
    setPriceError("");
    setImageUrlError("");
  };

  const GetItem = (id: number) => {
    const item: IProduct = SVC.GetProduct(id);
    setItem(item);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ResetErrors();
    const value: string = event.target.value;
    item && setItem({ ...item, prodName: value });
  };
  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ResetErrors();
    const value: string = event.target.value;
    item && setItem({ ...item, prodDescription: value });
  };
  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ResetErrors();
    const value: number = Number(event.target.value);
    item && setItem({ ...item, prodPrice: value });
  };
  const onImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ResetErrors();
    const value: string = event.target.value;
    item && setItem({ ...item, prodImageUrl: value });
  };

  const onSave = () => {
    if (Validate()) {
      if (item.prodID !== 0) {
        SVC.ProductUpdate(item);
      } else {
        SVC.ProductAdd(item);
      }
      props.onClose(true);
    }
  };
  const onClose = () => {
    props.onClose(false);
  };

  return (
    <>
      <DialogTitle>
        <Grid item xs={12} marginTop={1}>
          <Typography variant="h5">
            {item.prodName === "" ? "Nuovo prodotto" : item.prodName}
          </Typography>{" "}
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="prodName"
              label="Nome prodotto"
              value={item.prodName}
              onChange={onNameChange}
              error={nameError !== ""}
              helperText={nameError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="prodDescription"
              label="Descrizione"
              value={item.prodDescription}
              onChange={onDescriptionChange}
              error={descriptionError !== ""}
              helperText={descriptionError}
            />{" "}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              id="prodPrice"
              label="Prezzo"
              value={item.prodPrice}
              onChange={onPriceChange}
              error={priceError !== ""}
              helperText={priceError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="prodImageUrl"
              label="Url immagine"
              value={item.prodImageUrl}
              onChange={onImgUrlChange}
              error={imgUrlError !== ""}
              helperText={imgUrlError}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => onSave()}>
          Salva
        </Button>
        <Button variant="contained" color="secondary" onClick={() => onClose()}>
          Annulla
        </Button>
      </DialogActions>

      {/* <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "600px",
          padding: "16px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ paddingLeft: 1 }}>
              {item.prodName === "" ? "Nuovo prodotto" : item.prodName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="prodName"
              label="Nome prodotto"
              value={item.prodName}
              onChange={onNameChange}
              error={nameError !== ""}
              helperText={nameError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="prodDescription"
              label="Descrizione"
              value={item.prodDescription}
              onChange={onDescriptionChange}
              error={descriptionError !== ""}
              helperText={descriptionError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              id="prodPrice"
              label="Prezzo"
              value={item.prodPrice}
              onChange={onPriceChange}
              error={priceError !== ""}
              helperText={priceError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="prodImageUrl"
              label="Url immagine"
              value={item.prodImageUrl}
              onChange={onImgUrlChange}
              error={imgUrlError !== ""}
              helperText={imgUrlError}
            />
          </Grid>
        </Grid>
      </Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          paddingLeft: 2,
          paddingBottom: 1,
          paddingTop: 1,
          position: "fixed",
          bottom: 0,
          backgroundColor: "whitesmoke",
          zIndex: 1000,
          width: "100%",
          borderTop: "1px solid silver",
        }}
      >
        <Button variant="contained" color="primary" onClick={() => onSave()}>
          Salva
        </Button>
        <Button variant="contained" color="secondary" onClick={() => onClose()}>
          Chiudi
        </Button>
      </Stack> */}
    </>
  );
}
