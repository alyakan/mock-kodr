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
          "line": 33,
          "column": 0
        }
      },
      "moduleName": "mock-kodr/templates/components/user-arena-item.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("style");
      dom.setAttribute(el1,"type","text/css");
      var el2 = dom.createTextNode("\n	.wrap {\n		height: 100%;\n	}\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","list-group-item");
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("h4");
      dom.setAttribute(el2,"class","list-group-item-heading");
      var el3 = dom.createTextNode("\n		\n	\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","pull-right");
      var el4 = dom.createTextNode("\n			\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("a");
      dom.setAttribute(el4,"href","");
      dom.setAttribute(el4,"class","btn-primary btn-sm");
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("i");
      dom.setAttribute(el5,"class","fa fa-play");
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode(" Try\n			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("kbd");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("p");
      dom.setAttribute(el2,"class","list-group-item-text");
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("br");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","progress");
      var el3 = dom.createTextNode("\n	  ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","progress-bar progress-bar-success progress-bar-striped");
      dom.setAttribute(el3,"role","progressbar");
      dom.setAttribute(el3,"aria-valuenow","70");
      dom.setAttribute(el3,"aria-valuemin","0");
      dom.setAttribute(el3,"aria-valuemax","100");
      dom.setAttribute(el3,"style","width:70%");
      var el4 = dom.createTextNode("\n	    ");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("%\n	  ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [2]);
      var morphs = new Array(4);
      morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 3]),0,0);
      morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
      morphs[2] = dom.createMorphAt(dom.childAt(element0, [7, 1]),1,1);
      morphs[3] = dom.createMorphAt(fragment,4,4,contextualElement);
      return morphs;
    },
    statements: [
      ["content","userArena.arena.name",["loc",[null,[20,7],[20,31]]]],
      ["content","userArena.arena.description",["loc",[null,[22,33],[22,64]]]],
      ["content","userArena.progress",["loc",[null,[27,5],[27,27]]]],
      ["content","yield",["loc",[null,[32,0],[32,9]]]]
    ],
    locals: [],
    templates: []
  };
}()));