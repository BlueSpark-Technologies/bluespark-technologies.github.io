(function () {
  'use strict';

  var css_248z$3 = ":host {\n  position: fixed !important;\n  z-index: 2147483647 !important;\n  top: 0;\n  right: 0;\n}\n\n::slotted(*) {\n  all: unset !important;\n}\n\n#container {\n  background-color: #295ff6;\n  border-radius: 8px;\n  padding: 12px 24px;\n  margin: 16px;\n  width: 30vw;\n  right: 0;\n  top: 0;\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  color: #fff;\n  font-family: system-ui;\n  transform: translateX(calc(100% + 20px));\n  transition: all 0.5s cubic-bezier(0.3, -0.1, 1, 1);\n}\n\n#container.active {\n  transform: translateX(0);\n}\n\n#heading {\n  font-size: 16px;\n  margin: 4px 0;\n  font-weight: 600;\n  line-height: 1.4;\n}\n\n#heading-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  margin-bottom: 2px;\n}\n\n#heading-container div {\n  display: flex;\n  flex-direction: row;\n}\n\n#close-icon {\n  align-self: center;\n  cursor: pointer;\n}\n\n#content-container {\n  display: flex;\n  flex-direction: row;\n  width: 96%;\n}\n\n#content {\n  font-size: 13px;\n  line-height: 1.4;\n}\n\n#icon-container {\n  height: 20px;\n  width: 20px;\n  padding-right: 6px;\n  align-self: center;\n}\n\n#icon-container img {\n  height: 20px;\n  width: 20px;\n  background: #2a2a2a;\n  border-radius: 4px;\n}\n";

  var ObjectType;
  (function (ObjectType) {
      ObjectType["GROUP"] = "group";
      ObjectType["RULE"] = "rule";
  })(ObjectType || (ObjectType = {}));
  var Status;
  (function (Status) {
      Status["ACTIVE"] = "Active";
      Status["INACTIVE"] = "Inactive";
  })(Status || (Status = {}));
  var RuleType;
  (function (RuleType) {
      RuleType["REDIRECT"] = "Redirect";
      RuleType["CANCEL"] = "Cancel";
      RuleType["REPLACE"] = "Replace";
      RuleType["HEADERS"] = "Headers";
      RuleType["USERAGENT"] = "UserAgent";
      RuleType["SCRIPT"] = "Script";
      RuleType["QUERYPARAM"] = "QueryParam";
      RuleType["RESPONSE"] = "Response";
      RuleType["REQUEST"] = "Request";
      RuleType["DELAY"] = "Delay";
  })(RuleType || (RuleType = {}));
  var SourceKey;
  (function (SourceKey) {
      SourceKey["URL"] = "Url";
      SourceKey["HOST"] = "host";
      SourceKey["PATH"] = "path";
  })(SourceKey || (SourceKey = {}));
  var SourceOperator;
  (function (SourceOperator) {
      SourceOperator["EQUALS"] = "Equals";
      SourceOperator["CONTAINS"] = "Contains";
      SourceOperator["MATCHES"] = "Matches";
      SourceOperator["WILDCARD_MATCHES"] = "Wildcard_Matches";
  })(SourceOperator || (SourceOperator = {}));
  var AutoRecordingMode;
  (function (AutoRecordingMode) {
      AutoRecordingMode["CUSTOM"] = "custom";
      AutoRecordingMode["ALL_PAGES"] = "allPages";
  })(AutoRecordingMode || (AutoRecordingMode = {}));
  var StorageKey;
  (function (StorageKey) {
      StorageKey["SESSION_RECORDING_CONFIG"] = "sessionRecordingConfig";
  })(StorageKey || (StorageKey = {}));
  var ScriptCodeType;
  (function (ScriptCodeType) {
      ScriptCodeType["JS"] = "js";
      ScriptCodeType["CSS"] = "css";
  })(ScriptCodeType || (ScriptCodeType = {}));
  var ScriptType;
  (function (ScriptType) {
      ScriptType["URL"] = "url";
      ScriptType["CODE"] = "code";
  })(ScriptType || (ScriptType = {}));

  var cancelRuleIcon = "<svg\n    width=\"16\"\n    height=\"16\"\n    viewBox=\"0 0 20 20\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      d=\"M3.68014 5.09436C2.62708 6.44904 2 8.15129 2 10C2 14.4183 5.58172 18 10 18C11.8487 18 13.551 17.3729 14.9056 16.3199L3.68014 5.09436ZM5.09436 3.68014L16.3199 14.9056C17.3729 13.551 18 11.8487 18 10C18 5.58172 14.4183 2 10 2C8.15129 2 6.44904 2.62708 5.09436 3.68014ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z\"\n      fill=\"currentColor\"\n    />\n  </svg>";

  var delayRuleIcon = "<svg\n    width=\"16\"\n    height=\"16\"\n    viewBox=\"0 0 20 20\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n>\n    <path\n    d=\"M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM10 4C10.5523 4 11 4.44772 11 5V9.58579L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L9.29289 10.7071C9.10536 10.5196 9 10.2652 9 10V5C9 4.44772 9.44771 4 10 4Z\"\n    fill=\"currentColor\"\n    />\n</svg>";

  var headerRuleIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n  <path\n    d=\"M16.6666 7.5V4.16667H3.33329V7.5H16.6666ZM16.6666 9.16667H3.33329V15.8333H16.6666V9.16667ZM2.49996 2.5H17.5C17.9602 2.5 18.3333 2.8731 18.3333 3.33333V16.6667C18.3333 17.1269 17.9602 17.5 17.5 17.5H2.49996C2.03973 17.5 1.66663 17.1269 1.66663 16.6667V3.33333C1.66663 2.8731 2.03973 2.5 2.49996 2.5ZM4.16663 10H6.66663V14.1667H4.16663V10ZM4.16663 5H5.83329V6.66667H4.16663V5ZM7.49996 5H9.16663V6.66667H7.49996V5Z\"\n    fill=\"currentColor\"\n  />\n</svg>";

  var queryParamIcon = "<svg\n      width=\"16\"\n      height=\"16\"\n      viewBox=\"0 0 20 20\"\n      fill=\"none\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n    >\n      <path\n        d=\"M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z\"\n        fill=\"currentColor\"\n      />\n      <path\n        d=\"M10 12C9.44771 12 9 11.5523 9 11V10C9 9.44771 9.44772 9 10 9C10.5523 9 11 9.44771 11 10V11C11 11.5523 10.5523 12 10 12Z\"\n        fill=\"currentColor\"\n      />\n      <path\n        d=\"M8.5 14.5C8.5 13.6716 9.17157 13 10 13C10.8284 13 11.5 13.6716 11.5 14.5C11.5 15.3284 10.8284 16 10 16C9.17157 16 8.5 15.3284 8.5 14.5Z\"\n        fill=\"currentColor\"\n      />\n      <path\n        d=\"M10.3899 5.81137C9.4329 5.7658 8.63039 6.3004 8.48639 7.1644C8.3956 7.70917 7.88037 8.07719 7.3356 7.9864C6.79083 7.8956 6.42281 7.38037 6.51361 6.8356C6.86961 4.69961 8.8171 3.73421 10.4851 3.81363C11.3395 3.85432 12.2176 4.16099 12.8937 4.79278C13.5866 5.44027 14 6.36777 14 7.5C14 8.79131 13.4919 9.74892 12.6172 10.3321C11.8141 10.8675 10.8295 11 10 11C9.44772 11 9 10.5523 9 10C9 9.44771 9.44772 9 10 9C10.6705 9 11.1859 8.88252 11.5078 8.66795C11.7581 8.50109 12 8.2087 12 7.5C12 6.88224 11.7884 6.49723 11.5282 6.2541C11.2512 5.99526 10.848 5.83318 10.3899 5.81137Z\"\n        fill=\"currentColor\"\n      />\n    </svg>";

  var redirectRuleIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 20 20\" fill=\"none\">\n  <path\n    d=\"M15.0001 14.9025V13.3332L19.1667 15.8332L15.0001 18.3332V16.5911C12.4354 16.2247 10.2095 14.5485 9.16916 12.1209L9.16675 12.1153L9.16433 12.1209C7.98252 14.8785 5.27098 16.6665 2.27077 16.6665H1.66675V14.9998H2.27077C4.60427 14.9998 6.71324 13.6092 7.63246 11.4643L8.26011 9.99984L7.63246 8.53534C6.71324 6.39049 4.60427 4.99984 2.27077 4.99984H1.66675V3.33317H2.27077C5.27098 3.33317 7.98252 5.12115 9.16433 7.87878L9.16675 7.88435L9.16916 7.87878C10.2095 5.45117 12.4354 3.77502 15.0001 3.4086V1.6665L19.1667 4.1665L15.0001 6.6665V5.0972C13.1056 5.44786 11.4782 6.72209 10.7011 8.53534L10.0734 9.99984L10.7011 11.4643C11.4782 13.2776 13.1056 14.5518 15.0001 14.9025Z\"\n    fill=\"currentColor\"\n  />\n</svg>";

  var replaceRuleIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 20 20\" fill=\"none\">\n  <path\n    d=\"M10.8333 3.33317C8.67458 3.33317 6.75505 4.35861 5.53562 5.95212L7.5 7.9165H2.5V2.9165L4.34886 4.76536C5.87551 2.8765 8.21298 1.6665 10.8333 1.6665C15.4357 1.6665 19.1667 5.39746 19.1667 9.99984H17.5C17.5 6.31794 14.5153 3.33317 10.8333 3.33317ZM4.16667 9.99984C4.16667 13.6818 7.15143 16.6665 10.8333 16.6665C12.9921 16.6665 14.9117 15.6411 16.1311 14.0476L14.1667 12.0832H19.1667V17.0832L17.3178 15.2343C15.7912 17.1232 13.4537 18.3332 10.8333 18.3332C6.23096 18.3332 2.5 14.6022 2.5 9.99984H4.16667Z\"\n    fill=\"currentColor\"\n  />\n</svg>";

  var useragentRuleIcon = "<svg\n    width=\"16\"\n    height=\"16\"\n    viewBox=\"0 0 16 20\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n>\n    <path\n    d=\"M0 2C0 0.895432 0.89543 0 2 0H14C15.1046 0 16 0.89543 16 2V18C16 19.1046 15.1046 20 14 20H2C0.895431 20 0 19.1046 0 18V2ZM14 2L2 2V18H14V2Z\"\n    fill=\"currentColor\"\n    />\n    <path\n    d=\"M9 16C9 16.5523 8.55229 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55229 15 9 15.4477 9 16Z\"\n    fill=\"currentColor\"\n    />\n</svg>";

  var scriptRuleIcon = "<svg\n    width=\"16\"\n    height=\"16\"\n    viewBox=\"0 0 18 14\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n>\n    <path\n    fill-rule=\"evenodd\"\n    clip-rule=\"evenodd\"\n    d=\"M0 9C7.24238e-08 8.44771 0.447715 8 1 8L13 8C14.6569 8 16 6.65685 16 5L16 1C16 0.447715 16.4477 -7.24234e-08 17 0C17.5523 7.24233e-08 18 0.447715 18 1L18 5C18 7.76142 15.7614 10 13 10L1 10C0.447715 10 -7.24229e-08 9.55228 0 9Z\"\n    fill=\"currentColor\"\n    />\n    <path\n    fill-rule=\"evenodd\"\n    clip-rule=\"evenodd\"\n    d=\"M0.292893 9.70711C-0.0976311 9.31658 -0.097631 8.68342 0.292893 8.29289L4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289C6.09763 4.68342 6.09763 5.31658 5.70711 5.70711L2.41421 9L5.70711 12.2929C6.09763 12.6834 6.09763 13.3166 5.70711 13.7071C5.31658 14.0976 4.68342 14.0976 4.29289 13.7071L0.292893 9.70711Z\"\n    fill=\"currentColor\"\n    />\n</svg>";

  var responRuleIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 20 20\" fill=\"none\">\n  <path\n    d=\"M4.16667 15.7414H5.34517L13.1066 7.98L11.9281 6.80148L4.16667 14.5629V15.7414ZM17.5 17.4081H2.5V13.8726L13.6958 2.6767C14.0213 2.35126 14.5489 2.35126 14.8743 2.6767L17.2314 5.03372C17.5568 5.35916 17.5568 5.88679 17.2314 6.21223L7.7022 15.7414H17.5V17.4081ZM13.1066 5.62297L14.2851 6.80148L15.4636 5.62297L14.2851 4.44446L13.1066 5.62297Z\"\n    fill=\"currentColor\"\n  />\n</svg>";

  var requestRuleIcon = "<svg\n    width=\"16\"\n    height=\"16\"\n    viewBox=\"0 0 24 24\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n>\n    <path\n    d=\"M2 5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V10V19C22 20.1046 21.1046 21 20 21H9H4C3.99569 21 3.99137 21 3.98707 21C2.88845 20.993 2 20.1003 2 19V10V5ZM4 9H9H20V5H4V9ZM8 11H4V19H8V11ZM10 19H20V11H10V19Z\"\n    fill=\"currentColor\"\n    />\n</svg>";

  const registerCustomElement = (tagName, elementConstructor) => {
      if (!customElements.get(tagName)) {
          customElements.define(tagName, elementConstructor);
      }
  };
  const setInnerHTML = (element, content) => {
      try {
          element.innerHTML = content;
      }
      catch (e) {
          // @ts-ignore
          const trustedTypesPolicy = window.trustedTypes?.createPolicy?.("rq-html-policy", {
              createHTML: (html) => html,
          });
          element.innerHTML = trustedTypesPolicy.createHTML(content);
      }
  };
  const getEpochToMMSSFormat = (epochTime) => {
      const date = new Date(epochTime);
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      const seconds = date.getUTCSeconds().toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
  };
  const getRuleTypeIcon = (ruleType) => {
      switch (ruleType) {
          case RuleType.CANCEL:
              return cancelRuleIcon;
          case RuleType.DELAY:
              return delayRuleIcon;
          case RuleType.HEADERS:
              return headerRuleIcon;
          case RuleType.QUERYPARAM:
              return queryParamIcon;
          case RuleType.REDIRECT:
              return redirectRuleIcon;
          case RuleType.REPLACE:
              return replaceRuleIcon;
          case RuleType.USERAGENT:
              return useragentRuleIcon;
          case RuleType.SCRIPT:
              return scriptRuleIcon;
          case RuleType.RESPONSE:
              return responRuleIcon;
          case RuleType.REQUEST:
              return requestRuleIcon;
          default:
              return "";
      }
  };

  var CloseIcon = "<svg width=\"8\" height=\"8\" viewBox=\"0 0 8 8\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M0.167368 0.167368C0.390524 -0.0557892 0.752333 -0.0557892 0.97549 0.167368L4 3.19188L7.02451 0.167368C7.24767 -0.0557892 7.60948 -0.0557892 7.83263 0.167368C8.05579 0.390524 8.05579 0.752333 7.83263 0.97549L4.80812 4L7.83263 7.02451C8.05579 7.24767 8.05579 7.60948 7.83263 7.83263C7.60948 8.05579 7.24767 8.05579 7.02451 7.83263L4 4.80812L0.97549 7.83263C0.752333 8.05579 0.390524 8.05579 0.167368 7.83263C-0.0557892 7.60948 -0.0557892 7.24767 0.167368 7.02451L3.19188 4L0.167368 0.97549C-0.0557892 0.752333 -0.0557892 0.390524 0.167368 0.167368Z\" fill=\"#E3E3E3\"/>\n</svg>";

  class RQToast extends HTMLElement {
      #shadowRoot;
      #time = 10000;
      constructor() {
          super();
          this.#shadowRoot = this.attachShadow({ mode: "closed" });
          setInnerHTML(this.#shadowRoot, this._getDefaultMarkup());
          this.show = this.show.bind(this);
          this.hide = this.hide.bind(this);
      }
      connectedCallback() {
          const heading = this.#shadowRoot.getElementById("heading");
          heading.textContent = this.attributes.getNamedItem("heading")?.value ?? null;
          const time = Number(this.attributes.getNamedItem("time")?.value) ?? null;
          if (time) {
              this.#time = time;
          }
          const iconPath = this.attributes.getNamedItem("icon-path")?.value;
          if (iconPath) {
              const iconContainer = this.#shadowRoot.getElementById("icon-container");
              const icon = document.createElement("img");
              icon.setAttribute("src", iconPath);
              iconContainer?.appendChild(icon);
          }
          this.#shadowRoot.getElementById("close-icon").addEventListener("click", this.hide);
          this.show();
      }
      _getDefaultMarkup() {
          return `
    <style>${css_248z$3}</style>
    <div id="container">
        <div id="heading-container">
          <div>
            <div id="icon-container"></div>
            <div id="heading"></div>
          </div>
          <div id="close-icon">${CloseIcon}</div>
        </div>
        <div id="content-container">
          <slot id="content" name="content"></slot>
        </div>
     </div>
    `;
      }
      show() {
          setTimeout(() => {
              this.#shadowRoot.getElementById("container").classList.add("active");
              setTimeout(this.hide, this.#time);
          }, 300);
      }
      hide() {
          this.#shadowRoot.getElementById("container").classList.remove("active");
      }
  }
  registerCustomElement("rq-toast", RQToast);

  var css_248z$2 = ":host {\n  position: fixed !important;\n  z-index: 2147483647 !important;\n}\n\n#container {\n  background-color: #212121;\n  border-radius: 24px;\n  padding: 4px;\n  margin: auto;\n  color: #fff;\n  font-family: system-ui;\n  font-size: 13px;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 4px;\n  white-space: nowrap;\n  cursor: move;\n  display: none;\n}\n\n#container.visible {\n  display: flex;\n}\n\n.action {\n  cursor: pointer;\n  flex-shrink: 0;\n  -webkit-transition: border 0.2s;\n  -moz-transition: border 0.2s;\n  transition: border 0.2s;\n  border: 1px solid transparent;\n}\n\n.action:hover {\n  border: 1px solid #161a25;\n}\n\n.stop-recording {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 8px 16px;\n  border-radius: 35px;\n  background: #e43434;\n  font-size: 13px;\n  font-weight: 500;\n  color: #ffffff;\n  box-sizing: border-box;\n  margin-left: 7px;\n}\n\n.stop-recording svg {\n  width: 18px;\n  height: 18px;\n  margin-right: 7px;\n  flex-shrink: 0;\n}\n\n.discard-recording {\n  gap: 8px;\n  padding: 8px;\n  display: flex;\n  align-items: center;\n  border-radius: 35px;\n  background: #51525c;\n}\n\n.discard-recording svg {\n  width: 18px;\n  height: 18px;\n}\n\n.recording-time {\n  min-width: 37px;\n}\n\n.recording-info-icon {\n  display: none;\n  margin-right: 8px;\n  position: relative;\n  align-items: center;\n  justify-content: center;\n}\n\n.recording-info-icon.visible {\n  display: flex;\n}\n\n.recording-info-icon.visible + .stop-recording {\n  margin-left: 0;\n}\n\n.recording-info-icon svg {\n  width: 24px;\n  height: 24px;\n  color: #ffffff;\n  cursor: pointer;\n}\n\n.recording-info-icon:hover::after {\n  display: block;\n}\n\n.recording-info-icon::after {\n  display: none;\n  content: attr(data-tooltip);\n  white-space: break-spaces;\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  transform: translate(-30%, -112%);\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 20px;\n  letter-spacing: 0.25px;\n  width: 218px;\n  max-width: 232px;\n  padding: 8px 12px;\n  border-radius: 4px;\n  background: #000000;\n  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.48);\n}\n\n@keyframes blink {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.recording-icon {\n  flex-shrink: 0;\n  display: inline-block;\n  margin-left: 12px;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #e43434;\n  box-sizing: border-box;\n  animation: blink 1s cubic-bezier(0.5, 0, 1, 1) infinite alternate;\n}\n";

  var BinIcon = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M3.47222 1.33333C3.47222 0.596954 4.09405 0 4.86111 0H9.02778C9.79484 0 10.4167 0.596954 10.4167 1.33333V2.66667H11.7984C11.8027 2.66663 11.807 2.66663 11.8113 2.66667H13.1944C13.578 2.66667 13.8889 2.96514 13.8889 3.33333C13.8889 3.70152 13.578 4 13.1944 4H12.4522L11.8499 12.095C11.7979 12.7927 11.1932 13.3333 10.4645 13.3333H3.42439C2.69572 13.3333 2.09094 12.7927 2.03903 12.095L1.43672 4H0.694444C0.310913 4 0 3.70152 0 3.33333C0 2.96514 0.310913 2.66667 0.694444 2.66667H2.0776C2.08191 2.66663 2.08621 2.66663 2.0905 2.66667H3.47222V1.33333ZM4.86111 2.66667H9.02778V1.33333H4.86111V2.66667ZM2.82915 4L3.42439 12H10.4645L11.0597 4H2.82915ZM5.55555 5.33333C5.93909 5.33333 6.25 5.63181 6.25 6V10C6.25 10.3682 5.93909 10.6667 5.55555 10.6667C5.17202 10.6667 4.86111 10.3682 4.86111 10V6C4.86111 5.63181 5.17202 5.33333 5.55555 5.33333ZM8.33333 5.33333C8.71686 5.33333 9.02778 5.63181 9.02778 6V10C9.02778 10.3682 8.71686 10.6667 8.33333 10.6667C7.9498 10.6667 7.63889 10.3682 7.63889 10V6C7.63889 5.63181 7.9498 5.33333 8.33333 5.33333Z\" fill=\"white\"/>\n</svg>";

  var StopRecordingIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n  <path\n    d=\"M10.8333 18.3332C6.23096 18.3332 2.5 14.6022 2.5 9.99984C2.5 5.39746 6.23096 1.6665 10.8333 1.6665C15.4357 1.6665 19.1667 5.39746 19.1667 9.99984C19.1667 14.6022 15.4357 18.3332 10.8333 18.3332ZM10.8333 16.6665C14.5153 16.6665 17.5 13.6818 17.5 9.99984C17.5 6.31794 14.5153 3.33317 10.8333 3.33317C7.15143 3.33317 4.16667 6.31794 4.16667 9.99984C4.16667 13.6818 7.15143 16.6665 10.8333 16.6665ZM8.33333 7.49984H13.3333V12.4998H8.33333V7.49984Z\"\n    fill=\"currentColor\"\n  />\n</svg>";

  var InfoIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\">\n  <path d=\"M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z\" fill=\"currentColor\"/>\n</svg>";

  var RQDraggableWidgetEvent;
  (function (RQDraggableWidgetEvent) {
      RQDraggableWidgetEvent["MOVED"] = "moved";
  })(RQDraggableWidgetEvent || (RQDraggableWidgetEvent = {}));
  class RQDraggableWidget extends HTMLElement {
      #isDragging;
      #defaultPosition;
      shadowRoot;
      constructor(defaultPosition) {
          super();
          this.#defaultPosition = defaultPosition;
      }
      connectedCallback() {
          this.addDragListeners();
      }
      addDragListeners() {
          // allow widget to be draggable using mouse events
          this.addEventListener("mousedown", (evt) => {
              evt.preventDefault();
              let x = evt.clientX;
              let y = evt.clientY;
              const onMouseMove = (evt) => {
                  evt.preventDefault();
                  this.#isDragging = true;
                  const dX = evt.clientX - x;
                  const dY = evt.clientY - y;
                  x = evt.clientX;
                  y = evt.clientY;
                  const xPos = Math.min(Math.max(this.offsetLeft + dX, 0), window.innerWidth - this.offsetWidth);
                  const yPos = Math.min(Math.max(this.offsetTop + dY, 0), window.innerHeight - this.offsetHeight);
                  this.moveToPostion({ top: yPos, left: xPos });
              };
              const onMouseUp = () => {
                  // Fallback incase click event is not triggered. Timeout because we need to stopPropogation in case isDragging=true. Else it will propogate it and cause weird behaviour
                  // This happens when mousedown and mouseup doesn't happen on the same element
                  // Similar to this https://melkornemesis.medium.com/handling-javascript-mouseup-event-outside-element-b0a34090bb56
                  setTimeout(() => {
                      document.removeEventListener("mousemove", onMouseMove);
                      document.removeEventListener("mouseup", onMouseUp);
                      this.#isDragging = false;
                  }, 100);
              };
              document.addEventListener("mousemove", onMouseMove);
              document.addEventListener("mouseup", onMouseUp);
          });
          this.addEventListener("mouseleave", () => {
              // Fallback to set isDragging false on mouseleave. Timeout used so that event.stopPropagation works when isDragging is true
              setTimeout(() => {
                  this.#isDragging = false;
              }, 100);
          });
          window.addEventListener("resize", () => {
              const boundingRect = this.getBoundingClientRect();
              if (boundingRect.left + boundingRect.width > window.innerWidth ||
                  boundingRect.top + boundingRect.height > window.innerHeight) {
                  this.moveToPostion(this.#defaultPosition);
              }
          });
          this.shadowRoot.addEventListener("click", (evt) => {
              if (this.#isDragging) {
                  // disable all clicks while widget is dragging
                  evt.stopPropagation();
                  this.#isDragging = false;
              }
          }, true);
      }
      moveToPostion(position) {
          const getCSSPostionValue = (num) => (typeof num !== "undefined" ? `${num}px` : "auto");
          this.style.left = getCSSPostionValue(position.left);
          this.style.top = getCSSPostionValue(position.top);
          this.style.bottom = getCSSPostionValue(position.bottom);
          this.style.right = getCSSPostionValue(position.right);
          this.dispatchEvent(new CustomEvent(RQDraggableWidgetEvent.MOVED, { detail: position }));
      }
  }

  var RQSessionRecordingWidgetEvent;
  (function (RQSessionRecordingWidgetEvent) {
      RQSessionRecordingWidgetEvent["STOP_RECORDING"] = "stop";
      RQSessionRecordingWidgetEvent["DISCARD_RECORDING"] = "discard";
  })(RQSessionRecordingWidgetEvent || (RQSessionRecordingWidgetEvent = {}));
  const TAG_NAME$3 = "rq-session-recording-widget";
  const DEFAULT_POSITION$2 = { left: 30, bottom: 30 };
  const EXPLICIT_RECORDING_LIMIT = 5 * 60 * 1000; // 5 mins * 60 secs * 1000 ms
  class RQSessionRecordingWidget extends RQDraggableWidget {
      #currentRecordingTime = 0;
      #recordingTimerIntervalId;
      constructor() {
          super(DEFAULT_POSITION$2);
          this.shadowRoot = this.attachShadow({ mode: "closed" });
          setInnerHTML(this.shadowRoot, this._getDefaultMarkup());
          this.show = this.show.bind(this);
          this.hide = this.hide.bind(this);
      }
      connectedCallback() {
          super.connectedCallback();
          this.addListeners();
          this.show();
      }
      addListeners() {
          this.shadowRoot.querySelector(".stop-recording").addEventListener("click", (evt) => {
              evt.stopPropagation();
              this.resetTimer();
              this.triggerEvent(RQSessionRecordingWidgetEvent.STOP_RECORDING);
          });
          this.shadowRoot.querySelector(".discard-recording").addEventListener("click", (evt) => {
              evt.stopPropagation();
              this.triggerEvent(RQSessionRecordingWidgetEvent.DISCARD_RECORDING);
              this.hide();
          });
          this.addEventListener("show", (evt) => {
              this.show(evt.detail?.position, evt.detail?.currentRecordingTime);
          });
          this.addEventListener("hide", this.hide);
      }
      triggerEvent(name, detail) {
          this.dispatchEvent(new CustomEvent(name, { detail }));
      }
      _getDefaultMarkup() {
          const tooltipContent = "Session recording is limited to the most recent 5 minutes. The recording is still active, but you can only view the last 5 minutes of the session.";
          return `
      <style>${css_248z$2}</style>
      <div id="container">
          <span class="recording-icon"></span>
          <span class="recording-time">00:00</span>
          <div title="Recording info" class="recording-info-icon" data-tooltip="${tooltipContent}">
            ${InfoIcon}
          </div>
          <div class="action stop-recording">${StopRecordingIcon} Stop & watch</div>
          <div class="action discard-recording" title="Discard">${BinIcon}</div>
      </div>
    `;
      }
      show(position = DEFAULT_POSITION$2, currentRecordingTime = null) {
          this.moveToPostion(position);
          this.setAttribute("draggable", "true");
          const container = this.getContainer();
          container.classList.add("visible");
          if (currentRecordingTime === null)
              return;
          this.#currentRecordingTime = currentRecordingTime;
          if (this.#recordingTimerIntervalId) {
              clearInterval(this.#recordingTimerIntervalId);
          }
          if (this.#currentRecordingTime < EXPLICIT_RECORDING_LIMIT) {
              setInnerHTML(container.querySelector(".recording-time"), getEpochToMMSSFormat(this.#currentRecordingTime));
          }
          this.#recordingTimerIntervalId = setInterval(() => {
              this.#currentRecordingTime = this.#currentRecordingTime + 1000;
              if (this.#currentRecordingTime < EXPLICIT_RECORDING_LIMIT) {
                  setInnerHTML(container.querySelector(".recording-time"), getEpochToMMSSFormat(this.#currentRecordingTime));
              }
              else {
                  setInnerHTML(container.querySelector(".recording-time"), "05:00");
                  container.querySelector(".recording-info-icon").classList.add("visible");
                  clearInterval(this.#recordingTimerIntervalId);
              }
          }, this.#currentRecordingTime < EXPLICIT_RECORDING_LIMIT ? 1000 : 0);
      }
      resetTimer() {
          if (this.#recordingTimerIntervalId) {
              clearInterval(this.#recordingTimerIntervalId);
          }
          this.#currentRecordingTime = 0;
          this.#recordingTimerIntervalId = null;
          setInnerHTML(this.getContainer().querySelector(".recording-time"), "00:00");
          this.getContainer().querySelector(".recording-info-icon").classList.remove("visible");
      }
      hide() {
          this.resetTimer();
          this.getContainer().classList.remove("visible");
      }
      getContainer() {
          return this.shadowRoot.getElementById("container");
      }
  }
  registerCustomElement(TAG_NAME$3, RQSessionRecordingWidget);

  var ReplayLastFiveMinuteIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n  <path\n    d=\"M18.3333 9.99984C18.3333 5.39746 14.6023 1.6665 9.99996 1.6665C7.48671 1.6665 5.23331 2.77908 3.70543 4.53857L1.66663 2.49984V7.49984H6.66663L4.88739 5.72103C6.11032 4.26136 7.94674 3.33317 9.99996 3.33317C13.6819 3.33317 16.6666 6.31794 16.6666 9.99984C16.6666 13.6818 13.6819 16.6665 9.99996 16.6665C6.31806 16.6665 3.33329 13.6818 3.33329 9.99984H1.66663C1.66663 14.6022 5.39758 18.3332 9.99996 18.3332C14.6023 18.3332 18.3333 14.6022 18.3333 9.99984ZM12.0833 8.33317V7.08317H7.91663V10.6248H10.5208C10.8085 10.6248 11.0416 10.858 11.0416 11.1457C11.0416 11.4333 10.8085 11.6665 10.5208 11.6665H7.91663V12.9165H10.5208C11.4988 12.9165 12.2916 12.1237 12.2916 11.1457C12.2916 10.1677 11.4988 9.37484 10.5208 9.37484H9.16663V8.33317H12.0833Z\"\n    fill=\"currentColor\"\n  />\n</svg>";

  var RQLogoSmall = "<svg width=\"251\" height=\"251\" viewBox=\"0 0 251 251\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M124.408 245.868V188.238C104.504 188.529 82.7544 186.943 60.1611 182.339L60.0545 182.235V216.575C60.0545 223.437 60.7942 228.978 62.2736 233.201C63.7529 237.423 65.8487 240.722 68.5609 243.097C71.5197 245.472 75.0949 247.055 79.2864 247.847C83.7246 248.903 88.7791 249.43 94.4501 249.43C100.121 249.43 105.792 249.035 111.463 248.243C117.381 247.451 121.695 246.66 124.408 245.868Z\" fill=\"white\"/>\n<path d=\"M124.408 169.866H127.147C152.451 169.356 180.05 165.599 203.571 154.848L203.554 154.824C214.403 148.49 223.773 139.518 231.663 127.906C239.553 116.295 243.498 102.308 243.498 85.9467C243.498 59.821 234.868 39.1052 217.609 23.7992C200.349 8.4932 174.707 0.84021 140.681 0.84021C128.106 0.84021 116.271 1.6319 105.176 3.21527C94.0803 4.53475 84.341 6.77789 75.9578 9.94465C71.0266 11.7919 67.0816 14.2989 64.1228 17.4657C61.4106 20.3685 60.0545 24.5909 60.0545 30.1327V96.5095C71.3817 98.242 114.382 101.954 124.038 101.543V57.8418C126.75 57.314 129.216 56.9182 131.435 56.6543C133.654 56.3904 136.612 56.2584 140.311 56.2584C153.379 56.2584 162.871 58.8974 168.789 64.1753C174.953 69.1893 178.035 76.7103 178.035 86.7384C178.035 96.7664 175.323 104.419 169.899 109.697C164.474 114.711 157.077 117.218 147.708 117.218H124.038V117.008C123.974 117.109 123.915 117.21 123.861 117.313C87.9797 115.588 66.1922 114.066 60.0404 113.204L60.0399 113.194L42.9936 111.502C41.4373 111.348 40.2998 109.961 40.4529 108.404L41.3754 99.0229C41.6423 96.3086 38.2948 94.8199 36.4615 96.8375L0.888601 135.986C-0.0859492 137.058 -0.0924867 138.694 0.873451 139.776L29.4492 171.786C31.0921 173.627 34.1369 172.635 34.3782 170.181L35.0406 163.445C35.2015 161.809 36.7162 160.655 38.336 160.934L60.0545 164.671V164.802L60.1611 164.695C73.4489 166.933 97.4782 170.207 124.408 169.908V169.866Z\" fill=\"white\"/>\n<path d=\"M175.076 223.305L153.644 186.439C181.486 183.412 203.494 177.208 215.783 172.246C220.496 178.807 225.172 185.139 229.813 191.241C238.443 202.589 245.224 212.881 250.155 222.117C247.689 231.354 243.128 238.479 236.471 243.493C230.06 248.243 222.786 250.618 214.65 250.618C209.225 250.618 204.541 249.958 200.596 248.639C196.651 247.319 193.199 245.472 190.24 243.097C187.281 240.722 184.569 237.819 182.103 234.388C179.638 230.958 177.295 227.263 175.076 223.305Z\" fill=\"white\"/>\n</svg>";

  var css_248z$1 = ":host {\n  position: fixed !important;\n  z-index: 2147483647 !important;\n}\n\n#container {\n  font-family: system-ui;\n  white-space: nowrap;\n  cursor: move;\n  border-radius: 48px;\n  background: #161a25;\n  box-sizing: border-box;\n  padding: 4px;\n  position: relative;\n  align-items: center;\n  display: none;\n}\n\n#container.visible {\n  display: flex;\n}\n\n.watch-replay,\n.watch-replay .rq-logo,\n.watch-replay .btn-text {\n  -webkit-transition: all 0.3s;\n  -moz-transition: all 0.3s;\n  transition: all 0.3s;\n}\n\n.watch-replay {\n  flex-shrink: 0;\n  margin: 0;\n  padding: 0;\n  border: none;\n  border-radius: 35px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  position: relative;\n  background: #004eeb;\n  max-width: 36px;\n  min-width: 36px;\n  overflow: hidden;\n}\n\n.rq-logo {\n  padding: 6px;\n  width: 36px;\n  color: #ffffff;\n  border-radius: 50px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  background: transparent;\n}\n\n.rq-logo svg {\n  width: 24px;\n  height: 24px;\n  color: #ffffff;\n}\n\n.watch-replay .btn-text {\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  column-gap: 8px;\n  padding: 8px 16px;\n  font-size: 13px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  transform: scaleX(0);\n  transform-origin: left center;\n}\n\n.watch-replay:hover {\n  min-width: 196px;\n}\n\n.watch-replay:hover .rq-logo {\n  opacity: 0;\n}\n\n.watch-replay:hover .btn-text {\n  opacity: 1;\n  transform: scaleX(1);\n}\n";

  var RQSessionAutoModeRecordingWidgetEvent;
  (function (RQSessionAutoModeRecordingWidgetEvent) {
      RQSessionAutoModeRecordingWidgetEvent["WATCH"] = "watch";
  })(RQSessionAutoModeRecordingWidgetEvent || (RQSessionAutoModeRecordingWidgetEvent = {}));
  const TAG_NAME$2 = "rq-session-recording-auto-mode-widget";
  const DEFAULT_POSITION$1 = { left: 30, bottom: 30 };
  class RQSessionRecordingAutoModeWidget extends RQDraggableWidget {
      constructor() {
          super(DEFAULT_POSITION$1);
          this.shadowRoot = this.attachShadow({ mode: "closed" });
          setInnerHTML(this.shadowRoot, this._getDefaultMarkup());
          this.show = this.show.bind(this);
          this.hide = this.hide.bind(this);
      }
      connectedCallback() {
          super.connectedCallback();
          this.addListeners();
          this.show();
      }
      addListeners() {
          this.shadowRoot.querySelector(".watch-replay").addEventListener("click", (evt) => {
              evt.stopPropagation();
              this.triggerEvent(RQSessionAutoModeRecordingWidgetEvent.WATCH);
          });
          this.addEventListener("show", (evt) => {
              this.show(evt.detail?.position);
          });
          this.addEventListener("hide", this.hide);
      }
      triggerEvent(name, detail) {
          this.dispatchEvent(new CustomEvent(name, { detail }));
      }
      _getDefaultMarkup() {
          return `
    <style>${css_248z$1}</style>
    <div id="container">
      <button class="watch-replay">
        <span class="rq-logo">${RQLogoSmall}</span>
        <span class="btn-text">${ReplayLastFiveMinuteIcon} Watch last 5 min replay</span>
      </button>
    </div>
    `;
      }
      show(position = DEFAULT_POSITION$1) {
          this.moveToPostion(position);
          this.setAttribute("draggable", "true");
          this.getContainer().classList.add("visible");
      }
      hide() {
          this.getContainer().classList.remove("visible");
      }
      getContainer() {
          return this.shadowRoot.getElementById("container");
      }
  }
  registerCustomElement(TAG_NAME$2, RQSessionRecordingAutoModeWidget);

  var CheckIcon = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<mask id=\"mask0_2834_1705\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"16\" height=\"16\">\n<rect width=\"16\" height=\"16\" fill=\"#D9D9D9\"/>\n</mask>\n<g mask=\"url(#mask0_2834_1705)\">\n<path d=\"M7.13333 10.4833L11.1667 6.46667L10.2 5.5L7.13333 8.56667L5.76667 7.2L4.81667 8.16667L7.13333 10.4833ZM8 14.5333C7.1 14.5333 6.25 14.3667 5.45 14.0333C4.66111 13.6889 3.96667 13.2222 3.36667 12.6333C2.77778 12.0333 2.31111 11.3389 1.96667 10.55C1.63333 9.75 1.46667 8.9 1.46667 8C1.46667 7.08889 1.63333 6.23889 1.96667 5.45C2.31111 4.66111 2.77778 3.97222 3.36667 3.38333C3.96667 2.78333 4.66111 2.31667 5.45 1.98333C6.25 1.63889 7.1 1.46667 8 1.46667C8.91111 1.46667 9.76111 1.63889 10.55 1.98333C11.3389 2.31667 12.0278 2.78333 12.6167 3.38333C13.2167 3.97222 13.6833 4.66111 14.0167 5.45C14.3611 6.23889 14.5333 7.08889 14.5333 8C14.5333 8.9 14.3611 9.75 14.0167 10.55C13.6833 11.3389 13.2167 12.0333 12.6167 12.6333C12.0278 13.2222 11.3389 13.6889 10.55 14.0333C9.76111 14.3667 8.91111 14.5333 8 14.5333ZM8 13.15C9.43333 13.15 10.65 12.65 11.65 11.65C12.65 10.65 13.15 9.43333 13.15 8C13.15 6.56667 12.65 5.35 11.65 4.35C10.65 3.35 9.43333 2.85 8 2.85C6.56667 2.85 5.35 3.35 4.35 4.35C3.35 5.35 2.85 6.56667 2.85 8C2.85 9.43333 3.35 10.65 4.35 11.65C5.35 12.65 6.56667 13.15 8 13.15Z\" fill=\"#28C07A\"/>\n</g>\n</svg>";

  var PendingIcon = "<svg width=\"16\" height=\"17\" viewBox=\"0 0 16 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<mask id=\"mask0_2834_1396\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"16\" height=\"17\">\n<rect y=\"0.165527\" width=\"16\" height=\"16\" fill=\"#D9D9D9\"/>\n</mask>\n<g mask=\"url(#mask0_2834_1396)\">\n<path d=\"M8.01667 14.6989C7.11667 14.6989 6.27222 14.5322 5.48333 14.1989C4.69444 13.8544 4 13.3877 3.4 12.7989C2.81111 12.1989 2.34444 11.5044 2 10.7155C1.66667 9.91553 1.5 9.06553 1.5 8.16553C1.5 7.25442 1.66667 6.40442 2 5.61553C2.34444 4.82664 2.81111 4.13775 3.4 3.54886C4 2.94886 4.69444 2.48219 5.48333 2.14886C6.28333 1.80442 7.13333 1.63219 8.03333 1.63219C9.01111 1.63219 9.93333 1.84331 10.8 2.26553C11.6778 2.68775 12.4389 3.27664 13.0833 4.03219L8.03333 9.08219V3.01553C6.6 3.01553 5.38333 3.51553 4.38333 4.51553C3.38333 5.51553 2.88333 6.73219 2.88333 8.16553C2.88333 9.59886 3.38333 10.8155 4.38333 11.8155C5.38333 12.8155 6.6 13.3155 8.03333 13.3155C8.8 13.3155 9.52222 13.1544 10.2 12.8322C10.8889 12.51 11.4778 12.06 11.9667 11.4822V13.3655C11.4 13.81 10.7778 14.1433 10.1 14.3655C9.43333 14.5877 8.73889 14.6989 8.01667 14.6989ZM13.1667 12.1655L13.15 6.56553H14.4667L14.4833 12.1655H13.1667ZM13.8333 14.6489C13.6444 14.6489 13.4833 14.5822 13.35 14.4489C13.2167 14.3155 13.15 14.1544 13.15 13.9655C13.15 13.7766 13.2111 13.6155 13.3333 13.4822C13.4667 13.3489 13.6278 13.2822 13.8167 13.2822C14.0167 13.2822 14.1778 13.3489 14.3 13.4822C14.4333 13.6155 14.5 13.7766 14.5 13.9655C14.5 14.1544 14.4333 14.3155 14.3 14.4489C14.1778 14.5822 14.0222 14.6489 13.8333 14.6489Z\" fill=\"#E09400\"/>\n</g>\n</svg>";

  var css_248z = ":host {\n  position: fixed !important;\n  z-index: 2147483647 !important;\n  top: 16px;\n  right: 16px;\n}\n\n#container {\n  border-radius: 1rem;\n  padding: 12px 1rem;\n  display: flex;\n  flex-direction: column;\n  color: #fff;\n  font-family: system-ui;\n  background: #1a1a1a;\n  box-shadow: 0px 0px 0px 4px rgba(255, 255, 255, 0.16), 0px 16px 32px 0px rgba(0, 0, 0, 0.24);\n  border: 1px solid #5c5b5b;\n  cursor: move;\n  width: 420px;\n  transition: all 0.2s;\n}\n\n#container.minimized {\n  width: fit-content;\n  height: 56px;\n  padding: 6px;\n  border-radius: 20px;\n}\n\n#container.minimized #test-rule-container,\n#container.minimized #heading-container,\n#container.minimized #info-container {\n  display: none;\n}\n\n#rule-name {\n  font-size: 12px;\n  margin: 4px 0;\n  font-weight: bolder;\n  line-height: 1.4;\n  max-width: 290px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n#heading-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 4px;\n}\n\n#logo-container {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n#heading-container div {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-content: center;\n}\n\n#actions-container {\n  display: flex;\n  flex-direction: row;\n  gap: 4px;\n}\n\n#actions-container button {\n  background: none;\n  border: none;\n  color: #fff;\n  transition: all 0.2s;\n  cursor: pointer;\n  border-radius: 4px;\n  padding: 8px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#actions-container button:hover {\n  background: #383838;\n}\n\n#explicit-widget-container {\n  background: #282828;\n  border-radius: 8px;\n  padding: 12px;\n  margin-top: 8px;\n}\n\n#implicit-widget-container {\n  padding: 0 4px;\n  margin-top: 8px;\n}\n\n#rule-status-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n\n#test-rule-details {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 4px;\n}\n\n#info-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  gap: 6px;\n  margin-top: 8px;\n}\n\n#info-icon {\n  align-self: flex-start;\n}\n\n#rule-status-comment {\n  align-self: center;\n}\n\n#heading-logo {\n  height: 16px;\n  width: 16px;\n}\n\n#logo-text {\n  color: #fff;\n  font-size: 11px;\n  font-weight: 500;\n}\n\n#view-result-btn {\n  all: unset;\n  background: #1e69ff;\n  color: #fff;\n  border-radius: 4px;\n  padding: 4px 12px;\n  font-size: 12px;\n}\n\n#view-result-btn:hover {\n  cursor: pointer;\n  border-color: #0f4cd9;\n  background: #0f4cd9;\n}\n\n#rule-status {\n  display: flex;\n  flex-wrap: nowrap;\n  justify-content: center;\n  gap: 4px;\n}\n\n#rule-applied-status,\n#rule-not-applied-status {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  letter-spacing: 1px;\n  font-size: 10px;\n  font-weight: 500;\n  margin-top: -3px;\n}\n\n#rule-applied-status {\n  color: #28c07a;\n}\n\n#rule-not-applied-status {\n  color: #e09400;\n}\n\n#minimized-details {\n  display: none;\n  pointer-events: none;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  gap: 3px;\n}\n\n#minimized-details.visible {\n  display: flex;\n  pointer-events: auto;\n}\n\n#minimized-logo svg {\n  height: 16px;\n  width: 16px;\n}\n\n#test-rule-minimized-btn {\n  padding: 0;\n  background: transparent;\n  border: none;\n}\n\n#test-rule-minimized-btn span {\n  padding: 6px;\n  border-radius: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n}\n#test-rule-minimized-btn span svg {\n  height: 20px;\n  width: 20px;\n}\n\n.secondary-text {\n  font-size: 11px;\n  color: #b0b0b5b3;\n}\n\n.hidden {\n  display: none !important;\n}\n\na {\n  color: #9370db;\n}\n\n.warning {\n  background: #5c3111;\n}\n\n.success {\n  background: #104b2f;\n}\n\n#applied-rules-list {\n  margin-top: 8px;\n  max-height: 200px;\n  overflow-y: auto;\n  padding-right: 4px;\n}\n\n#applied-rules-list::-webkit-scrollbar {\n  width: 8px;\n  background: transparent;\n}\n\n#applied-rules-list::-webkit-scrollbar-thumb {\n  background: #353535;\n  border-radius: 8px;\n}\n\n#applied-rules-list-header {\n  font-size: 13px;\n  color: #fff;\n  font-weight: 500;\n}\n\n.applied-rule-list-item {\n  border-radius: 8px;\n  background: #282828;\n  padding: 12px;\n  color: #fff;\n  font-size: 13px;\n  font-weight: 500;\n  letter-spacing: 0.25px;\n  margin-top: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n}\n\n.applied-rule-list-item:hover {\n  background: #383838;\n}\n\n.applied-rule-list-item:hover .applied-rule-arrow-icon {\n  opacity: 1;\n}\n\n.applied-rule-list-item:first-child {\n  margin-top: 0;\n}\n\n.applied-rule-item-details {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.applied-rule-icon {\n  align-self: center;\n}\n\n.applied-rule-icon svg {\n  width: 14px;\n  height: 14px;\n  position: relative;\n  top: 2px;\n}\n\n.applied-rule-arrow-icon {\n  transform: scale(1.2);\n  align-self: center;\n  transition: 0.2s all;\n  opacity: 0;\n}\n\n.applied-rule-name {\n  max-width: 300px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n";

  var RQLogo = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n  <path d=\"M7.98439 15.6591V11.9822C6.71565 12.0008 5.32921 11.8996 3.88899 11.6058L3.8822 11.5992V13.7902C3.8822 14.2279 3.92935 14.5815 4.02366 14.8509C4.11796 15.1203 4.25156 15.3307 4.42445 15.4823C4.61305 15.6338 4.84095 15.7348 5.10814 15.7853C5.39105 15.8527 5.71325 15.8864 6.07475 15.8864C6.43625 15.8864 6.79774 15.8611 7.15924 15.8106C7.53645 15.7601 7.8115 15.7096 7.98439 15.6591Z\" fill=\"url(#paint0_linear_2826_2722)\"/>\n  <path d=\"M7.98439 10.81H8.15909C9.77207 10.7775 11.5313 10.5378 13.0307 9.85185L13.0296 9.85029C13.7212 9.4462 14.3184 8.87374 14.8214 8.13291C15.3243 7.39208 15.5758 6.49972 15.5758 5.45582C15.5758 3.78896 15.0257 2.46725 13.9255 1.4907C12.8253 0.514153 11.1907 0.0258789 9.02172 0.0258789C8.22015 0.0258789 7.46572 0.0763902 6.75845 0.177412C6.05117 0.261597 5.43035 0.404713 4.89596 0.606758C4.58162 0.724617 4.33014 0.884567 4.14154 1.08661C3.96865 1.27182 3.8822 1.54121 3.8822 1.89479V6.12974C4.60426 6.24028 7.34528 6.47711 7.96081 6.45089V3.66268C8.1337 3.629 8.29087 3.60375 8.43233 3.58691C8.57378 3.57008 8.76239 3.56166 8.99815 3.56166C9.83116 3.56166 10.4363 3.73003 10.8135 4.06677C11.2064 4.38667 11.4029 4.86653 11.4029 5.50633C11.4029 6.14614 11.23 6.63442 10.8842 6.97116C10.5384 7.29106 10.0669 7.45101 9.46966 7.45101H7.96081V7.43758C7.95673 7.44399 7.95296 7.45048 7.94952 7.45705C5.66229 7.347 4.27345 7.24991 3.8813 7.19488L3.88127 7.19426L2.79467 7.08629C2.69546 7.07644 2.62295 6.98802 2.63269 6.88881L2.69152 6.29001C2.70853 6.11695 2.49506 6.02204 2.37823 6.15072L0.11053 8.64856C0.0484818 8.71691 0.0480731 8.82113 0.109583 8.89009L1.93123 10.9325C2.03594 11.0499 2.2301 10.9867 2.24547 10.8302L2.28772 10.4002C2.29797 10.2959 2.39452 10.2223 2.49778 10.2401L3.8822 10.4785V10.4869L3.88899 10.4801C4.73603 10.6229 6.26777 10.8318 7.98439 10.8127V10.81Z\" fill=\"url(#paint1_linear_2826_2722)\"/>\n  <path d=\"M11.2143 14.2195L9.8481 11.8674C11.6229 11.6743 13.0258 11.2785 13.8091 10.9619C14.1095 11.3805 14.4076 11.7844 14.7035 12.1738C15.2536 12.8978 15.6858 13.5544 16.0002 14.1437C15.843 14.733 15.5522 15.1876 15.1279 15.5075C14.7192 15.8106 14.2556 15.9621 13.7369 15.9621C13.3911 15.9621 13.0925 15.92 12.841 15.8359C12.5895 15.7517 12.3695 15.6338 12.1809 15.4823C11.9923 15.3307 11.8194 15.1455 11.6622 14.9267C11.505 14.7078 11.3557 14.4721 11.2143 14.2195Z\" fill=\"url(#paint2_linear_2826_2722)\"/>\n  <path d=\"M0.0637207 8.77344C0.0645556 8.81521 0.0798203 8.85677 0.109546 8.8901L1.93119 10.9325C2.03591 11.0499 2.23006 10.9867 2.24543 10.8302L2.28769 10.4002C2.29793 10.2959 2.39449 10.2223 2.49774 10.2401L3.88216 10.4785V10.4869L3.88896 10.4801C4.73599 10.6229 6.26774 10.8318 7.98435 10.8127V10.81H8.01892V9.21903L0.0637207 8.77344Z\" fill=\"url(#paint3_linear_2826_2722)\"/>\n  <path d=\"M8.01896 9.21922L0.0637569 8.77363C0.0628642 8.72897 0.0784679 8.68408 0.11053 8.64876L2.37823 6.15092C2.49506 6.02224 2.70853 6.11715 2.69152 6.29021L2.63269 6.88901C2.62295 6.98822 2.69546 7.07664 2.79467 7.08649L3.88127 7.19446L3.8813 7.19508C4.27345 7.2501 5.66229 7.3472 7.94952 7.45725C7.95296 7.45068 7.95673 7.44419 7.96081 7.43778V7.45121H8.01896V9.21922Z\" fill=\"url(#paint4_linear_2826_2722)\"/>\n  <defs>\n    <linearGradient id=\"paint0_linear_2826_2722\" x1=\"3.76992\" y1=\"-1.50587\" x2=\"13.212\" y2=\"19.2702\" gradientUnits=\"userSpaceOnUse\">\n      <stop stop-color=\"#1EA0FF\"/>\n      <stop offset=\"1\" stop-color=\"#004EEB\"/>\n    </linearGradient>\n    <linearGradient id=\"paint1_linear_2826_2722\" x1=\"3.76992\" y1=\"-1.50587\" x2=\"13.212\" y2=\"19.2702\" gradientUnits=\"userSpaceOnUse\">\n      <stop stop-color=\"#1EA0FF\"/>\n      <stop offset=\"1\" stop-color=\"#004EEB\"/>\n    </linearGradient>\n    <linearGradient id=\"paint2_linear_2826_2722\" x1=\"3.76992\" y1=\"-1.50587\" x2=\"13.212\" y2=\"19.2702\" gradientUnits=\"userSpaceOnUse\">\n      <stop stop-color=\"#1EA0FF\"/>\n      <stop offset=\"1\" stop-color=\"#004EEB\"/>\n    </linearGradient>\n    <linearGradient id=\"paint3_linear_2826_2722\" x1=\"11.8972\" y1=\"9.83355\" x2=\"5.27078\" y2=\"8.10349\" gradientUnits=\"userSpaceOnUse\">\n      <stop stop-color=\"#1EA0FF\"/>\n      <stop offset=\"1\" stop-color=\"#004EEB\"/>\n    </linearGradient>\n    <linearGradient id=\"paint4_linear_2826_2722\" x1=\"2.63345\" y1=\"4.98671\" x2=\"14.7158\" y2=\"6.53243\" gradientUnits=\"userSpaceOnUse\">\n      <stop stop-color=\"#1EA0FF\"/>\n      <stop offset=\"1\" stop-color=\"#004EEB\"/>\n    </linearGradient>\n  </defs>\n</svg>";

  var MinimizeIcon = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<mask id=\"mask0_2826_2732\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"16\" height=\"16\">\n<rect width=\"16\" height=\"16\" fill=\"#D9D9D9\"/>\n</mask>\n<g mask=\"url(#mask0_2826_2732)\">\n<path d=\"M6.27083 4.75L8.5 6.95833V5.27083H10V9.5H5.75V8H7.4375L5.22917 5.79167L6.27083 4.75ZM13.75 14C13.125 14 12.5903 13.7847 12.1458 13.3542C11.7153 12.9097 11.5 12.375 11.5 11.75C11.5 11.125 11.7153 10.5972 12.1458 10.1667C12.5903 9.72222 13.125 9.5 13.75 9.5C14.375 9.5 14.9028 9.72222 15.3333 10.1667C15.7778 10.5972 16 11.125 16 11.75C16 12.375 15.7778 12.9097 15.3333 13.3542C14.9028 13.7847 14.375 14 13.75 14ZM1.5 14C1.08333 14 0.729167 13.8542 0.4375 13.5625C0.145833 13.2708 1.78814e-07 12.9167 1.78814e-07 12.5V3.5C1.78814e-07 3.08333 0.145833 2.72917 0.4375 2.4375C0.729167 2.14583 1.08333 2 1.5 2H14.5C14.9167 2 15.2708 2.14583 15.5625 2.4375C15.8542 2.72917 16 3.08333 16 3.5V8H14.5V3.5H1.5V12.5H10V14H1.5Z\" fill=\"white\"/>\n</g>\n</svg>";

  var SettingsIcon = "<svg width=\"16\" height=\"17\" viewBox=\"0 0 16 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<mask id=\"mask0_3013_294\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"16\" height=\"17\">\n<rect y=\"0.748047\" width=\"16\" height=\"16\" fill=\"#D9D9D9\"/>\n</mask>\n<g mask=\"url(#mask0_3013_294)\">\n<path d=\"M6.11667 15.4147L5.86667 13.3147C5.75556 13.248 5.63333 13.1758 5.5 13.098C5.36667 13.0203 5.24444 12.948 5.13333 12.8814L3.18333 13.698L1.3 10.448L2.96667 9.18138C2.96667 9.11471 2.96667 9.04249 2.96667 8.96471C2.96667 8.88694 2.96667 8.81471 2.96667 8.74805C2.96667 8.68138 2.96667 8.60916 2.96667 8.53138C2.96667 8.4536 2.96667 8.38138 2.96667 8.31471L1.3 7.04805L3.18333 3.79805L5.13333 4.61471C5.24444 4.54805 5.36667 4.47583 5.5 4.39805C5.63333 4.32027 5.75556 4.24805 5.86667 4.18138L6.11667 2.08138H9.88333L10.1333 4.18138C10.2444 4.24805 10.3667 4.32027 10.5 4.39805C10.6333 4.47583 10.7556 4.54805 10.8667 4.61471L12.8167 3.79805L14.7 7.04805L13.05 8.31471C13.05 8.38138 13.05 8.4536 13.05 8.53138C13.05 8.60916 13.05 8.68138 13.05 8.74805C13.05 8.81471 13.05 8.88694 13.05 8.96471C13.05 9.04249 13.05 9.11471 13.05 9.18138L14.7 10.448L12.8167 13.698L10.8667 12.8814C10.7556 12.948 10.6333 13.0203 10.5 13.098C10.3667 13.1758 10.2444 13.248 10.1333 13.3147L9.88333 15.4147H6.11667ZM8 11.1314C8.65556 11.1314 9.21667 10.898 9.68333 10.4314C10.15 9.96471 10.3833 9.4036 10.3833 8.74805C10.3833 8.09249 10.15 7.53138 9.68333 7.06471C9.21667 6.59805 8.65556 6.36471 8 6.36471C7.34444 6.36471 6.78333 6.59805 6.31667 7.06471C5.85 7.53138 5.61667 8.09249 5.61667 8.74805C5.61667 9.4036 5.85 9.96471 6.31667 10.4314C6.78333 10.898 7.34444 11.1314 8 11.1314ZM8 9.73138C7.73333 9.73138 7.5 9.63694 7.3 9.44805C7.11111 9.24805 7.01667 9.01471 7.01667 8.74805C7.01667 8.48138 7.11111 8.2536 7.3 8.06471C7.5 7.86471 7.73333 7.76471 8 7.76471C8.26667 7.76471 8.49444 7.86471 8.68333 8.06471C8.88333 8.2536 8.98333 8.48138 8.98333 8.74805C8.98333 9.01471 8.88333 9.24805 8.68333 9.44805C8.49444 9.63694 8.26667 9.73138 8 9.73138ZM7.33333 14.0147H8.66667L8.86667 12.2814C9.18889 12.1925 9.5 12.0592 9.8 11.8814C10.1 11.7036 10.3722 11.4925 10.6167 11.248L12.2333 11.9314L12.9 10.8314L11.4833 9.74805C11.5389 9.59249 11.5778 9.43138 11.6 9.26471C11.6222 9.09805 11.6333 8.92582 11.6333 8.74805C11.6333 8.59249 11.6222 8.43694 11.6 8.28138C11.5778 8.11471 11.5444 7.94249 11.5 7.76471L12.9167 6.66471L12.25 5.56471L10.6333 6.26471C10.3778 6.00916 10.1 5.79805 9.8 5.63138C9.51111 5.4536 9.20556 5.32027 8.88333 5.23138L8.66667 3.48138H7.33333L7.11667 5.23138C6.79444 5.32027 6.48333 5.4536 6.18333 5.63138C5.89445 5.79805 5.62778 6.0036 5.38333 6.24805L3.76667 5.56471L3.1 6.66471L4.5 7.74805C4.45556 7.92583 4.42222 8.09805 4.4 8.26471C4.37778 8.43138 4.36667 8.59249 4.36667 8.74805C4.36667 8.9036 4.37778 9.06471 4.4 9.23138C4.42222 9.38694 4.45556 9.5536 4.5 9.73138L3.1 10.8314L3.76667 11.9314L5.38333 11.248C5.62778 11.4925 5.89445 11.7036 6.18333 11.8814C6.48333 12.048 6.79444 12.1758 7.11667 12.2647L7.33333 14.0147Z\" fill=\"white\"/>\n</g>\n</svg>";

  const DEFAULT_POSITION = { right: 16, top: 16 };
  class RQTestRuleWidget extends RQDraggableWidget {
      constructor() {
          super(DEFAULT_POSITION);
          this.shadowRoot = this.attachShadow({ mode: "closed" });
          setInnerHTML(this.shadowRoot, this._getDefaultMarkup());
      }
      connectedCallback() {
          this.setAttribute("draggable", "true");
          super.connectedCallback();
          this.addListeners();
      }
      addListeners() {
          this.shadowRoot.getElementById("minimize-button").addEventListener("click", (event) => {
              event.stopPropagation();
              this.toggleMinimize(true);
          });
          this.shadowRoot.getElementById("test-rule-minimized-btn").addEventListener("click", (event) => {
              event.stopPropagation();
              this.toggleMinimize(false);
          });
      }
      toggleMinimize(minimize) {
          const container = this.shadowRoot.getElementById("container");
          const minimizedDetails = this.shadowRoot.getElementById("minimized-details");
          if (minimize) {
              container.classList.add("minimized");
              minimizedDetails.classList.add("visible");
          }
          else {
              container.classList.remove("minimized");
              minimizedDetails.classList.remove("visible");
              // if expanded widget width is going out of screen, then  set its horizontal position to default
              const boundingRect = this.getBoundingClientRect();
              if (boundingRect.right > window.innerWidth) {
                  this.moveToPostion({ right: DEFAULT_POSITION.right, top: boundingRect.top });
              }
          }
      }
      _getDefaultMarkup() {
          return `
    <style>${css_248z}</style>
    <div id="container">
        <div id="minimized-details">
            <div id="minimized-logo">${RQLogoSmall}</div>
            <button id="test-rule-minimized-btn"></button>
        </div>
        <div id="heading-container">
            <div id="logo-container"> 
                <span id="heading-logo">${RQLogo}</span>
                <span id="logo-text">requestly</span>
            </div>
            <div id="actions-container">
                <button id="settings-button" class="hidden">${SettingsIcon}</button>
                <button id="minimize-button">${MinimizeIcon}</buttton>
            </div>
        </div>
        <div id="test-rule-container"></div>
         <div id="info-container" class="hidden">
          <div id="info-icon" class="secondary-text">${InfoIcon}</div>
          <div id="info-text" class="secondary-text"></div>
        </div>
    </div>
    `;
      }
  }

  var RQTestRuleWidgetEvent;
  (function (RQTestRuleWidgetEvent) {
      RQTestRuleWidgetEvent["VIEW_RESULTS"] = "view-results";
  })(RQTestRuleWidgetEvent || (RQTestRuleWidgetEvent = {}));
  const TAG_NAME$1 = "rq-explicit-test-rule-widget";
  class RQExplicitTestRuleWidget extends RQTestRuleWidget {
      #testRuleId;
      connectedCallback() {
          super.connectedCallback();
          const contentContainer = this.shadowRoot.getElementById("test-rule-container");
          const explicitModeMarkup = `   
     <div id="explicit-widget-container">  
        <div id="rule-status-container">
          <div id="rule-status"></div>
        </div>
        <div id="test-rule-details">
          <div id="rule-name" class="primary-text"></div>
          <button id="view-result-btn">View Results</button>
        </div>
      </div>
        `;
          setInnerHTML(contentContainer, explicitModeMarkup);
          this.addWidgetListeners();
          this.#testRuleId = this.attributes.getNamedItem("rule-id")?.value;
          const ruleName = this.shadowRoot.getElementById("rule-name");
          ruleName.textContent = "Testing " + this.attributes.getNamedItem("rule-name")?.value ?? null;
          const appliedStatus = this.attributes.getNamedItem("applied-status")?.value;
          this.showRuleAppliedStatus(appliedStatus === "true");
          const infoTextContent = this.attributes.getNamedItem("rq-test-rule-text")?.value;
          if (infoTextContent) {
              const infoContainer = this.shadowRoot.getElementById("info-container");
              const infoContainerText = this.shadowRoot.getElementById("info-text");
              setInnerHTML(infoContainerText, infoTextContent);
              infoContainer.classList.remove("hidden");
          }
      }
      addWidgetListeners() {
          this.shadowRoot.getElementById("view-result-btn").addEventListener("click", (evt) => {
              evt.stopPropagation();
              this.triggerEvent(RQTestRuleWidgetEvent.VIEW_RESULTS);
          });
          this.addEventListener("new-rule-applied", (evt) => {
              if (evt.detail?.appliedRuleId === this.#testRuleId) {
                  this.setAttribute("applied-status", "true");
                  this.showRuleAppliedStatus(true);
              }
          });
      }
      triggerEvent(name, detail) {
          this.dispatchEvent(new CustomEvent(name, { detail }));
      }
      showRuleAppliedStatus(appliedStatus) {
          const ruleStatusContainer = this.shadowRoot.getElementById("rule-status");
          const minimizedStatusBtn = this.shadowRoot.getElementById("test-rule-minimized-btn");
          if (appliedStatus) {
              setInnerHTML(ruleStatusContainer, `
        <span>${CheckIcon}</span>
        <span id="rule-applied-status">RULE APPLIED</span>
        `);
              setInnerHTML(minimizedStatusBtn, `
        <span class="success">${CheckIcon}</span>
      `);
          }
          else {
              setInnerHTML(ruleStatusContainer, `
        <span>${PendingIcon}</span>
        <span id="rule-not-applied-status">RULE NOT APPLIED YET</span>
        `);
              setInnerHTML(minimizedStatusBtn, `
        <span class="warning">${PendingIcon}</span>
      `);
          }
      }
  }
  registerCustomElement(TAG_NAME$1, RQExplicitTestRuleWidget);

  var arrowRightIcon = "<svg width=\"14\" height=\"15\" viewBox=\"0 0 14 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<mask id=\"mask0_2525_7455\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"14\" height=\"15\">\n<rect y=\"0.748047\" width=\"14\" height=\"14\" fill=\"#D9D9D9\"/>\n</mask>\n<g mask=\"url(#mask0_2525_7455)\">\n<path d=\"M9.1875 8.27305H2.8V7.22305H9.1875L6.25625 4.2918L7 3.54805L11.2 7.74805L7 11.948L6.25625 11.2043L9.1875 8.27305Z\" fill=\"white\"/>\n</g>\n</svg>";

  const TAG_NAME = "rq-implicit-test-rule-widget";
  class RQImplicitTestRuleWidget extends RQTestRuleWidget {
      #appliedRules = [];
      connectedCallback() {
          super.connectedCallback();
          this.toggleMinimize(true);
          const contentContainer = this.shadowRoot.getElementById("test-rule-container");
          const minimizedStatusBtn = this.shadowRoot.getElementById("test-rule-minimized-btn");
          const widgetContent = `
    <div id="implicit-widget-container">
      <div id="applied-rules-list-header">Rules applied on this page</div>
      <div id="applied-rules-list"></div>
    </div>`;
          setInnerHTML(minimizedStatusBtn, `<span class="success">${CheckIcon}</span>`);
          setInnerHTML(contentContainer, widgetContent);
          const settingsButton = this.shadowRoot.getElementById("settings-button");
          settingsButton.classList.remove("hidden");
          this.addWidgetListeners();
          const appliedRules = JSON.parse(this.attributes.getNamedItem("applied-rules")?.value || "[]");
          if (appliedRules.length) {
              appliedRules.forEach((rule) => this.#appliedRules.push(rule));
              this.renderAppliedRules();
          }
      }
      addWidgetListeners() {
          this.addEventListener("new-rule-applied", (evt) => {
              const isRuleAlreadyApplied = this.#appliedRules.some((rule) => rule.ruleId === evt.detail.appliedRuleId);
              if (isRuleAlreadyApplied)
                  return;
              this.#appliedRules.push({
                  ruleId: evt.detail.appliedRuleId,
                  ruleName: evt.detail.appliedRuleName,
                  ruleType: evt.detail.appliedRuleType,
              });
              this.renderAppliedRules();
          });
          this.shadowRoot.getElementById("settings-button").addEventListener("click", () => {
              this.dispatchEvent(new CustomEvent("open_app_settings"));
          });
          this.dispatchEvent(new CustomEvent("rule_applied_listener_active"));
      }
      triggerAppliedRuleClickedEvent(detail) {
          this.dispatchEvent(new CustomEvent("view_rule_in_editor", { detail }));
      }
      renderAppliedRules() {
          const appliedRulesList = this.shadowRoot.getElementById("applied-rules-list");
          const appliedRulesMarkup = this.#appliedRules.map((rule) => {
              return `
        <div class="applied-rule-list-item">
          <div class="applied-rule-item-details">
            <span class="applied-rule-icon">${getRuleTypeIcon(rule.ruleType)}</span>
            <span class="applied-rule-name">${rule.ruleName}</span>
          </div>
         <span class="applied-rule-arrow-icon">${arrowRightIcon}</span>
        </div>`;
          });
          setInnerHTML(appliedRulesList, appliedRulesMarkup.join(""));
          appliedRulesList.querySelectorAll(".applied-rule-list-item").forEach((ruleElement, index) => {
              ruleElement.addEventListener("click", () => {
                  this.triggerAppliedRuleClickedEvent({
                      ruleId: this.#appliedRules[index].ruleId,
                  });
              });
          });
      }
  }
  registerCustomElement(TAG_NAME, RQImplicitTestRuleWidget);

})();
