<template>
  <section class="book book--exercise">
    <div class="page{{ this.$route.params.pageId }} single-page single-page--exercise">
      <h1
        v-if="ex.title"
        v-text="ex.title"
        class="remodal__title"
      ></h1>

      <div class="exercise__controls">
        <button
          @click="closeExercise"
          class="button button--close button--scale"
        >
          <span class="wb-cancel">
        </button>

        <button class="button button--solve button--scale" type="button" @click="solveLinker">
          <span class="wb-solve"></span>
        </button>

        <button class="button button--reset button--scale" type="reset" @click="resetForm">
          <span class="wb-reset"></span>
        </button>

        <button
          @click="initJsPlumbExercise"
          v-text="'Start'"
          v-el:start-button
          class="button button--reversed button--large"
        >
        </button>

        <template v-if="ex.audio">
          <custom-audio :audio="ex.audio"></custom-audio>
        </template>

        <template v-if="ex.help">
          <exercise-help :help="ex.help"></exercise-help>
        </template>
      </div>

      <img :src="'./img/' + ex.image + '.jpg'">

      <form class="exercise exercise--linker">
        <div class="linker-main">
          <div class="linker-stage" id="canvas">
            <div v-for="row in ex.data"
                 :style="'top: ' + row.style.top + ';
                 left: ' + row.style.left + '; width: ' + row.style.width + ';
                 height: ' + row.style.height"
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
  </section>
</template>

