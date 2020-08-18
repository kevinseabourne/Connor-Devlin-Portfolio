import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import AppContext from "../context/appContext";
import { useRouter } from "next/router";
import Link from "next/link";

const Admin = (props) => {
  const context = useContext(AppContext);
  const { currentUser, handleSignOut } = context;
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser]);

  return !currentUser ? (
    ""
  ) : (
    <Container>
      <Title>Admin Page</Title>
      <Link href="/login">
        <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
      </Link>
    </Container>
  );
};

export default Admin;

const Container = styled.div``;

const Title = styled.h1``;

const SignOutButton = styled.button``;
