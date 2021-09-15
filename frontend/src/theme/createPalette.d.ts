import '@material-ui/core/styles/createPalette';
import '@material-ui/core/IconButton';

declare module '@material-ui/core/styles/createPalette' {
  interface IconPaletteColorOptions {
    basic: PaletteColorOptions;
  }

  interface IconButtonPropsColorOverrides {
    basic?: PaletteColorOptions;
  }

  interface PaletteOptions {
    basic?: PaletteColorOptions;
    icon?: IconPaletteColorOptions;
  }
  interface Palette {
    basic: PaletteColor;
    icon: IconPaletteColor;
  }
}
