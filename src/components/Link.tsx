import React, { ComponentProps } from "react";
import NextLink from "next/link";

type LinkProps = ComponentProps<"a">;

const Link = ({ href, ...others }: LinkProps) => (
  <NextLink href={href ?? "#"}>
    <a {...others} target="_blank" rel="noreferrer noopener" />
  </NextLink>
);

export default Link;
