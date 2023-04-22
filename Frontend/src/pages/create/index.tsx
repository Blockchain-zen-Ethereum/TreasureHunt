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
import { SelectChangeEvent } from '@mui/material/Select';

export default function Create({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [innerHeight, setInnerHeight] = useState<string>("0px");

  useEffect(() => {
    setInnerHeight(window.innerHeight.toString() + "px");
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="div">
        Create
      </Typography>
      <FormControl fullWidth>
        <FormLabel id="create-group-label">Price Type</FormLabel>
        <RadioGroup
          row
          aria-labelledby="create-group-label"
          name="create-group"
        >
          <FormControlLabel value="token" control={<Radio />} label="Token" />
          <FormControlLabel value="nft" control={<Radio />} label="NFT" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel id="select-token-label">Select your token</FormLabel>
        <Select
          labelId="select-token-label"
          id="select-token"
          value={1}
          label="token"
          aria-labelledby="select-token-label"
          // onChange={handleChange}
        >
          <MenuItem value={1}>ETH</MenuItem>
          <MenuItem value={2}>BTC</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel id="amount-input-label">Amount</FormLabel>
        <TextField id="amount-input" type="number" />
      </FormControl>

    </Container>
  );
}
