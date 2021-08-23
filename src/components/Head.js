import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import favicon from "@assets/favicon.ico";

const Head = (props) => {
  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  const siteMeta = query.site.siteMetadata;

  return (
    <>
      <Helmet
        titleTemplate={`%s | ${siteMeta.title}`}
        defaultTitle={siteMeta.title}
        htmlAttributes={{ lang: "en" }}
      >
        <link rel="shortcut icon" href={favicon} />
      </Helmet>
      <SubHead {...siteMeta} title={props.title} />
    </>
  );
};

const SubHead = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>

      {props.description && (
        <meta name="description" content={props.description} />
      )}
      {props.url && <meta property="og:url" content={props.url} />}
      <meta property="og:title" content={props.title} />
      {props.description && (
        <meta property="og:description" content={props.description} />
      )}
      {props.image && <meta property="og:image" content={props.image} />}
      <meta name="twitter:title" content={props.title} />
      {props.description && (
        <meta name="twitter:description" content={props.description} />
      )}
      {props.image && <meta name="twitter:image" content={props.image} />}
    </Helmet>
  );
};

export default Head;
