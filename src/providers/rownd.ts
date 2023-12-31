export default {
  name: "Rownd",
  url: "https://docs.rownd.io/",
  image: "/images/rownd-purple.svg",
  match: [{ iss: "https://[a-z0-9-.]+.rownd.io" }],
  claims: {
    aud: {
      match: "^app:[a-z0-9-]+$",
      link: {
        label: "App settings",
        url: "https://app.rownd.io/{value}",
      },
    },
  },
};
