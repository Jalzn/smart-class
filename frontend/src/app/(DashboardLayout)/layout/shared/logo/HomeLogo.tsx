import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "90px",
  width: "200px",
  overflow: "hidden",
  display: "block",
  marginLeft:"30px",
  marginTop:"20px"
}));

const HomeLogo = () => {
  return (
    <LinkStyled href="/">
      <Image src="/images/logos/light-logo.svg" alt="logo" height={70} width={200} priority />
    </LinkStyled>
  );
};

export default HomeLogo;
  