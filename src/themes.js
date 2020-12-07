const baseTheme = {
  colorPrimary: "rgb(39,105,162)",
  colorPrimaryDark: "rgb(36,100,150)",
  // colorPrimary: 'rgb(47, 69, 117)',
  // colorPrimaryDark: 'rgb(46, 68, 127)',
  // colorPrimary: '#607d8b',
  // colorPrimaryDark: '#455a64',
  // colorPrimary: 'rgb(44, 62, 80)',
  // colorPrimaryDark: 'rgb(43, 61, 80)',
  // colorPrimary: 'rgb(24, 188, 156)',
  // colorPrimaryDark: 'rgb(20, 170, 150)',
  // colorPrimary: '#f2f2f2',
  // colorPrimaryDark: '#f1f1f1',
  accent: "rgb(24, 188, 156)",
  warning: "rgb(255,10,20)",
  success: "#4dbd74",
  info: "#2196F3",
  defaultRadi: "3px"
};

export const lightTheme = {
  ...baseTheme,
  body: "#edf2f7",
  text: "#363537",
  componentBackground: "#fff",
  componentBoxShadow: "0 6px 10px -4px rgb(204,204,204)"
  // componentBoxShadow: '4px 8px 0.714286rem rgb(204,204,204)',
  // componentBoxShadow: '0 0.5rem 1rem rgba(0,0,0,.15)'
};

export const darkTheme = {
  ...baseTheme,
  body: "rgb(0,0,0)",
  text: "#FAFAFA",
  componentBackground: "rgb(14, 20, 27)",
  componentBoxShadow: "0px 0px 0px 2px rgba(255,255,255,.1)"
};
