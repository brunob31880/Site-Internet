//
const own_template = document.createElement("template");
own_template.innerHTML = /*html*/ `
<style>
* {
  margin:0;
  padding:0;
}
.general {
    position:relative;
    height: 100px;
    border: 2px solid #39191c;
    width: 90%;
   border-radius: 2em;
    margin: 1em auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    -webkit-box-shadow: 5px 5px 15px 5px #000000;
    box-shadow: 5px 5px 15px 5px #000000;
}
.buttons{
    background-color: #7070c9;
   position:absolute;
   width:100%;
    height:100%;
    border-radius: 2em;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  color:black;
}
.front {
  position:absolute;
     background-color: #9090f9;
     width:100%;
    height:100%;
    border-radius: 2em;   
  display:flex;
  align-items:center;
  justify-content:space-between;
  color:black;
   border: 2px solid #39191c;
   text-overflow: ellipsis;
  transition:width 300ms;
}

 .front > img {
    margin: 15px 15px 15px 25px;
    transform: rotate(-15deg);
    transition: 1000ms;
  }
  
  .front > img:hover {
    transform: rotate(0deg);
    -webkit-box-shadow: 5px 12px 22px 3px #000000;
    box-shadow: 5px 12px 22px 3px #000000;
    cursor:pointer;
  }
.content {
  display:flex;
  justify-content:flex-start;
  width:100%;
}
.trash {
  cursor:pointer;
  background-color:#FF0098;
  height:100%;
  border-radius: 0 2em 2em 0;
  align-items:center;
  justify-content:center;
  display:flex;
  width:100px;
}
</style>
<article>
  <div class="general">
    <div class="buttons">
      <div class="trash">
  trash
      </div>
    </div>
    <div class="front">
    <img height="80px" src="./media/article.png" />
      <div class="content">
        FRONT
      </div>
    </div>
  </div>
</article>

`;

/**
 *
 */
export class Article extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
  }
  /**
   *
   */
  get state() {
    return this.getAttribute("state");
  }
  /**
   *
   */
  get content() {
    return this.getAttribute("content");
  }
  /**
   *
   */
  static get observedAttributes() {
    return ["state", "content"];
  }
  /**
   *
   */
  get bus() {
    return this._bus;
  }
  /**
   *
   */
  set bus(value) {
    this._bus = value;
  }
  /**
   * 
   */
  closing = () => {
    console.log("Closing");
    this.front.style.width = "100%";
    //
  };
  /**
   *
   */
  connectedCallback() {
    console.log("Connected Callback");
    this.shadowRoot.appendChild(own_template.content.cloneNode(true));
    this.container = this.shadowRoot.querySelector(".content");
    this.front = this.shadowRoot.querySelector(".front");
    console.log("front=" + this.front);
    let drag = false;
    let limit = 50;
    this.trash = this.shadowRoot.querySelector(".trash");
    //front.setAttribute("hidden","true");
    let x = 0;
    let y = 0;

    this.front.addEventListener("mousedown", (e) => {
      drag = true;
      x = e.offsetX;
      y = e.offsetY;
      console.log("X=" + x);
    });

    this.front.addEventListener("mousemove", (e) => {
      if (drag) {
        x = e.offsetX;
        y = e.offsetY;
        console.log("X=" + x);
        let alpha = (100 * x) / this.front.clientWidth;
        console.log("Alpha="+alpha)
        //if (alpha > 50)
         this.front.style.width = alpha + "%";
      }
    });

    this.front.addEventListener("mouseup", (e) => {
      x = 0;
      y = 0;
      drag = false;
    });
    this.shadowRoot.addEventListener("mouseup", (e) => {
      x = 0;
      y = 0;
      drag = false;
    });

   
    this.trash.addEventListener("click", (e) => {
      this.closing();
    });

    if (this.hasAttribute("content"))
      this.updateContent(this.getAttribute("content"));
  }
  /**
   *
   * @param {*} name
   * @param {*} oldValue
   * @param {*} newValue
   * @returns
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === "state") this.updateState(newValue);
    else if (name === "content") this.updateContent(newValue);
  }
  /**
   *
   * @param {*} state
   */
  updateState(state) {
    // fsm.state et state doivent etre synchro
    //if (this.fsm && this.fsm.state !== state) this.fsm.goto(state)
  }
  /**
   *
   * @param {*} content
   */
  updateContent(content) {
    console.log("Update with " + content);
    if (this.container) this.container.innerHTML = content;
    else console.log("Can't find container");
  }
}
customElements.define("site-article", Article);
