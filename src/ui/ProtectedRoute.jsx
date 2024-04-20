import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  //* 1) Load authenticated user
  const { isFetching, isAuthenticated } = useUser();
  const navigate = useNavigate();

  //* 2) If there is no authenticated user -> redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isFetching) {
      navigate("/login");
    }
  }, [isAuthenticated, isFetching, navigate]);

  //* 3) While loadingg, show spinner
  if (isFetching)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //* 4) If there is authenticated user -> render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
