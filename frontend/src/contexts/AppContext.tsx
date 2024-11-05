import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface HTMLHeadType {
  title: string;
  description: string;
}

const MAP_PAGE_HEAD: Record<string, HTMLHeadType> = {
  "/": {
    title: "Socme | Feed",
    description: "Feed page for Socme Moza Social Media app",
  },
  "/profile": {
    title: "Socme | Profile",
    description: "Profile page for a user",
  },
  "/auth/signup": {
    title: "Socme | Signup",
    description: "Sign up page for Socme Moza Social Media app",
  },
  "/auth/login": {
    title: "Socme | Login",
    description: "Log in page for Socme Moza Social Media app",
  },
  "*": {
    title: "Socme | 404",
    description: "Page not found on Socme Moza Social Media app",
  },
};

const AppContext = createContext<HTMLHeadType | null>(null);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContectProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  useEffect(() => {
    const htmlHead: Partial<HTMLHeadType> = MAP_PAGE_HEAD[
      location.pathname
    ] || {
      title: "Socme | 404",
    };
    document.title = htmlHead.title!;
  }, [location]);

  const value: HTMLHeadType = {
    title: "",
    description: "",
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
