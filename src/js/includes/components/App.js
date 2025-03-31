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
            <article class="tile">
                <img src="${obj.logo}" alt="${obj.name}" class="tile__image">
                <div class="tile__main">
                    <h2>${obj.name}</h2>
                    <div>${obj.description}</div>
                </div>
                <footer class="tile__footer">
                    <button class="button">Remove</button><label class="check"><input type="checkbox" ${obj.isActive ? 'checked="checked"' : ''}></label>
                </footer>
            </article>
        `;
    }
}
