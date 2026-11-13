const baseUrl = `${import.meta.env.BASE_URL}`;

export const redefineUrl = (url: string) => {
  const hrefStartWithSlash = url.startsWith('/');

  if (baseUrl === '/') {
    return hrefStartWithSlash ? url : `/${url}`;
  } else {
    const baseUrlEndWithSlash = baseUrl.endsWith('/');

    return `${baseUrl}${!baseUrlEndWithSlash && !hrefStartWithSlash ? `/` : ''}${url}`;
  }
};

export default redefineUrl;
