"use client";

import config from "@/config/config";

import rightImg from "@/images/hero-right1.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import SectionPromo3 from "@/components/SectionPromo3";

import { useQuery, gql } from "@apollo/client";
import { simplifyResponse } from "@/lib/simplify-response";

const query = gql`
  query {
    people {
      data {
        attributes {
          people {
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

    about {
      data {
        attributes {
          text
          rightImg {
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

const PageAbout = ({}) => {
  let { data, loading, error } = useQuery(query);
  if (!loading) {
    data = simplifyResponse(data);
    console.log(data);
  }

  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        {!loading ? (
          <SectionHero
            rightImg={
              !loading ? config.serverUrl + data.about.rightImg.url : ""
            }
            heading="👋 About Us."
            btnText=""
            subHeading={!loading ? data.about.text : ""}
          />
        ) : (
          <></>
        )}

        <SectionFounder people={!loading ? data.people.people : []} />
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>

        <SectionStatistic />

        <SectionPromo3 /> */}
      </div>
    </div>
  );
};

export default PageAbout;
