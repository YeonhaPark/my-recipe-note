function cov_x3o0i3pjd() {
  var path = "/Users/bag-yeonha/MyProjects/my-recipe-note/frontend/src/api/auth.ts";
  var hash = "647fc195a6fbe9fcebd9bb8cc74ad48984652154";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/bag-yeonha/MyProjects/my-recipe-note/frontend/src/api/auth.ts",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 30
        },
        end: {
          line: 7,
          column: 1
        }
      },
      "1": {
        start: {
          line: 2,
          column: 19
        },
        end: {
          line: 2,
          column: 48
        }
      },
      "2": {
        start: {
          line: 3,
          column: 2
        },
        end: {
          line: 6,
          column: 4
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 1,
            column: 30
          },
          end: {
            line: 1,
            column: 31
          }
        },
        loc: {
          start: {
            line: 1,
            column: 36
          },
          end: {
            line: 7,
            column: 1
          }
        },
        line: 1
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "647fc195a6fbe9fcebd9bb8cc74ad48984652154"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_x3o0i3pjd = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_x3o0i3pjd();
cov_x3o0i3pjd().s[0]++;
export const getAuthHeaders = () => {
  cov_x3o0i3pjd().f[0]++;
  const jwtToken = (cov_x3o0i3pjd().s[1]++, localStorage.getItem('token'));
  cov_x3o0i3pjd().s[2]++;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwtToken}`
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGgudHMiXSwibmFtZXMiOlsiZ2V0QXV0aEhlYWRlcnMiLCJqd3RUb2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJBdXRob3JpemF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVZOzs7Ozs7Ozs7O0FBZlosT0FBTyxNQUFNQSxjQUFjLEdBQUcsTUFBTTtBQUFBO0FBQ2xDLFFBQU1DLFFBQVEsNEJBQUdDLFlBQVksQ0FBQ0MsT0FBYixDQUFxQixPQUFyQixDQUFILENBQWQ7QUFEa0M7QUFFbEMsU0FBTztBQUNMLG9CQUFnQixrQkFEWDtBQUVMQyxJQUFBQSxhQUFhLEVBQUcsVUFBU0gsUUFBUztBQUY3QixHQUFQO0FBSUQsQ0FOTSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBnZXRBdXRoSGVhZGVycyA9ICgpID0+IHtcbiAgY29uc3Qgand0VG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgcmV0dXJuIHtcbiAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtqd3RUb2tlbn1gLFxuICB9O1xufTtcbiJdfQ==