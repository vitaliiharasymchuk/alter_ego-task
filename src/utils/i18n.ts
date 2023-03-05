import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        resources: {
            en: {
                translation: {
                    Home: "Home",
                    News: "News",
                    Profile: "Profile",
                    Login: "Login",
                    Logout: "Logout"
                }
            },
            uk: {
                translation: {
                    Home: "Домашня",
                    News: "Новини",
                    Profile: "Профіль",
                    Login: "Логін",
                    Logout: "Вийти"
                }
            }
        }
    });