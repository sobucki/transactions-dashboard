"use client";

import { Container } from "./styles";
import Sidebar from "./components/sidebar";
import Content from "./components/content";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = Cookies.get("auth") === "true";
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  return (
    <Container>
      <Sidebar />
      <Content />
    </Container>
  );
};

export default DashboardPage;
