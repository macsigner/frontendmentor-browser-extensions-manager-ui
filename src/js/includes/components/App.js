import data from '../../../data/data.json';
import {delegate} from '../helper/tools';
export default class App {
    #data;
    #el;

    constructor(el) {
        this.#data = this.#load();
        this.#el = el;

        this.#el.addEventListener('click', delegate('button', e => {
            const key = e.target.closest('[data-key]')?.dataset.key;

            if(!key) {
                return;
            }

            const item = this.#data.splice(key, 1);
            this.#save();
            this.render();
        }));

        this.#el.addEventListener('change', delegate('[type="checkbox"]', e => {
            const key = e.target.closest('[data-key]')?.dataset.key;

            if(!key) {
                return;
            }

            this.#data[key].isActive = e.target.checked;
            this.#save();
        }));

        this.render();
    }

    render() {
        const html = this.#data.map((obj, key) => this.#getSingleHtml(obj, key)).join('');

        this.#el.innerHTML = html;
    }

    #getSingleHtml(obj, key) {
        return `
            <article class="tile" data-key="${key}">
                <img src="${obj.logo}" alt="${obj.name}" class="tile__image">
                <div class="tile__main">
                    <h2 class="tile__title">${obj.name}</h2>
                    <div>${obj.description}</div>
                </div>
                <footer class="tile__footer">
                    <button class="button">Remove</button><label class="check"><input type="checkbox" ${obj.isActive ? 'checked="checked"' : ''}></label>
                </footer>
            </article>
        `;
    }

    #save() {
        localStorage.setItem('app', JSON.stringify(this.#data));
    }

    #load() {
        let json = JSON.parse(localStorage.getItem('app'));

        return json || data;
    }
}
