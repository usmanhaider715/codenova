import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = 'https://codenova.art/og-image.jpg',
  url,
  type = 'website'
}) => {
  const fullTitle = title ? `${title} | CodeNova` : 'CodeNova - Professional Software Development Agency';
  const fullDescription = description || 'Leading software development agency specializing in MERN stack development, cloud solutions, mobile app development, and video editing.';
  const fullKeywords = keywords || 'software development, web development, MERN stack, React, Node.js, MongoDB, cloud solutions, AWS, Azure, mobile app development, iOS, Android, video editing, digital agency, Pakistan';
  const fullUrl = url ? `https://codenova.art${url}` : 'https://codenova.art/';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
