class ResetButtons {
    createButtons() {
        const filtersSection = document.querySelector('.filters') as Element;
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('filters__reset-btn-wrapper');

        const btnData = [
            { text: 'сбросить фильтры', class: 'filters__reset-filters', id: 'reset-filters-btn' },
            { text: 'сбросить настройки', class: 'filters__reset-settings', id: 'reset-settings-btn' },
        ];

        btnData.forEach((item) => {
            const button = document.createElement('button');
            button.classList.add(item.class);
            button.id = item.id;
            button.textContent = item.text;
            btnWrapper.append(button);
        });

        filtersSection.append(btnWrapper);
    }
}

export default ResetButtons;
