var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const PLUGIN_NAME = "rrweb/console@1";
var EventType = /* @__PURE__ */ ((EventType2) => {
  EventType2[EventType2["DomContentLoaded"] = 0] = "DomContentLoaded";
  EventType2[EventType2["Load"] = 1] = "Load";
  EventType2[EventType2["FullSnapshot"] = 2] = "FullSnapshot";
  EventType2[EventType2["IncrementalSnapshot"] = 3] = "IncrementalSnapshot";
  EventType2[EventType2["Meta"] = 4] = "Meta";
  EventType2[EventType2["Custom"] = 5] = "Custom";
  EventType2[EventType2["Plugin"] = 6] = "Plugin";
  return EventType2;
})(EventType || {});
var IncrementalSource = /* @__PURE__ */ ((IncrementalSource2) => {
  IncrementalSource2[IncrementalSource2["Mutation"] = 0] = "Mutation";
  IncrementalSource2[IncrementalSource2["MouseMove"] = 1] = "MouseMove";
  IncrementalSource2[IncrementalSource2["MouseInteraction"] = 2] = "MouseInteraction";
  IncrementalSource2[IncrementalSource2["Scroll"] = 3] = "Scroll";
  IncrementalSource2[IncrementalSource2["ViewportResize"] = 4] = "ViewportResize";
  IncrementalSource2[IncrementalSource2["Input"] = 5] = "Input";
  IncrementalSource2[IncrementalSource2["TouchMove"] = 6] = "TouchMove";
  IncrementalSource2[IncrementalSource2["MediaInteraction"] = 7] = "MediaInteraction";
  IncrementalSource2[IncrementalSource2["StyleSheetRule"] = 8] = "StyleSheetRule";
  IncrementalSource2[IncrementalSource2["CanvasMutation"] = 9] = "CanvasMutation";
  IncrementalSource2[IncrementalSource2["Font"] = 10] = "Font";
  IncrementalSource2[IncrementalSource2["Log"] = 11] = "Log";
  IncrementalSource2[IncrementalSource2["Drag"] = 12] = "Drag";
  IncrementalSource2[IncrementalSource2["StyleDeclaration"] = 13] = "StyleDeclaration";
  IncrementalSource2[IncrementalSource2["Selection"] = 14] = "Selection";
  IncrementalSource2[IncrementalSource2["AdoptedStyleSheet"] = 15] = "AdoptedStyleSheet";
  IncrementalSource2[IncrementalSource2["CustomElement"] = 16] = "CustomElement";
  return IncrementalSource2;
})(IncrementalSource || {});
const ORIGINAL_ATTRIBUTE_NAME = "__rrweb_original__";
const defaultLogConfig = {
  level: [
    "assert",
    "clear",
    "count",
    "countReset",
    "debug",
    "dir",
    "dirxml",
    "error",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "table",
    "time",
    "timeEnd",
    "timeLog",
    "trace",
    "warn"
  ],
  replayLogger: void 0
};
class LogReplayPlugin {
  constructor(config) {
    __publicField(this, "config");
    this.config = Object.assign(defaultLogConfig, config);
  }
  /**
   * generate a console log replayer which implement the interface ReplayLogger
   */
  getConsoleLogger() {
    const replayLogger = {};
    for (const level of this.config.level) {
      if (level === "trace") {
        replayLogger[level] = (data) => {
          const logger = console.log[ORIGINAL_ATTRIBUTE_NAME] ? console.log[ORIGINAL_ATTRIBUTE_NAME] : console.log;
          logger(
            ...data.payload.map((s) => JSON.parse(s)),
            this.formatMessage(data)
          );
        };
      } else {
        replayLogger[level] = (data) => {
          const logger = console[level][ORIGINAL_ATTRIBUTE_NAME] ? console[level][ORIGINAL_ATTRIBUTE_NAME] : console[level];
          logger(
            ...data.payload.map((s) => JSON.parse(s)),
            this.formatMessage(data)
          );
        };
      }
    }
    return replayLogger;
  }
  /**
   * format the trace data to a string
   * @param data - the log data
   */
  formatMessage(data) {
    if (data.trace.length === 0) {
      return "";
    }
    const stackPrefix = "\n	at ";
    let result = stackPrefix;
    result += data.trace.join(stackPrefix);
    return result;
  }
}
const getReplayConsolePlugin = (options) => {
  const replayLogger = (options == null ? void 0 : options.replayLogger) || new LogReplayPlugin(options).getConsoleLogger();
  return {
    handler(event, _isSync, context) {
      let logData = null;
      if (event.type === EventType.IncrementalSnapshot && event.data.source === IncrementalSource.Log) {
        logData = event.data;
      } else if (event.type === EventType.Plugin && event.data.plugin === PLUGIN_NAME) {
        logData = event.data.payload;
      }
      if (logData) {
        try {
          if (typeof replayLogger[logData.level] === "function") {
            replayLogger[logData.level](logData);
          }
        } catch (error) {
          if (context.replayer.config.showWarning) {
            console.warn(error);
          }
        }
      }
    }
  };
};
export {
  getReplayConsolePlugin
};
//# sourceMappingURL=rrweb-plugin-console-replay.js.map
