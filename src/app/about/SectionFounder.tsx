"use client";
import { useQuery, gql } from "@apollo/client";
import { simplifyResponse } from "@/lib/simplify-response";
import config from "@/config/config";

import Heading from "@/components/Heading/Heading";
import React, { use } from "react";
import NcImage from "@/shared/NcImage/NcImage";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
}

const query = gql`
  query {
    about {
      data {
        attributes {
          people {
            id
            name
            job
            avatar {
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
  }
`;

const SectionFounder = ({ people }: { people: People[] }) => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading
        desc="We’re impartial and independent, and every day we create distinctive,
          world-class programmes and content"
      >
        ⛱ Founder
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {people!.map((item: any) => (
          <div key={item.id} className="max-w-sm">
            <NcImage
              alt=""
              fill
              sizes="300px"
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
              className="absolute inset-0 object-cover"
              src={config.serverUrl + item.avatar.url}
            />
            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
              {item.name}
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFounder;
