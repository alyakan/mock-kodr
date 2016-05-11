export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 19,
            "column": 4
          },
          "end": {
            "line": 21,
            "column": 5
          }
        },
        "moduleName": "mock-kodr/templates/components/challenge-create.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("			    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
        return morphs;
      },
      statements: [
        ["content","errorMessage",["loc",[null,[20,10],[20,26]]]]
      ],
      locals: [],
      templates: []
    };
  }());
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
          "line": 34,
          "column": 0
        }
      },
      "moduleName": "mock-kodr/templates/components/challenge-create.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","container");
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","page-header");
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("a");
      dom.setAttribute(el2,"href","#");
      dom.setAttribute(el2,"id","toggle-btn");
      dom.setAttribute(el2,"class","btn btn-primary btn-block");
      var el3 = dom.createElement("i");
      dom.setAttribute(el3,"class","fa fa-plus-square-o");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode(" Add Challenge");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","row collapse");
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","col-md-4");
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("form");
      dom.setAttribute(el4,"class","form-group");
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("label");
      dom.setAttribute(el5,"for","name");
      var el6 = dom.createTextNode("Challenge Name:");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createComment("");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("br");
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("label");
      dom.setAttribute(el5,"for","description");
      var el6 = dom.createTextNode("Experience Points:");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createComment("");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("br");
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("label");
      dom.setAttribute(el5,"for","name");
      var el6 = dom.createTextNode("Author:");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createComment("");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("br");
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("label");
      dom.setAttribute(el5,"for","name");
      var el6 = dom.createTextNode("Arena:");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createComment("");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("br");
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("button");
      dom.setAttribute(el5,"type","submit");
      dom.setAttribute(el5,"class","btn btn-success btn-block");
      dom.setAttribute(el5,"type","submit");
      var el6 = dom.createElement("i");
      dom.setAttribute(el6,"class","fa fa-plus-square-o");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode(" Add  Challenge");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("a");
      dom.setAttribute(el5,"href","#");
      dom.setAttribute(el5,"class","btn btn-danger btn-block");
      var el6 = dom.createElement("i");
      dom.setAttribute(el6,"class","fa fa-cancel");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode(" Cancel");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n");
      dom.appendChild(el4, el5);
      var el5 = dom.createComment("");
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","col-md-8 text-center");
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("h1");
      var el5 = dom.createTextNode("Add a Challenge");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("h1");
      var el5 = dom.createElement("i");
      dom.setAttribute(el5,"class","fa fa-gamepad fa-5x");
      dom.setAttribute(el5,"aria-hidden","true");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("	\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0]);
      var element1 = dom.childAt(element0, [3]);
      var element2 = dom.childAt(element0, [5, 1, 1]);
      var element3 = dom.childAt(element2, [23]);
      var morphs = new Array(9);
      morphs[0] = dom.createElementMorph(element1);
      morphs[1] = dom.createElementMorph(element2);
      morphs[2] = dom.createMorphAt(element2,3,3);
      morphs[3] = dom.createMorphAt(element2,8,8);
      morphs[4] = dom.createMorphAt(element2,13,13);
      morphs[5] = dom.createMorphAt(element2,18,18);
      morphs[6] = dom.createElementMorph(element3);
      morphs[7] = dom.createMorphAt(element2,25,25);
      morphs[8] = dom.createMorphAt(fragment,2,2,contextualElement);
      return morphs;
    },
    statements: [
      ["element","action",["toggleForm"],[],["loc",[null,[4,29],[4,52]]]],
      ["element","action",["save"],["on","submit"],["loc",[null,[7,28],[7,57]]]],
      ["inline","input",[],["id","name","value",["subexpr","@mut",[["get","name",["loc",[null,[9,28],[9,32]]]]],[],[]],"class","form-control","placeholder","Challenge Name"],["loc",[null,[9,4],[9,84]]]],
      ["inline","input",[],["id","exp","value",["subexpr","@mut",[["get","exp",["loc",[null,[11,27],[11,30]]]]],[],[]],"class","form-control","placeholder","Experience Points","type","number"],["loc",[null,[11,4],[11,99]]]],
      ["inline","input",[],["id","author","class","form-control","disabled","true","value",["subexpr","@mut",[["get","current_user.username",["loc",[null,[13,67],[13,88]]]]],[],[]]],["loc",[null,[13,4],[13,90]]]],
      ["inline","input",[],["id","arena","class","form-control","disabled","true","value",["subexpr","@mut",[["get","arena.name",["loc",[null,[15,66],[15,76]]]]],[],[]]],["loc",[null,[15,4],[15,78]]]],
      ["element","action",["toggleForm"],[],["loc",[null,[18,15],[18,38]]]],
      ["block","if",[["get","errorMessage",["loc",[null,[19,10],[19,22]]]]],[],0,null,["loc",[null,[19,4],[21,12]]]],
      ["content","yield",["loc",[null,[33,0],[33,9]]]]
    ],
    locals: [],
    templates: [child0]
  };
}()));