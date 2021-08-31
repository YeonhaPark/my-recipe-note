function cov_rn03kel9z() {
  var path = "/Users/bag-yeonha/MyProjects/my-recipe-note/frontend/src/theme/index.ts";
  var hash = "413b0161c793b813f85aecf79b5b9817887a9429";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/bag-yeonha/MyProjects/my-recipe-note/frontend/src/theme/index.ts",
    statementMap: {
      "0": {
        start: {
          line: 12,
          column: 14
        },
        end: {
          line: 43,
          column: 2
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "413b0161c793b813f85aecf79b5b9817887a9429"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_rn03kel9z = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_rn03kel9z();
import { createTheme } from '@material-ui/core/styles';
import { black, lightBeige, indigo, indigoLight, yellow, yellowLight, gray } from './colors';
const theme = (cov_rn03kel9z().s[0]++, createTheme({
  palette: {
    primary: {
      main: black,
      light: gray
    },
    secondary: {
      main: indigo,
      light: indigoLight
    },
    warning: {
      main: yellow,
      light: yellowLight
    },
    basic: {
      main: black,
      light: lightBeige
    }
  },
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(',')
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    }
  }
}));
export default theme;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbImNyZWF0ZVRoZW1lIiwiYmxhY2siLCJsaWdodEJlaWdlIiwiaW5kaWdvIiwiaW5kaWdvTGlnaHQiLCJ5ZWxsb3ciLCJ5ZWxsb3dMaWdodCIsImdyYXkiLCJ0aGVtZSIsInBhbGV0dGUiLCJwcmltYXJ5IiwibWFpbiIsImxpZ2h0Iiwic2Vjb25kYXJ5Iiwid2FybmluZyIsImJhc2ljIiwidHlwb2dyYXBoeSIsImZvbnRGYW1pbHkiLCJqb2luIiwiY29tcG9uZW50cyIsIk11aUJ1dHRvbiIsInN0eWxlT3ZlcnJpZGVzIiwicm9vdCIsImJveFNoYWRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVZOzs7Ozs7Ozs7QUFmWixTQUFTQSxXQUFULFFBQTRCLDBCQUE1QjtBQUNBLFNBQ0VDLEtBREYsRUFFRUMsVUFGRixFQUdFQyxNQUhGLEVBSUVDLFdBSkYsRUFLRUMsTUFMRixFQU1FQyxXQU5GLEVBT0VDLElBUEYsUUFRTyxVQVJQO0FBVUEsTUFBTUMsS0FBSyw0QkFBR1IsV0FBVyxDQUFDO0FBQ3hCUyxFQUFBQSxPQUFPLEVBQUU7QUFDUEMsSUFBQUEsT0FBTyxFQUFFO0FBQ1BDLE1BQUFBLElBQUksRUFBRVYsS0FEQztBQUVQVyxNQUFBQSxLQUFLLEVBQUVMO0FBRkEsS0FERjtBQUtQTSxJQUFBQSxTQUFTLEVBQUU7QUFDVEYsTUFBQUEsSUFBSSxFQUFFUixNQURHO0FBRVRTLE1BQUFBLEtBQUssRUFBRVI7QUFGRSxLQUxKO0FBU1BVLElBQUFBLE9BQU8sRUFBRTtBQUNQSCxNQUFBQSxJQUFJLEVBQUVOLE1BREM7QUFFUE8sTUFBQUEsS0FBSyxFQUFFTjtBQUZBLEtBVEY7QUFhUFMsSUFBQUEsS0FBSyxFQUFFO0FBQ0xKLE1BQUFBLElBQUksRUFBRVYsS0FERDtBQUVMVyxNQUFBQSxLQUFLLEVBQUVWO0FBRkY7QUFiQSxHQURlO0FBbUJ4QmMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLFVBQVUsRUFBRSxDQUFDLE1BQUQsRUFBUyxZQUFULEVBQXVCQyxJQUF2QixDQUE0QixHQUE1QjtBQURGLEdBbkJZO0FBc0J4QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLFNBQVMsRUFBRTtBQUNUQyxNQUFBQSxjQUFjLEVBQUU7QUFDZEMsUUFBQUEsSUFBSSxFQUFFO0FBQ0pDLFVBQUFBLFNBQVMsRUFBRTtBQURQO0FBRFE7QUFEUDtBQUREO0FBdEJZLENBQUQsQ0FBZCxDQUFYO0FBaUNBLGVBQWVmLEtBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVUaGVtZSB9IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL3N0eWxlcyc7XG5pbXBvcnQge1xuICBibGFjayxcbiAgbGlnaHRCZWlnZSxcbiAgaW5kaWdvLFxuICBpbmRpZ29MaWdodCxcbiAgeWVsbG93LFxuICB5ZWxsb3dMaWdodCxcbiAgZ3JheSxcbn0gZnJvbSAnLi9jb2xvcnMnO1xuXG5jb25zdCB0aGVtZSA9IGNyZWF0ZVRoZW1lKHtcbiAgcGFsZXR0ZToge1xuICAgIHByaW1hcnk6IHtcbiAgICAgIG1haW46IGJsYWNrLFxuICAgICAgbGlnaHQ6IGdyYXksXG4gICAgfSxcbiAgICBzZWNvbmRhcnk6IHtcbiAgICAgIG1haW46IGluZGlnbyxcbiAgICAgIGxpZ2h0OiBpbmRpZ29MaWdodCxcbiAgICB9LFxuICAgIHdhcm5pbmc6IHtcbiAgICAgIG1haW46IHllbGxvdyxcbiAgICAgIGxpZ2h0OiB5ZWxsb3dMaWdodCxcbiAgICB9LFxuICAgIGJhc2ljOiB7XG4gICAgICBtYWluOiBibGFjayxcbiAgICAgIGxpZ2h0OiBsaWdodEJlaWdlLFxuICAgIH0sXG4gIH0sXG4gIHR5cG9ncmFwaHk6IHtcbiAgICBmb250RmFtaWx5OiBbJ0xhdG8nLCAnc2Fucy1zZXJpZiddLmpvaW4oJywnKSxcbiAgfSxcbiAgY29tcG9uZW50czoge1xuICAgIE11aUJ1dHRvbjoge1xuICAgICAgc3R5bGVPdmVycmlkZXM6IHtcbiAgICAgICAgcm9vdDoge1xuICAgICAgICAgIGJveFNoYWRvdzogJ25vbmUnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHRoZW1lO1xuIl19