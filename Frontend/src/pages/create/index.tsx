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
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HistoryIcon from '@mui/icons-material/History';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentPaste from '@mui/icons-material/ContentPaste';
import { useRouter } from "next/router";

export default function Create({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [selectedToken, setSelectedToken] = useState<string>('token');
  const [innerHeight, setInnerHeight] = useState<string>("0px");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    setInnerHeight(window.innerHeight.toString() + "px");
  }, []);

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setSelectedToken(value);
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleHome = () => {
    router.push("/");
  };

  const handleCreate = () => {
    router.push("/create");
  };

  const handleHistory = () => {
    router.push("/treasure-board");
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
        <Button 
          onClick={handleShowMenu}
          aria-label="menu"
          sx={{
            minWidth: "2rem",
            color: "#7B869A",
            width: "2rem",
            height: "2rem",
            padding: 0,
            margin: 0,
          }}
        >
          { !showMenu && <MenuIcon sx={{ fontSize: "2rem" }} /> }
          { showMenu && <CloseIcon sx={{ fontSize: "2rem" }} /> }
        </Button>
      </Box>
      { showMenu && <Paper sx={{ width: '100%', maxWidth: '100%' }}>
        <MenuList>
          <MenuItem sx={{
              margin: '20px 0',
            }}
            onClick={handleHome}
          >
            <ListItemIcon>
              <HomeIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </MenuItem>
          <MenuItem sx={{
              margin: '20px 0',
            }}
            onClick={handleCreate}
          >
            <ListItemIcon>
              <AddCircleIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Create</ListItemText>
          </MenuItem>
          <MenuItem sx={{
            margin: '20px 0',
          }} disabled>
            <ListItemIcon>
              <ContentPaste fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Stake</ListItemText>
          </MenuItem>
          <MenuItem sx={{
              margin: '20px 0',
            }}
            onClick={handleHistory}
          >
            <ListItemIcon>
              <HistoryIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Personal History</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>}
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
