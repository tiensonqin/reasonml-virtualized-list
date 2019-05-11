// Generated by BUCKLESCRIPT VERSION 5.0.4, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Belt_SortArray = require("bs-platform/lib/js/belt_SortArray.js");
var Belt_HashMapInt = require("bs-platform/lib/js/belt_HashMapInt.js");

function scrollTop(prim) {
  return prim.scrollTop;
}

function log(prim) {
  console.log(prim);
  return /* () */0;
}

var defaultPositionValue_001 = /* heightMap */Belt_HashMapInt.make(100);

var defaultPositionValue = /* record */[
  /* scrollPosition */1000,
  defaultPositionValue_001
];

function VirtualizedList(Props) {
  var match = Props.bufferCount;
  var bufferCount = match !== undefined ? match : 5;
  var match$1 = Props.defaultPosition;
  var defaultPosition = match$1 !== undefined ? match$1 : defaultPositionValue;
  var onDestroy = Props.onDestroy;
  var match$2 = Props.defaultHeight;
  var defaultHeight = match$2 !== undefined ? match$2 : 200;
  var data = Props.data;
  var identity = Props.identity;
  var viewPortRef = Props.viewPortRef;
  var renderItem = Props.renderItem;
  var match$3 = React.useState((function () {
          return -1;
        }));
  var setStartIndex = match$3[1];
  var startIndex = match$3[0];
  var match$4 = React.useState((function () {
          return 10;
        }));
  var setEndIndex = match$4[1];
  var endIndex = match$4[0];
  var refMap = React.useRef(Belt_HashMapInt.make(100));
  var heightMap = React.useRef(defaultPosition[/* heightMap */1]);
  var scrollTopPosition = React.useRef(0);
  var sortByKey = function (a, b) {
    var id_b = b[0];
    var id_a = a[0];
    var match = Caml_obj.caml_greaterthan(id_a, id_b);
    if (match) {
      return 1;
    } else if (id_a === id_b) {
      return 0;
    } else {
      return -1;
    }
  };
  var convertToSortedArray = function (heightMap) {
    var map = heightMap.current;
    return Belt_SortArray.stableSortBy(Belt_Array.map(Belt_Array.map(data, (function (item) {
                          var id = Curry._1(identity, item);
                          return /* tuple */[
                                  id,
                                  defaultHeight
                                ];
                        })), (function (item) {
                      var id = item[0];
                      return Belt_Option.mapWithDefault(Belt_HashMapInt.get(map, id), item, (function (measuredHeight) {
                                    return /* tuple */[
                                            id,
                                            measuredHeight
                                          ];
                                  }));
                    })), sortByKey);
  };
  var element = Belt_Option.map(Caml_option.nullable_to_opt(viewPortRef.current), (function (prim) {
          return prim;
        }));
  React.useEffect((function () {
          setTimeout((function (param) {
                  Curry._1(setStartIndex, (function (param) {
                          return 0;
                        }));
                  var setScrollTop = Belt_Option.map(Belt_Option.map(Caml_option.nullable_to_opt(viewPortRef.current), (function (prim) {
                              return prim;
                            })), (function (prim, prim$1) {
                          prim.scrollTop = prim$1;
                          return /* () */0;
                        }));
                  if (setScrollTop !== undefined) {
                    return Curry._1(setScrollTop, 1000);
                  } else {
                    return /* () */0;
                  }
                }), 1);
          return undefined;
        }), /* array */[]);
  var handleScroll = function (_e) {
    if (element !== undefined) {
      var element$1 = Caml_option.valFromOption(element);
      Curry._1(setStartIndex, (function (_prev) {
              var startItem = Belt_Array.reduce(convertToSortedArray(heightMap), /* tuple */[
                    0,
                    0
                  ], (function (sum, item) {
                      var sumHeight = sum[1];
                      var match = sumHeight > (element$1.scrollTop | 0);
                      if (match) {
                        return sum;
                      } else {
                        return /* tuple */[
                                item[0],
                                item[1] + sumHeight | 0
                              ];
                      }
                    }));
              var id = startItem[0];
              var match = (id - bufferCount | 0) < 0;
              if (match) {
                return 0;
              } else {
                return id - bufferCount | 0;
              }
            }));
      scrollTopPosition.current = element$1.scrollTop | 0;
      return Curry._1(setEndIndex, (function (_prev) {
                    var endIndex = Belt_Array.reduce(convertToSortedArray(heightMap), /* tuple */[
                          0,
                          0
                        ], (function (sum, item) {
                            var sumHeight = sum[1];
                            var match = sumHeight > ((element$1.scrollTop | 0) + element$1.clientHeight | 0);
                            if (match) {
                              return sum;
                            } else {
                              return /* tuple */[
                                      item[0],
                                      item[1] + sumHeight | 0
                                    ];
                            }
                          }));
                    var id = endIndex[0];
                    var match = (id + bufferCount | 0) > data.length;
                    if (match) {
                      return data.length;
                    } else {
                      return id + bufferCount | 0;
                    }
                  }));
    } else {
      return /* () */0;
    }
  };
  React.useEffect((function () {
          if (element !== undefined) {
            Caml_option.valFromOption(element).addEventListener("scroll", handleScroll);
          }
          return (function (param) {
                    if (element !== undefined) {
                      Caml_option.valFromOption(element).removeEventListener("scroll", handleScroll);
                      return /* () */0;
                    } else {
                      return /* () */0;
                    }
                  });
        }), /* array */[element]);
  React.useEffect((function () {
          return (function (param) {
                    return Curry._2(onDestroy, scrollTopPosition.current, heightMap.current);
                  });
        }), /* array */[]);
  var startPadding = Belt_Array.reduce(Belt_Array.slice(convertToSortedArray(heightMap), 0, startIndex), 0, (function (sum, item) {
          return sum + item[1] | 0;
        }));
  var endPadding = Belt_Array.reduce(Belt_Array.slice(convertToSortedArray(heightMap), endIndex, data.length - endIndex | 0), 0, (function (sum, item) {
          return sum + item[1] | 0;
        }));
  return React.createElement(React.Fragment, {
              children: React.createElement("div", undefined, React.createElement("div", {
                        className: Css.style(/* :: */[
                              Css.paddingTop(Css.px(startPadding)),
                              /* :: */[
                                Css.paddingBottom(Css.px(endPadding)),
                                /* [] */0
                              ]
                            ])
                      }, Belt_Array.map(Belt_Array.map(Belt_Array.slice(data, startIndex, endIndex - startIndex | 0), (function (item) {
                                  return /* tuple */[
                                          Curry._1(renderItem, item),
                                          Curry._1(identity, item)
                                        ];
                                })), (function (itemTuple) {
                              var id = itemTuple[1];
                              return React.cloneElement(itemTuple[0], {
                                          ref: (function (elementRef) {
                                              Belt_HashMapInt.set(refMap.current, id, elementRef);
                                              return Belt_Option.map(Belt_Option.map((elementRef == null) ? undefined : Caml_option.some(elementRef), (function (prim) {
                                                                return prim.clientHeight;
                                                              })), (function (height) {
                                                            return Belt_HashMapInt.set(heightMap.current, id, height);
                                                          }));
                                            })
                                        });
                            }))))
            });
}

var make = VirtualizedList;

exports.scrollTop = scrollTop;
exports.log = log;
exports.defaultPositionValue = defaultPositionValue;
exports.make = make;
/* defaultPositionValue Not a pure module */
