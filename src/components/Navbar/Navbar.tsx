import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    AppBar,
    Box, Button,
    Container,
    IconButton,
    Menu, MenuItem,
    Toolbar
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { logout } from "../../store/authReducer/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import LoginModal from "../LoginModal/LoginModal";

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const { isAuthorized } = useAppSelector((state) => state.authReducer);
    const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleLogoutClick = () => {
        dispatch(logout());
    };

    const handleModalClose = () => {
        setIsLoginModalOpen(false);
    };

    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left"
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" }
                                }}
                            >
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to={"/"}>{t("Home")}</Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to={"/news"}>{t("News")}</Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    {isAuthorized ?
                                        <Link to={"/profile"}>{t("Profile")}</Link> :
                                        <Button variant="contained" onClick={handleLoginClick}>{t("Login")}</Button>}
                                </MenuItem>
                                {isAuthorized && <MenuItem onClick={handleCloseNavMenu}>
                                    <Button variant="contained" onClick={handleLogoutClick}>{t("Logout")}</Button>
                                </MenuItem>}
                                <MenuItem>
                                    {i18n.resolvedLanguage !== "uk" &&
                                        <Button variant="contained" sx={{ width: "100%" }}
                                                onClick={() => i18n.changeLanguage("uk")}>
                                            ua
                                        </Button>}
                                    {i18n.resolvedLanguage !== "en" &&
                                        <Button variant="contained" sx={{ width: "100%" }}
                                                onClick={() => i18n.changeLanguage("en")}>
                                            en
                                        </Button>}
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Box sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex", gap: "10px", alignItems: "center" }
                        }}>
                            <Link to={"/"} style={{ color: "white" }}>{t("Home")}</Link>
                            <Link to={"/news"} style={{ color: "white" }}>{t("News")}</Link>
                            {isAuthorized ?
                                <Link to={"/profile"} style={{ color: "white" }}>{t("Profile")}</Link> :
                                <Button variant="contained" sx={{ backgroundColor: "white", color: "black" }}
                                        onClick={handleLoginClick}>{t("Login")}</Button>}
                            {isAuthorized &&
                                <Button variant="contained" sx={{ backgroundColor: "white", color: "black" }}
                                        onClick={handleLogoutClick}>{t("Logout")}</Button>}
                            {i18n.resolvedLanguage !== "uk" &&
                                <Button variant="contained"
                                        sx={{ backgroundColor: "white", color: "black", justifySelf: "flex-end" }}
                                        onClick={() => i18n.changeLanguage("uk")}>
                                    ua
                                </Button>}
                            {i18n.resolvedLanguage !== "en" &&
                                <Button variant="contained"
                                        sx={{ backgroundColor: "white", color: "black", justifySelf: "flex-end" }}
                                        onClick={() => i18n.changeLanguage("en")}>
                                    en
                                </Button>}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <LoginModal isOpen={isLoginModalOpen} handleClose={handleModalClose} />
        </>
    );
};

export default Navbar;