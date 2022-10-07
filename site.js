import {Articles} from "./articles.js";
//
const own_template = document.createElement("template");
own_template.innerHTML = /*html*/ `
<style>
*{
  margin:0;
  padding:0;
}
.row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }
  .left {
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(
        rgba(30, 30, 30, 0.8),
        rgba(100, 100, 255, 0.7)
      ),
      url("./media/phi.jpg");
    background-size: cover;
    border-right: 2px solid black;
    height: 100%;
  }
  .column {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: white;
  }
  .right {
    flex: 7;
    height: 100%;
  
    background-image: linear-gradient(
      180deg,
      rgba(128, 126, 230, 0.8),
      rgba(255, 255, 255, 0.7)
    ),
    url("./media/crazy.jpg");;
  }
  main {
    height: 100vh;
    font-family: sans-serif;
  }
  * {
    margin: 0;
  }
  .avatar {
    margin-bottom: 10px;
    border: 2px solid antiquewhite;
    border-radius: 50%;
    animation: shake 0.5s;
  }
  .svg {
    fill: purple;
  }
  h1 {
    text-decoration: underline;
  }
  .menu {
    margin-top: 10px;
    letter-spacing: 0.4rem;
    line-height: 1.8;
  }
  .dep {
    transform: translate(0px, 50px);
  }
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
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

<header></header>
<main>
  <div class="row">
    <div class="left">
      <div class="column dep">
        <img
          class="avatar"
          width="80px"
          height="80px"
          src="./media/image.png"
        />
        <h1>Bruno Boissie</h1>
        <h6>Mathématiques, Informatique, Machine Learning</h6>
        <div class="column menu">
          <h4>Mathématiques</h4>
          <h4>Informatique</h4>
          <h4>Machine Learning</h4>
        </div>
      </div>
    </div>
    <div class="right">
     <site-articles></site-articles>
    </div>
  </div>
</main>
<footer></footer>
`



// les différents etats de l'application
const stateEnum = {
  login: 0,
  normal: 1,
};

/**
 * 
 */
class Site extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: 'open' });
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
    // on définit la Machine a état
    let m_transitions = [];
    let m_methods = [];
    for (const [key, value] of Object.entries(stateEnum)) {
      for (const [key2, value2] of Object.entries(stateEnum)) {
        if (key2 !== key)
          m_transitions.push({
            name: "t_" + value + "" + value2,
            from: key,
            to: key2,
          });
      }
    }
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
customElements.define('site-app', Site);