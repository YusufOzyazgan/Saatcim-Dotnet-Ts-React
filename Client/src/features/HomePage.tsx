import { Box } from "@mui/material"



export default function HomePage() {
  return (

    <>



      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        {/* <Typography variant="h1">Saatçim</Typography>
        <Typography variant="subtitle1">Türkiyenin en kaliteli dijital saat satışı platformu</Typography> */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="../assets/saatcim_logo2.png"
            width={850}
            style={{ height: "auto", display: "block" }}
            alt="Saatçim Logo"
          />
        </Box>


      </Box>
    </>
  );
}