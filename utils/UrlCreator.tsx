const UrlCreator = (data: Idata) => {
  let queryString = "?";
  let temp_query = {};
  let asPath = null;

  for (const [key, value] of Object.entries(data.query)) {
    if (value == 0) {
      continue;
    }
    temp_query[key] = value;
    if (queryString === "?") queryString += `${key}=${value}`;
    else queryString += `&${key}=${value}`;
  }
  if (data.query.id) {
    asPath = data.route.replace(/\[id\]/gi, data.query.id);
  }

  data.cb({
    pathname: data.route,
    queryString: queryString,
    asPath,
    query: temp_query,
  });
};

interface Idata {
  query: any;
  route: string;
  cb: any;
}
export default UrlCreator;
