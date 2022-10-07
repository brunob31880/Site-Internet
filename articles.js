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
        <img height="80px" src="./media/storybook.png" />
        <h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni est
          mollitia quia, maxime doloremque consequatur recusandae impedit?
          Vero nulla maiores sed officiis minus. Dolorem dicta quae
          accusantium rerum repudiandae voluptatibus!
        </h4>
      </article>
      <article>
        <img height="80px" src="./media/webcomponents.png" />
        <h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni est
          mollitia quia, maxime doloremque consequatur recusandae impedit?
          Vero nulla maiores sed officiis minus. Dolorem dicta quae
          accusantium rerum repudiandae voluptatibus!
        </h4>
      </article>

`;

/**
 *
 */
export class Articles extends HTMLElement {
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
  static get observedAttributes() {
    return ["state"];
  }

  /**
   *
   */
  connectedCallback() {
    this.shadowRoot.appendChild(own_template.content.cloneNode(true));
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
  }
  /**
   *
   * @param {*} state
   * @returns
   */
  updateState(state) {
    // fsm.state et state doivent etre synchro
    //if (this.fsm && this.fsm.state !== state) this.fsm.goto(state)
  }
}
customElements.define("site-articles", Articles);
