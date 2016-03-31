<template>
  <div class="exercise__ratio">
    <div class="exercise__position">
      <h1
        v-if="ex.title"
        v-text="ex.title"
      ></h1>

      <div class="exercise__controls">
        <button
          @click="closeExercise"
          class="button button--close button--scale"
        >
          <span class="wb-cancel">
        </button>

        <button class="button button--solve button--scale" type="button" @click="solveLink">
          <span class="wb-solve"></span>
        </button>

        <button class="button button--reset button--scale" type="reset" @click="resetLink">
          <span class="wb-reset"></span>
        </button>

        <template v-if="ex.audio">
          <custom-audio :audio="ex.audio"></custom-audio>
        </template>

        <template v-if="ex.help">
          <exercise-help :help="ex.help"></exercise-help>
        </template>

        <button
          @click="initJsPlumbExercise"
          v-text="'Start'"
          v-el="startButton"
          class="button button--reversed button--large"
        >
        </button>
      </div>

      <div class="exercise exercise--linker">
        <img v-if="ex.image"
             :src="'./img/' + ex.image + '.jpg'">

        <form class="exercise__container">
           <div class="linker-main">
            <div class="canvas-wide linker-stage" id="canvas">
              <div v-for="row in ex.data"
                   :style="'position: absolute; top: ' + row.position.top + '; left: ' + row.position.left + '; width: ' + row.position.width + '; height: ' + row.position.height"
                   class="window unselectable"
                   id="{{ row.identifier }}">
                  <img :src="'./img/' + row.image.src"
                       width="{{ row.image.width }}"
                       height="{{ row.image.height }}" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  var pages = require('../../pages.js');

  export default {
    name: 'Linker',

    data: function() {
      return {
        pages: pages()
      }
    },

    computed: {
      ex: function() {
        return this.pages[this.$route.params.pageId].exercise[this.$route.params.id]
      }
    },

    methods: {
      solutionTrue: function() {
        this.$dispatch('solution-true')
      },

      solutionFalse: function() {
        this.$dispatch('solution-false')
      },

      solveLink: function() {

      },

      resetLink: function() {

      },

      closeExercise: function() {
        this.$dispatch('return-to-page', this.$route.params.pageId)
      },

      initJsPlumbExercise: function() {
          console.log('intra');
        var instance = jsPlumb.getInstance({
            // default drag options
            DragOptions: { cursor: 'pointer', zIndex: 2000 },
            // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
            // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
            ConnectionOverlays: [
                [ "Arrow", {
                    location: 1,
                    visible:true,
                    id:"ARROW",
                    events:{
                        click:function() { alert("you clicked on the arrow overlay")}
                    }
                } ],
                [ "Label", {
                    location: 0.1,
                    id: "label",
                    cssClass: "aLabel",
                    events:{
                        tap:function() { alert("hey"); }
                    }
                }]
            ],
            Container: "canvas"
        });

        var basicType = {
            connector: "StateMachine",
            paintStyle: { strokeStyle: "red", lineWidth: 4 },
            hoverPaintStyle: { strokeStyle: "blue" },
            overlays: [
                "Arrow"
            ]
        };
        instance.registerConnectionType("basic", basicType);

        // this is the paint style for the connecting lines..
        var connectorPaintStyle = {
                lineWidth: 4,
                strokeStyle: "#61B7CF",
                joinstyle: "round",
                outlineColor: "white",
                outlineWidth: 2
            },
        // .. and this is the hover style.
            connectorHoverStyle = {
                lineWidth: 4,
                strokeStyle: "#216477",
                outlineWidth: 2,
                outlineColor: "white"
            },
            endpointHoverStyle = {
                fillStyle: "#216477",
                strokeStyle: "#216477"
            },
        // the definition of source endpoints (the small blue ones)
            sourceEndpoint = {
                endpoint: "Dot",
                paintStyle: {
                    strokeStyle: "#7AB02C",
                    fillStyle: "transparent",
                    radius: 7,
                    lineWidth: 3
                },
                isSource: true,
                connector: [ "StateMachine", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
                connectorStyle: connectorPaintStyle,
                hoverPaintStyle: endpointHoverStyle,
                connectorHoverStyle: connectorHoverStyle,
                dragOptions: {},
                overlays: [
                    [ "Label", {
                        location: [0.5, 1.5],
                        label: "Drag",
                        cssClass: "endpointSourceLabel",
                        visible:false
                    } ]
                ]
            },
        // the definition of target endpoints (will appear when the user drags a connection)
            targetEndpoint = {
                endpoint: "Dot",
                paintStyle: { fillStyle: "#7AB02C", radius: 11 },
                hoverPaintStyle: endpointHoverStyle,
                maxConnections: -1,
                dropOptions: { hoverClass: "hover", activeClass: "active" },
                isTarget: true,
                overlays: [
                    [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible:false } ]
                ]
            },
            init = function (connection) {
                connection.getOverlay("label").setLabel(connection.sourceId + "-" + connection.targetId);
            };

        var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
            for (var i = 0; i < sourceAnchors.length; i++) {
                var sourceUUID = toId + sourceAnchors[i];
                instance.addEndpoint(toId, sourceEndpoint, {
                    anchor: sourceAnchors[i], uuid: sourceUUID
                });
            }
            for (var j = 0; j < targetAnchors.length; j++) {
                var targetUUID = toId + targetAnchors[j];
                instance.addEndpoint(toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
            }
        };

        // suspend drawing and initialise.
        instance.batch(function () {

            /*_addEndpoints("window4", [],["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"]);
            _addEndpoints("albastru-deschis", ["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], []);
            _addEndpoints("window3", [],["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"]);
            _addEndpoints("ghiozdan", [],["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"]);*/

            // listen for new connections; initialise them the same way we initialise the connections at startup.
            instance.bind("connection", function (connInfo, originalEvent) {
                init(connInfo.connection);
            });

            // make all the window divs draggable
            instance.draggable(jsPlumb.getSelector(".linker-stage .window"), { grid: [20, 20] });

            // listen for clicks on connections, and offer to delete connections on click.
            //
            instance.bind("click", function (conn, originalEvent) {
                if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
                    instance.detach(conn);
                conn.toggleType("basic");
            });

            instance.bind("connectionDrag", function (connection) {
                console.log(connection);
                console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
            });

            instance.bind("connectionDragStop", function (connection) {
                console.log("connection " + connection.id + " was dragged");
            });

            instance.bind("connectionMoved", function (params) {
                console.log("connection " + params.connection.id + " was moved");
            });
        });

        jsPlumb.fire("jsPlumbDemoLoaded", instance);

      }
    }
  }
</script>
