import React, { ComponentProps, ForwardedRef, forwardRef } from "react";
import NextLink from "next/link";

type LinkProps = ComponentProps<"a">;

const Link = (
  { href, ...others }: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) => (
  <NextLink href={href ?? "#"}>
    <a ref={ref} {...others} target="_blank" rel="noreferrer noopener" />
  </NextLink>
);

export default forwardRef(Link);
