define("mock-kodr/templates/challenge/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 6
            },
            "end": {
              "line": 22,
              "column": 6
            }
          },
          "moduleName": "mock-kodr/templates/challenge/edit.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n		    ");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "concept.name", ["loc", [null, [21, 8], [21, 24]]]]],
        locals: ["concept"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 28,
              "column": 3
            },
            "end": {
              "line": 30,
              "column": 4
            }
          },
          "moduleName": "mock-kodr/templates/challenge/edit.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		    ");
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
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "errorMessage", ["loc", [null, [29, 9], [29, 25]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 43,
            "column": 0
          }
        },
        "moduleName": "mock-kodr/templates/challenge/edit.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "id", "modal-trigger");
        dom.setAttribute(el1, "type", "button");
        dom.setAttribute(el1, "class", "btn btn-info btn-lg hidden");
        dom.setAttribute(el1, "data-toggle", "modal");
        dom.setAttribute(el1, "data-target", "#myModal");
        var el2 = dom.createTextNode("Open Modal");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" Modal ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "myModal");
        dom.setAttribute(el1, "class", "modal fade");
        dom.setAttribute(el1, "role", "dialog");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-dialog");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Modal content");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "modal-content");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-header");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "button");
        dom.setAttribute(el5, "class", "close");
        dom.setAttribute(el5, "data-dismiss", "modal");
        var el6 = dom.createTextNode("×");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        dom.setAttribute(el5, "class", "modal-title");
        var el6 = dom.createTextNode("Edit Challenge: ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-body");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("form");
        dom.setAttribute(el5, "id", "challenge-edit-form");
        dom.setAttribute(el5, "class", "form-group");
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "name");
        var el7 = dom.createTextNode("Challenge Name:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "exp");
        var el7 = dom.createTextNode("Experience Points:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        var el7 = dom.createTextNode("Concepts:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "author");
        var el7 = dom.createTextNode("Author:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "arena");
        var el7 = dom.createTextNode("Arena:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "type", "submit");
        dom.setAttribute(el6, "class", "btn btn-success btn-block");
        dom.setAttribute(el6, "type", "submit");
        var el7 = dom.createElement("i");
        dom.setAttribute(el7, "class", "fa fa-plus-square-o");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" Save Challenge");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("		");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-footer");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "button");
        dom.setAttribute(el5, "class", "btn btn-default");
        dom.setAttribute(el5, "data-dismiss", "modal");
        var el6 = dom.createTextNode("Close");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [4, 1, 3]);
        var element1 = dom.childAt(element0, [3, 1]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 3]), 1, 1);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createMorphAt(element1, 3, 3);
        morphs[3] = dom.createMorphAt(element1, 8, 8);
        morphs[4] = dom.createMorphAt(element1, 13, 13);
        morphs[5] = dom.createMorphAt(element1, 18, 18);
        morphs[6] = dom.createMorphAt(element1, 23, 23);
        morphs[7] = dom.createMorphAt(element1, 28, 28);
        morphs[8] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        return morphs;
      },
      statements: [["content", "model.name", ["loc", [null, [11, 48], [11, 62]]]], ["element", "action", ["save"], ["on", "submit"], ["loc", [null, [14, 58], [14, 87]]]], ["inline", "input", [], ["id", "name-edit", "value", ["subexpr", "@mut", [["get", "model.name", ["loc", [null, [16, 32], [16, 42]]]]], [], []], "class", "form-control", "placeholder", "Challenge Name"], ["loc", [null, [16, 3], [16, 94]]]], ["inline", "input", [], ["id", "exp-edit", "value", ["subexpr", "@mut", [["get", "model.exp", ["loc", [null, [18, 31], [18, 40]]]]], [], []], "class", "form-control", "placeholder", "Experience Points", "type", "number"], ["loc", [null, [18, 3], [18, 109]]]], ["block", "power-select-multiple", [], ["selected", ["subexpr", "@mut", [["get", "chosenConcepts", ["loc", [null, [20, 40], [20, 54]]]]], [], []], "searchField", "name", "renderInPlace", "true", "options", ["subexpr", "@mut", [["get", "concepts", ["loc", [null, [20, 103], [20, 111]]]]], [], []], "onchange", ["subexpr", "action", [["subexpr", "mut", [["get", "chosenConcepts", ["loc", [null, [20, 134], [20, 148]]]]], [], ["loc", [null, [20, 129], [20, 149]]]]], [], ["loc", [null, [20, 121], [20, 150]]]]], 0, null, ["loc", [null, [20, 6], [22, 32]]]], ["inline", "input", [], ["class", "form-control", "disabled", "true", "value", ["subexpr", "@mut", [["get", "current_user.username", ["loc", [null, [24, 54], [24, 75]]]]], [], []]], ["loc", [null, [24, 3], [24, 77]]]], ["inline", "input", [], ["class", "form-control", "disabled", "true", "value", ["subexpr", "@mut", [["get", "model.arena.name", ["loc", [null, [26, 54], [26, 70]]]]], [], []]], ["loc", [null, [26, 3], [26, 72]]]], ["block", "if", [["get", "errorMessage", ["loc", [null, [28, 9], [28, 21]]]]], [], 1, null, ["loc", [null, [28, 3], [30, 11]]]], ["content", "outlet", ["loc", [null, [42, 0], [42, 10]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});