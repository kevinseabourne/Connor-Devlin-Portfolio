import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import AdminSidebar from "../../components/AdminSidebar";
import { getCurrentUser } from "../api/auth";

const Admin = () => {
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
