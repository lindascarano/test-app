import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";

// import { Link } from "react-router-dom";

const pages = ["e-commerce", "products"];

export default function Navbar() {
  return (
    <AppBar position="static">
      <Container>
        {/* Toolbar : mette tutto il menu su di una sola riga - disablegutter: elimina lo spazio tra gli elementi della barra*/}
        <Toolbar disableGutters>
          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            Responsive cell
          </Box> */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
