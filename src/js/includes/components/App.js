import data from '../../../data/data.json';
export default class App {
    #data;
    #el;

    constructor(el) {
        this.#data = data;
        this.#el = el;

        this.render();
    }

    render() {
        const html = this.#data.map(obj => this.#getSingleHtml(obj)).join('');

        this.#el.innerHTML = html;
    }

    #getSingleHtml(obj) {
        return `
            <article>
                <img src="${obj.logo}" alt="${obj.name}">
                <h2>${obj.name}</h2>
                <div>${obj.description}</div>
                <footer><button>Remove</button><label><input type="checkbox" ${obj.isActive ? 'checked="checked"' : ''}></label></footer>
            </article>
        `;
    }
}
