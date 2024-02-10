"use client";
import { useQuery, gql } from "@apollo/client";
import { simplifyResponse } from "@/lib/simplify-response";
import config from "@/config/config";

const query = gql`
  query {
    logo {
      data {
        attributes {
          icon {
            data {
              attributes {
                url
              }
            }
          }

          text {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = "flex-shrink-0",
  imgLight = "",
}) => {
  let { data, loading, error } = useQuery(query);

  if (!loading) {
    data = simplifyResponse(data);
  }

  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {!loading ? (
        <Image
          className={`block h-8 sm:h-10 w-auto ${
            imgLight ? "dark:hidden" : ""
          }`}
          src={config.serverUrl + data.text.url}
          alt="Logo"
          width={200}
          height={300}
          sizes="200px"
          priority
        />
      ) : (
        ""
      )}
      {imgLight && (
        <Image
          className="hidden h-8 sm:h-10 w-auto dark:block"
          src={imgLight}
          alt="Logo-Light"
          sizes="200px"
          priority
        />
      )}
    </Link>
  );
};

export default Logo;
