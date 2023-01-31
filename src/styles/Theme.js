import { amber, deepOrange, grey, blue, lightBlue, purple } from '@mui/material/colors';

// Color palette for light and dark modes
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
    ? {
        primary: {
          main: blue[500],
        },
        modeBtn: {
          main: grey[600]
        },
      }
    : {
        primary: {
          main: blue[800],
        },
        background: {
          default: grey[900],
        },
        modeBtn: {
          main: grey[300]
        },
      }
    )
  }
});

// Components styling for light and dark modes
export const getThemedComponents = (mode) => ({
  typography: {
    allVariants: {
      fontFamily: 'Open Sans',
      fontSize: '16px',
      letterSpacing: 0,
      lineHeight: 1.5
    },
    caption: {
      fontWeight: 600
    },
    error: {
      color: 'red',
      fontWeight: 600
    }
  },
  // Mapping to span tag for easier styling
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          caption: 'span',
          subtitle1: 'span'
        }
      }
    },
    // Making the container flipping feels 3D
    MuiContainer: {
      styleOverrides: {
        root: {
            cursor: 'pointer',
            userSelect: 'none',
            transformStyle: 'preserve-3d',
            position: 'relative',
            color: '#fff',
            zIndex: 1,
            borderRadius: '1rem',
            transition: 'ease 0.4s',
            '@media (max-width: 400px)': {
              transition: 'ease 0.6s',
            },
            padding: '0px !important',
            '&.isFlipped': {
              transform: 'rotateY(180deg)'
            }
        }
      }
    },
    ...(mode === 'light'
      ? {
        // Styling border and elevation + gradient when hover for light mode
          MuiPaper: {
            styleOverrides: {
              root: {
                '&.gradient': {
                  color: '#fff !important',
                  backgroundColor: 'transparent !important',
                  backfaceVisibility: 'hidden',
                  padding: '28px !important',
                  '@media (min-width: 600px)': {
                    padding: '32px !important',
                  },
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  transition: 'ease 0.4s',
                  width: '100%',
                  boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
                  '&::before': {
                    position: 'absolute',
                    content: '""',
                    zIndex: -1,
                    borderRadius: '1rem',
                    top: 0,
                    left: 0,
                    width: '300%',
                    height: '300%',
                    transition: 'transform ease 0.4s',
                    '@media (max-width: 400px)': {
                      transition: 'transform ease 0.8s',
                    },
                    background: `radial-gradient(circle 60rem at top left, ${lightBlue[300]} -20%, ${purple[300]}, ${lightBlue[300]} 200%)`,
                  },
                  '&.gradient-activated': {
                    transform: 'scale(1.025)',
                    '@media (min-width: 600px)': {
                      transform: 'scale(1.05)',
                    },
                    boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
                  },
                  '&.gradient-activated::before': {
                    transform: 'translate(-60%, -60%)',
                  },
                },
              }
            }
          },
          MuiLoadingButton: {
            styleOverrides: {
              root: {
                color: grey[600] + ' !important'
              }
            }
          },
        }
      : {
        // Styling border and elevation when hover for dark mode
          MuiPaper: {
            styleOverrides: {
              root: {
                '&.gradient': {
                  backfaceVisibility: 'hidden',
                  padding: '28px !important',
                  '@media (min-width: 600px)': {
                    padding: '32px !important',
                  },
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  transition: 'ease 0.4s',
                  backgroundColor: `${grey[800]} !important`,
                  width: '100%',
                  boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
                  '&.gradient-activated': {
                    transform: 'scale(1.025)',
                    '@media (min-width: 600px)': {
                      transform: 'scale(1.05)',
                    },
                    boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
                  },
                },
              }
            }
          },
          MuiLoadingButton: {
            styleOverrides: {
              root: {
                color: grey[300] + ' !important'
              }
            }
          },
      }),
  },
});