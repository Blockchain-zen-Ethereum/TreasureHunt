import { useEffect, useState } from "react";
import {
  Container,
  Box,
  IconButton,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Create({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [selectedToken, setSelectedToken] = useState<string>('token');
  const [innerHeight, setInnerHeight] = useState<string>("0px");

  useEffect(() => {
    setInnerHeight(window.innerHeight.toString() + "px");
  }, []);

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setSelectedToken(value);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          paddingX: "1rem",
          paddingY: "0.375rem",
        }}
      >
        <IconButton
          aria-label="menu"
          sx={{
            color: "#7B869A",
            width: "2rem",
            height: "2rem",
            padding: 0,
            margin: 0,
          }}
        >
          <MenuIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      </Box>
      <Container style={{height:"100%"}}>
        <Typography variant="h4" component="div" margin="20px 0" fontWeight="500">
          Create
        </Typography>

        <Box margin="20px 0">
          <FormControl fullWidth>
            <FormLabel id="create-group-label">Price Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="create-group-label"
              name="create-group"
              onChange={handleTokenChange}
              defaultValue={selectedToken}
            >
              <FormControlLabel value="token" control={<Radio />} label="Token" />
              <FormControlLabel value="nft" control={<Radio />} label="NFT" />
            </RadioGroup>
          </FormControl>
        </Box>

        { selectedToken === 'token' && <>
          <Box margin="20px 0">
            <FormControl fullWidth>
              <FormLabel id="select-token-label">Select your token</FormLabel>
              <Select
                labelId="select-token-label"
                id="select-token"
                // value={1}
                label="token"
                aria-labelledby="select-token-label"
                // onChange={handleChange}
              >
                <MenuItem value={1}>ETH</MenuItem>
                <MenuItem value={2}>BTC</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box margin="20px 0">
            <FormControl fullWidth>
              <FormLabel id="amount-input-label">Amount</FormLabel>
              <TextField id="amount-input" type="number" />
            </FormControl>
          </Box>
        </>}

        { selectedToken === 'nft' && <>
          <Box margin="20px 0">
            <FormControl fullWidth>
              <FormLabel id="select-nft-token-label">Select your token</FormLabel>
              <Select
                labelId="select-nft-token-label"
                id="select-nft-token"
                // value={1}
                label="nft-token"
                aria-labelledby="select-nft-token-label"
                // onChange={handleChange}
              >
                <MenuItem value={1}>AZUKI</MenuItem>
                <MenuItem value={2}>BAYC</MenuItem>
                <MenuItem value={2}>CryptoPunks</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box margin="20px 0">
            <FormControl fullWidth>
              <FormLabel id="nft-id-input-label">NFT ID</FormLabel>
              <TextField id="nft-id-input" type="number" />
            </FormControl>
          </Box>
        </>}
        <Box style={{position:'absolute',bottom:'20px'}}>
          <Button variant="contained" disableElevation color="info" style={{width:'350px'}}>
            CREATE
          </Button>
        </Box>
      </Container>
    </>
  );
}