<script>
  var $ = require('jquery');
  var pages = require('../../../../../data/pages.js');
  var resizeMixin = require('vue-resize-mixin');
  var _jsPlumbDefaults, _initConnection, _setConnectionLabel,
      _addEndpoints, _firstInstance, _secondInstance;

  export default {
    name: 'Linker',

    mixins: [resizeMixin],

    events: {
      'resize': 'onResize'
    },

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

    ready: function() {
      this.onResize()
    },

    methods: {
      solutionTrue: function() {
        this.$dispatch('solution-true')
      },

      solutionFalse: function() {
        this.$dispatch('solution-false')
      },

      onResize: function() {
        var scaled = $(".wrapper");
        scaled.css({ 'height': '100%', 'width': '100%' });
        var ratio = 79/100;
        var w = scaled.outerWidth();
        var h = scaled.outerHeight();

        if (w > ratio*h) {
          scaled.width(ratio*h);
        } else if (h > w/ratio) {
          var newHeight = w/ratio;
          scaled.height(newHeight);
          // for vertical centering
          scaled.css({marginTop: ($("body").height()-newHeight)/2 - 20});
        }
      },

      jsPlumbDefaults: function() {
        // default drag options
        _jsPlumbDefaults = {
          DragOptions: { cursor: 'pointer', zIndex: 2000 },
          ConnectionOverlays: [
            [ "Arrow", {
              location: 1,
              visible:true,
              id:"ARROW"
            } ]
          ],
          Container: "canvas"
        };

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
              connector: [ "StateMachine", { stub: [40, 60], gap: 10,
                cornerRadius: 5, alwaysRespectStubs: true } ],
              connectorStyle: connectorPaintStyle,
              hoverPaintStyle: endpointHoverStyle,
              connectorHoverStyle: connectorHoverStyle,
              dragOptions: {},
              cssClass: 'the-source-endpoint'
            },
        // the definition of target endpoints
        // (will appear when the user drags a connection)
            targetEndpoint = {
              endpoint: "Dot",
              paintStyle: { fillStyle: "#7AB02C", radius: 11 },
              hoverPaintStyle: endpointHoverStyle,
              maxConnections: -1,
              dropOptions: { hoverClass: "hover", activeClass: "active" },
              isTarget: true,
              cssClass: 'the-target-endpoint'
            };

        _initConnection = function (connection, connectionColor) {
          //connection.getOverlay("label").setLabel();
          connection.setPaintStyle({ strokeStyle: connectionColor });
        },
        _setConnectionLabel = function (connection) {
          connection.addOverlay(["Label", {
            location: 0.5,
            id: "connLabel",
            cssClass: "aLabel scissor-icon-label"
          }]);
        };

        _addEndpoints = function (instance, toId, sourceAnchors, targetAnchors) {
          for (var i = 0; i < sourceAnchors.length; i++) {
            var sourceUUID = toId + sourceAnchors[i];
              instance.addEndpoint(toId, sourceEndpoint, {
                anchor: sourceAnchors[i], uuid: sourceUUID, connectionsDetachable: false
              });
          }
          for (var j = 0; j < targetAnchors.length; j++) {
            var targetUUID = toId + targetAnchors[j];
              instance.addEndpoint(toId, targetEndpoint, {
                anchor: targetAnchors[j], uuid: targetUUID, connectionsDetachable: false
              });
          }
        };
      },

      solveLinker: function() {
        var self = this;
        self.jsPlumbDefaults();
        jsPlumb.ready(function () {
          if (_secondInstance)
            _secondInstance.reset();
          _firstInstance = jsPlumb.getInstance(_jsPlumbDefaults);
          self.resetForm();
          // suspend drawing and initialise.
          _firstInstance.batch(function () {
            // addEndpoints from JSON
            for (var i = 0; i < self.ex.data.length; i++) {
              _addEndpoints(_firstInstance, self.ex.data[i].identifier,
                self.ex.data[i].sourceAnchors, self.ex.data[i].targetAnchors);
            }
            // connect sourceAnchors with targetAnchors solutions
            var connectionsColors = [];
            for (var i = 0; i < self.ex.data.length; i++) {
              if (self.ex.data[i].solution) {
                if (typeof self.ex.data[i].solution === 'object') {
                  for (var k = 0; k < self.ex.data[i].solution.length; k++) {
                    for (var j = 0; j < self.ex.data.length; j++) {
                      if (self.ex.data[i].solution[k] == self.ex.data[j].identifier) {
                        connectionsColors = '#61B7CF';
                        _firstInstance.connect({
                          uuids: [
                            self.ex.data[j].identifier +
                            (self.ex.data[i].targetAnchors[0] !=
                              self.ex.data[j].sourceAnchors[0] ?
                              self.ex.data[j].sourceAnchors[0] :
                              self.ex.data[j].sourceAnchors[1]),
                            self.ex.data[i].identifier +
                            self.ex.data[i].targetAnchors[0]
                          ]
                        });
                      }
                    }
                  }
                } else if (typeof self.ex.data[i].solution === 'string') {
                  for (var j = 0; j < self.ex.data.length; j++) {
                    if (self.ex.data[i].solution == self.ex.data[j].identifier) {
                      connectionsColors.push(self.ex.data[j].style.color);
                      _firstInstance.connect({
                        uuids: [
                          self.ex.data[j].identifier +
                          (self.ex.data[i].targetAnchors[0] !=
                            self.ex.data[j].sourceAnchors[0] ?
                            self.ex.data[j].sourceAnchors[0] :
                            self.ex.data[j].sourceAnchors[1]),
                          self.ex.data[i].identifier +
                          self.ex.data[i].targetAnchors[0]
                        ]
                      });
                    }
                  }
                }
              }
            }
            var k = 0;
            _firstInstance.select(_firstInstance.getConnections()).each(
              function(connection) {
                connection.setPaintStyle({
                  lineWidth: 4,
                  strokeStyle: (typeof connectionsColors === 'object') ?
                    connectionsColors[k] : connectionsColors,
                  joinstyle: "round",
                  outlineColor: "white",
                  outlineWidth: 2
                });
                for (var i = 0; i < self.ex.data.length; i++) {
                  if (self.ex.data[i].solution && self.ex.data[i].identifier ==
                    connection.targetId && self.ex.data[i].solution ==
                    connection.sourceId) {
                    $('#' + connection.targetId)
                      .css('border-color', connectionsColors[k])
                      .find('img')
                      .attr('src', './img/' + self.ex.data[i].solutionImg.src);
                      break;
                  }
                }
                k++;
              }
            );
          });
        });
        self.$els.startButton.setAttribute('disabled', 'disabled');
      },

      resetForm: function() {
        //console.log('reset jsPlumb instances');
        var self = this;
        self.$els.startButton.removeAttribute('disabled');
        jsPlumb.ready(function() {
          if (_firstInstance) {
            _firstInstance.batch(function () {
              for (var i = 0; i < self.ex.data.length; i++) {
                if (self.ex.data[i].solution) {
                  $('#' + self.ex.data[i].identifier)
                    .css('border-color', '#aaa')
                    .find('img')
                    .attr('src', './img/' + self.ex.data[i].image.src);
                }
              }
            });
            _firstInstance.reset();
          }
          if (_secondInstance) {
            _secondInstance.batch(function () {
              for (var i = 0; i < self.ex.data.length; i++) {
                if (self.ex.data[i].solution) {
                  $('#' + self.ex.data[i].identifier)
                    .css('border-color', '#aaa')
                    .find('img')
                    .attr('src', './img/' + self.ex.data[i].image.src);
                }
              }
            });
            _secondInstance.reset();
          }
        });
      },

      closeExercise: function() {
        this.$dispatch('return-to-page', this.$route.params.pageId)
      },

      initJsPlumbExercise: function() {
        var self = this;
        self.jsPlumbDefaults();
        self.$els.startButton.setAttribute('disabled', 'disabled');
        jsPlumb.ready(function () {
          _secondInstance = jsPlumb.getInstance(_jsPlumbDefaults);
          // suspend drawing and initialise.
          _secondInstance.batch(function () {
            // addEndpoints from JSON
            for (var i = 0; i < self.ex.data.length; i++) {
              _addEndpoints(_secondInstance, self.ex.data[i].identifier,
                self.ex.data[i].sourceAnchors, self.ex.data[i].targetAnchors);
            }
            // listen for new connections; initialise them the same way we
            // initialise the connections at startup.
            _secondInstance.bind("connection", function (connInfo, originalEvent) {
              var connectionColor = '#61B7CF';
              for (var i = 0; i < self.ex.data.length; i++) {
                if (self.ex.data[i].style.color &&
                  self.ex.data[i].identifier == connInfo.connection.sourceId) {
                  connectionColor = self.ex.data[i].style.color;
                  break;
                }
              }
                _initConnection(connInfo.connection, connectionColor);
            });
            // listen for clicks on connections,
            // and offer to delete connections on click.
            _secondInstance.bind("click", function (conn, originalEvent) {
              var _suspendedElemImg;
              for (var i = 0; i < self.ex.data.length; i++) {
                if (typeof self.ex.data[i].solution === 'object') {
                  for (var j = 0; j < self.ex.data[i].solution.length; j++) {
                    if (self.ex.data[i].solution[j] == conn.sourceId) {
                      if (self.ex.data[j].solutionBorder) {
                        $('#' + conn.sourceId)
                          .css({
                            'border-width': '1px',
                            'border-color': '#346789'
                          });
                        _suspendedElemImg = undefined;
                        break;
                      }
                    }
                  }
                } else if (typeof self.ex.data[i].solution === 'string') {
                  if (self.ex.data[i].solution && self.ex.data[i].identifier ==
                    conn.targetId && self.ex.data[i].solution ==
                    conn.sourceId) {
                    _suspendedElemImg = self.ex.data[i].image.src;
                    break;
                  } else if (self.ex.data[i].identifier ==
                    conn.targetId && self.ex.data[i].solution !=
                    conn.sourceId) {
                    _suspendedElemImg = self.ex.data[i].image.src;
                    break;
                  }
                }
              }
              $('#' + conn.targetId)
                .css({
                  'border-width': '1px',
                  'border-color': '#346789'
                });
                if (typeof _suspendedElemImg != 'undefined') {
                  $('#' + conn.targetId)
                    .find('img')
                    .attr('src', './img/' + _suspendedElemImg);
                }
              _secondInstance.detach(conn);
            });
            // execute onDragStop - validate targets as solutions
            _secondInstance.bind("connectionDragStop", function (connection) {
              //console.log("connection " + connection.id + " was dragged");
              var connectionColor = '#61B7CF',
                  solutionBorderColor = '#7AB02C';
              for (var i = 0; i < self.ex.data.length; i++) {
                if (self.ex.data[i].style.color && self.ex.data[i].identifier ==
                  connection.sourceId) {
                  connectionColor = self.ex.data[i].style.color;
                  break;
                }
              }
              for (var i = 0; i < self.ex.data.length; i++) {
                if (self.ex.data[i].solution && self.ex.data[i].identifier ==
                  connection.targetId) {
                  if (typeof self.ex.data[i].solution === 'object') {
                    for (var j = 0; j < self.ex.data[i].solution.length; j++) {
                      if (self.ex.data[i].solution[j] == connection.sourceId) {
                        if (self.ex.data[j].solutionBorder) {
                          $('#' + connection.sourceId)
                            .css({
                              'border-width': '2px',
                              'border-color': solutionBorderColor
                            });
                        }
                        self.solutionTrue();
                        break;
                      }
                    }
                  } else if (typeof self.ex.data[i].solution === 'string' &&
                    self.ex.data[i].solution == connection.sourceId) {
                    $('#' + connection.targetId)
                      .css({
                        'border-width': '2px',
                        'border-color': connectionColor
                      });
                    if (self.ex.data[i].solutionImg) {
                      $('#' + connection.targetId)
                        .find('img')
                        .attr('src', './img/' + self.ex.data[i].solutionImg.src);
                    }
                    self.solutionTrue();
                    break;
                  }
                }
              }
              _setConnectionLabel(connection);
            });
          });
          // Fires an update for the given event
          //jsPlumb.fire("jsPlumbLinkerLoaded", _secondInstance);
        });
      }
    }
  }
</script>
