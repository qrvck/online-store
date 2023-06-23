import assortments from '../assets/assortment.json';
import RangeFilter from '../ts/rangeFilters';
import Search from '../ts/search';
import Sort from '../ts/sort';
import ValueFilters from '../ts/valueFilters';


describe('When we use RangeFilter.getMin() method with', () => {
  it('amount parameter, it returns the minimum quantity of goods in stock', () => {
    const result = new RangeFilter(assortments).getMin(assortments, 'amount');
    const expected = '1';

    expect(result).toEqual(expected);
  })

  it('price parameter, it returns the minimum price of the item', () => {
    const result = new RangeFilter(assortments).getMin(assortments, 'price');
    const expected = '229';

    expect(result).toEqual(expected);
  })
})


describe('When we use RangeFilter.getMax() method with', () => {
  it('amount parameter, it returns the maximum quantity of goods in stock', () => {
    const result = new RangeFilter(assortments).getMax(assortments, 'amount');
    const expected = '51';

    expect(result).toEqual(expected);
  })

  it('price parameter, it returns the maximum price of the item', () => {
    const result = new RangeFilter(assortments).getMax(assortments, 'price');
    const expected = '699';

    expect(result).toEqual(expected);
  })
})


describe('When we use RangeFilter.filters() method with', () => {
  it('amount: 10-18 & price: 360-500 parameters, it returns an array of data filtered by parameters', () => {
    const rangeFilter = new RangeFilter(assortments);
    rangeFilter.rageTypes[0].startFilter = '10';
    rangeFilter.rageTypes[0].endFilter = '18';
    rangeFilter.rageTypes[1].startFilter = '360';
    rangeFilter.rageTypes[1].endFilter = '500';

    const result = rangeFilter.filters(assortments);
    const expected = [
      {
        title: 'Nike Blazer Mid 77 Suede',
        img: './assets/img/assortiment/nike-blazer-mid-77-suede.webp',
        amount: '15',
        releaseYear: '2020',
        color: 'серый',
        price: '399',
        manufacturer: 'Nike',
        type: 'кеды',
        popular: 'непопулярный'
      },
      {
        title: 'Adidas Superstar',
        img: './assets/img/assortiment/adidas-superstar.webp',
        amount: '15',
        releaseYear: '2021',
        color: 'белый',
        price: '479',
        manufacturer: 'Adidas',
        type: 'кеды',
        popular: 'непопулярный'
      },
      {
        title: 'Puma RS-Z College',
        img: './assets/img/assortiment/puma-rs-z-college.webp',
        amount: '11',
        releaseYear: '2017',
        color: 'черный',
        price: '409',
        manufacturer: 'Puma',
        type: 'кроссовки',
        popular: 'непопулярный'
      }
    ]

    expect(result).toEqual(expected);
  })
})


describe('When we use Search.search() method with word search \'adidas ozweego\'', () => {
  it('returns an array of products with a title that includes the words \'adidas ozweego\'', () => {
    const search = new Search(assortments);
    search.searchWords = 'adidas ozweego';

    const result = search.search(assortments);
    const expected = [
      {
        title: 'Adidas Ozweego',
        img: './assets/img/assortiment/adidas-ozweego-black.webp',
        amount: '10',
        releaseYear: '2022',
        color: 'черный',
        price: '609',
        manufacturer: 'Adidas',
        type: 'кроссовки',
        popular: 'непопулярный'
      },
      {
        title: 'Adidas Ozweego',
        img: './assets/img/assortiment/adidas-ozweego-white.webp',
        amount: '8',
        releaseYear: '2022',
        color: 'белый',
        price: '609',
        manufacturer: 'Adidas',
        type: 'кроссовки',
        popular: 'непопулярный'
      },
      {
        title: 'Adidas Ozweego Celox',
        img: './assets/img/assortiment/adidas-ozweego-celox.webp',
        amount: '41',
        releaseYear: '2022',
        color: 'серый',
        price: '599',
        manufacturer: 'Adidas',
        type: 'кроссовки',
        popular: 'популярный'
      }
    ];

    expect(result).toEqual(expected);
  })
})


