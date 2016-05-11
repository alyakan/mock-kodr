export default Ember.HTMLBars.template((function() {
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "multiple-nodes",
          "wrong-type"
        ]
      },
      "revision": "Ember@2.3.2",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 17,
          "column": 0
        }
      },
      "moduleName": "mock-kodr/templates/arena.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","container text-center");
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","page-header");
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("h2");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("code");
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("style");
      dom.setAttribute(el1,"type","text/css");
      var el2 = dom.createTextNode("\n	.wrap {\n		height: 100%;\n	}\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("br");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("br");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0]);
      var morphs = new Array(5);
      morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1]),0,0);
      morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
      morphs[2] = dom.createMorphAt(fragment,4,4,contextualElement);
      morphs[3] = dom.createMorphAt(fragment,9,9,contextualElement);
      morphs[4] = dom.createMorphAt(fragment,11,11,contextualElement);
      return morphs;
    },
    statements: [
      ["content","model.name",["loc",[null,[3,6],[3,20]]]],
      ["content","model.description",["loc",[null,[5,7],[5,28]]]],
      ["inline","challenge-create",[],["arena",["subexpr","@mut",[["get","model",["loc",[null,[12,25],[12,30]]]]],[],[]],"store",["subexpr","@mut",[["get","store",["loc",[null,[12,37],[12,42]]]]],[],[]]],["loc",[null,[12,0],[12,44]]]],
      ["inline","challenge-list",[],["challenges",["subexpr","@mut",[["get","challenges",["loc",[null,[14,28],[14,38]]]]],[],[]],"store",["subexpr","@mut",[["get","store",["loc",[null,[14,45],[14,50]]]]],[],[]]],["loc",[null,[14,0],[14,52]]]],
      ["content","outlet",["loc",[null,[16,0],[16,10]]]]
    ],
    locals: [],
    templates: []
  };
}()));