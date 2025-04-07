import data from '../../../data/data.json';
import {delegate} from '../helper/tools';

export default class App {
    #data;
    #itemWrapper;
    #filterForm;
    #el;
    #activeFilter;

    constructor(el) {
        this.#data = this.#load();
        this.#el = el;
        this.#itemWrapper = el.querySelector('#app');
        this.#filterForm = this.#el.querySelector('.filter-form');
        document.addEventListener('click', delegate('.main-header button', () => {
            document.documentElement.classList.toggle('mode-alt');
        }));

        this.#filterForm.addEventListener('change', e => {
            const formData = new FormData(e.target.form);
            let isActive = formData.get('isActive');

            if (isActive === '*') {
                this.#activeFilter = null;
                this.render();

                return;
            }

            this.#activeFilter = {
                isActive: isActive === '1',
            };

            this.render();
        });

        this.#itemWrapper.addEventListener('click', delegate('button', e => {
            const key = e.target.closest('[data-key]')?.dataset.key;

            if (!key) {
                return;
            }

            this.#data.splice(key, 1);
            this.#save();
            this.render();
        }));

        this.#itemWrapper.addEventListener('change', delegate('[type="checkbox"]', e => {
            const key = e.target.closest('[data-key]')?.dataset.key;

            if (!key) {
                return;
            }

            this.#data[this.#data.findIndex(item => item.id === Number(key))].isActive = e.target.checked;
            this.#save();
        }));

        this.render();
    }

    render(data = this.#data) {
        if (this.#activeFilter) {
            data = this.#data.filter(item => item.isActive === this.#activeFilter.isActive);
        }

        this.#itemWrapper.innerHTML = data.map((obj, key) => this.#getSingleHtml(obj, key)).join('');
    }

    #getSingleHtml(obj) {
        return `
            <article class="tile" data-key="${obj.id}">
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
        return (json || data).map((item, id) =>{
            return {
                ...item,
                id,
            }
        });
    }
}