describe('When we use Sort.sort() method with', () => {
  const assortments = [
    { title: "Nike Air Flight Lite Mid", price: "509", releaseYear: "2021" },
    { title: "Nike Court Vision Low Next Nature", price: "269", releaseYear: "2022" },
    { title: "Nike Blazer Mid 77 Suede", price: "399", releaseYear: "2020" },
    { title: "Nike Wearallday", price: "289", releaseYear: "2017" },
    { title: "Nike Blazer Mid 77", price: "369", releaseYear: "2016" },
    { title: "Nike Tanjun", price: "229", releaseYear: "2018" },
    { title: "Adidas Ozelia", price: "519", releaseYear: "2019" }
  ]

  it('\'price (asc)\' parameter, it returns an array sorted by price from lowest to highest', () => {
    const sort = new Sort(assortments);
    sort.sortType = 'price (asc)';

    const result = sort.sort(assortments);
    const expected = [
      { title: 'Nike Tanjun', price: '229', releaseYear: '2018' },
      { title: 'Nike Court Vision Low Next Nature', price: '269', releaseYear: '2022' },
      { title: 'Nike Wearallday', price: '289', releaseYear: '2017' },
      { title: 'Nike Blazer Mid 77', price: '369', releaseYear: '2016' },
      { title: 'Nike Blazer Mid 77 Suede', price: '399', releaseYear: '2020' },
      { title: 'Nike Air Flight Lite Mid', price: '509', releaseYear: '2021' },
      { title: 'Adidas Ozelia', price: '519', releaseYear: '2019' }
    ]

    expect(result).toEqual(expected);
  })

  it('\'price (desc)\' parameter, it returns an array sorted by price from highest to lowest', () => {
    const sort = new Sort(assortments);
    sort.sortType = 'price (desc)';

    const result = sort.sort(assortments);
    const expected = [
      { title: 'Adidas Ozelia', price: '519', releaseYear: '2019' },
      { title: 'Nike Air Flight Lite Mid', price: '509', releaseYear: '2021' },
      { title: 'Nike Blazer Mid 77 Suede', price: '399', releaseYear: '2020' },
      { title: 'Nike Blazer Mid 77', price: '369', releaseYear: '2016' },
      { title: 'Nike Wearallday', price: '289', releaseYear: '2017' },
      { title: 'Nike Court Vision Low Next Nature', price: '269', releaseYear: '2022' },
      { title: 'Nike Tanjun', price: '229', releaseYear: '2018' },
    ]

    expect(result).toEqual(expected);
  })

  it('\'by year (asc)\' parameter, it returns an array sorted by release year from oldest to newest', () => {
    const sort = new Sort(assortments);
    sort.sortType = 'by year (asc)';

    const result = sort.sort(assortments);
    const expected = [
      { title: 'Nike Blazer Mid 77', price: '369', releaseYear: '2016' },
      { title: 'Nike Wearallday', price: '289', releaseYear: '2017' },
      { title: 'Nike Tanjun', price: '229', releaseYear: '2018' },
      { title: 'Adidas Ozelia', price: '519', releaseYear: '2019' },
      { title: 'Nike Blazer Mid 77 Suede', price: '399', releaseYear: '2020' },
      { title: 'Nike Air Flight Lite Mid', price: '509', releaseYear: '2021' },
      { title: 'Nike Court Vision Low Next Nature', price: '269', releaseYear: '2022' },
    ]

    expect(result).toEqual(expected);
  })

  it('\'by year (desc)\' parameter, it returns an array sorted by release year from newest to oldest', () => {
    const sort = new Sort(assortments);
    sort.sortType = 'by year (desc)';

    const result = sort.sort(assortments);
    const expected = [
      { title: 'Nike Court Vision Low Next Nature', price: '269', releaseYear: '2022' },
      { title: 'Nike Air Flight Lite Mid', price: '509', releaseYear: '2021' },
      { title: 'Nike Blazer Mid 77 Suede', price: '399', releaseYear: '2020' },
      { title: 'Adidas Ozelia', price: '519', releaseYear: '2019' },
      { title: 'Nike Tanjun', price: '229', releaseYear: '2018' },
      { title: 'Nike Wearallday', price: '289', releaseYear: '2017' },
      { title: 'Nike Blazer Mid 77', price: '369', releaseYear: '2016' },
    ]

    expect(result).toEqual(expected);
  })
})


describe('When we use ValueFilters.filters() with parameters:', () => {
  it('popular: [\'популярный\'], manufacturer: [\'Puma\'], it returns an array of data filtered by parameters', () => {
    const valueFilters = new ValueFilters(assortments);
    valueFilters.filteredTypes = {
      manufacturer: ['Puma'],
      color: [],
      type: [],
      popular: ['популярный'],
    }

    const result = valueFilters.filters(assortments);
    const expected = [
      {
        title: 'Puma RS Connect Dust',
        img: './assets/img/assortiment/puma-rs-connect-dust.webp',
        amount: '5',
        releaseYear: '2020',
        color: 'многоцветный',
        price: '479',
        manufacturer: 'Puma',
        type: 'кроссовки',
        popular: 'популярный'
      },
      {
        title: 'Puma RS-Connect Lazer',
        img: './assets/img/assortiment/puma-rs-connect-lazer.webp',
        amount: '1',
        releaseYear: '2021',
        color: 'многоцветный',
        price: '339',
        manufacturer: 'Puma',
        type: 'кроссовки',
        popular: 'популярный'
      }
    ]

    expect(result).toEqual(expected);
  })

  it('color: [\'серый\'], type: [\'кеды\'], it returns an array of data filtered by parameters', () => {
    const valueFilters = new ValueFilters(assortments);
    valueFilters.filteredTypes = {
      manufacturer: [],
      color: ['серый'],
      type: ['кеды'],
      popular: [],
    }

    const result = valueFilters.filters(assortments);
    const expected = [
      {
        title: 'Nike Blazer Mid 77 Suede',
        img: './assets/img/assortiment/nike-blazer-mid-77-suede.webp',
        amount: '15',
        releaseYear: '2020',
        color: 'серый',
        price: '399',
        manufacturer: 'Nike',
        type: 'кеды',
        popular: 'непопулярный'
      },
      {
        title: 'Adidas Matchbreak Super',
        img: './assets/img/assortiment/adidas-matchbreak-super.webp',
        amount: '20',
        releaseYear: '2021',
        color: 'серый',
        price: '419',
        manufacturer: 'Adidas',
        type: 'кеды',
        popular: 'популярный'
      }
    ]

    expect(result).toEqual(expected);
  })
})