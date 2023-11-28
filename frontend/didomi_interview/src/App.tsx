import './App.css';
import { useLocation, Route } from "wouter";
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import ViewListIcon from '@mui/icons-material/ViewList';
import ConsentForm from './pages/ConsentForm';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ConsentList from './pages/ConsentList';

const drawerWidth = 240;

function App() {
  const [, setLocation] = useLocation();

  return (
    <div className="App">

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {
              setLocation("/")
            }}>
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary="consent List" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => {
              setLocation("/give-consent")
            }}>
              <ListItemIcon>
                <PrivacyTipIcon />
              </ListItemIcon>
              <ListItemText primary="Give Consent" />
            </ListItemButton>
          </ListItem>
        </List>

      </Drawer >
      <Route path="/" component={ConsentList} />
      <Route path="/give-consent" component={ConsentForm} />

    </div >
  );
}

export default App;