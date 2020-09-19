import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import AppContext from "../../context/appContext";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminSidebar from "../../components/AdminSidebar";
import { getCurrentUser } from "../api/auth";

const Admin = () => {
  const context = useContext(AppContext);
  const { handleSignOut } = context;
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // localStorage cannot be accessed until the component has mounted
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (!currentUser) {
      router.push("/login");
    }
  }, []);

  return !user ? null : (
    <Container>
      <AdminSidebar />
      <input type="file" />
    </Container>
  );
};

export default Admin;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
