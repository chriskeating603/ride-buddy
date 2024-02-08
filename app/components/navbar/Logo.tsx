'use client';

import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const LogoWrapper = styled.div`
  width: 100px; /* Default width for larger screens */
  height: 100px; /* Default height for larger screens */

  @media (max-width: 767px) {
    width: 50px; /* Width for small screens */
    height: 50px; /* Height for small screens */
  }
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Logo = () => {
  const router = useRouter();

  return (
    <LogoWrapper onClick={() => router.push('/')}>
      <LogoImage alt='Logo' src="/images/ride_buddy_logo.png" />
    </LogoWrapper>
  );
}

export default Logo;
