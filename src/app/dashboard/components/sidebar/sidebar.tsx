"use client";

import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  ListItemButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { Home, Logout, Menu } from "@mui/icons-material";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

function Sidebar() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    Cookies.remove("auth");
    router.push("/login");
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            onClick={() => router.push("/dashboard")}
          />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" onClick={handleLogout} />
        </ListItemButton>
      </List>
    </div>
  );
  return (
    <>
      {isMobile ? (
        <>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" noWrap>
                Meu Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      )}
    </>
  );
}

export default Sidebar;
