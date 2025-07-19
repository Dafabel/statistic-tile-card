import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element/lit-element.js?module";

/**
 * Custom Statistic Tile Card
 */
class StatisticTileCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  static get styles() {
    return css`
      .tile {
        background: var(--ha-card-background, #fff);
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, 0 2px 5px rgba(0, 0, 0, 0.1));
        padding: 1em;
        text-align: center;
        font-size: 1.4em;
      }
      .title {
        font-size: 0.9em;
        color: var(--secondary-text-color);
        margin-bottom: 0.5em;
      }
      .value {
        font-weight: bold;
        font-size: 1.5em;
      }
    `;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  render() {
    const state = this.hass.states[this.config.entity];
    if (!state)
      return html`<ha-card><div class="tile">Entity not found</div></ha-card>`;

    const name = this.config.name || state.attributes.friendly_name;
    const value = state.state + (this.config.unit || "");

    return html`
      <ha-card>
        <div class="tile">
          <div class="title">${name}</div>
          <div class="value">${value}</div>
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 1;
  }

  static getConfigElement() {
    const el = document.createElement("hui-entity-card-editor");
    return el;
  }

  static getStubConfig() {
    return {
      type: "custom:statistic-tile-card",
      entity: "sensor.temperature",
    };
  }
}

customElements.define("statistic-tile-card", StatisticTileCard);

// Register with Home Assistant if available
window.customCards = window.customCards || [];
window.customCards.push({
  type: "statistic-tile-card",
  name: "Statistic Tile Card",
  preview: true,
  description: "A custom tile card to display statistics or numeric values",
});
