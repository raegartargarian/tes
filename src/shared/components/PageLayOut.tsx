// src/shared/components/PageLayOut.tsx
import { GlobalSelectors } from "@/containers/global/selectors";
import React from "react";
import { useSelector } from "react-redux";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PurchaseModal } from "./PurchaseModal";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const authData = useSelector(GlobalSelectors.authData);

  return (
    <div className="flex flex-col min-h-screen u-bg">
      {authData ? (
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-grow pt-20">{children}</main>
          <Footer />
          <PurchaseModal />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PageLayout;
