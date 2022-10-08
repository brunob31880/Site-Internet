//
const own_template = document.createElement("template");
own_template.innerHTML = /*html*/ `
<style>
  article {
    border: 2px solid #39191c;
    width: 90%;
    border-radius: 2em;
    text-overflow: ellipsis;
    padding: 1em;
    margin: 1em auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9090f9;
    -webkit-box-shadow: 5px 5px 15px 5px #000000;
    box-shadow: 5px 5px 15px 5px #000000;
    color:white;
  }
  article > img {
    margin: 0 15px 15px 0;
    transform: rotate(-15deg);
    transition: 300ms;
  }
  
  article > img:hover {
    transform: rotate(0deg);
    -webkit-box-shadow: 5px 12px 22px 3px #000000;
    box-shadow: 5px 12px 22px 3px #000000;
    cursor:pointer;
  }
</style>
<article>
<img height="80px" src="./media/article.png" />
<h4 id="container">
</h4>
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
    return ["state","content"];
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
  connectedCallback() {
    console.log("Connected Callback")
    this.shadowRoot.appendChild(own_template.content.cloneNode(true));
    this.container=this.shadowRoot.getElementById("container");
    console.log("container="+this.container);
    if (this.hasAttribute("content")) this.updateContent(this.getAttribute("content"));
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
  updateContent(content){
    console.log("Update with "+content)
    if (this.container) this.container.innerHTML=content;
    else console.log("Can't find container");
  }
}
customElements.define("site-article", Article);
