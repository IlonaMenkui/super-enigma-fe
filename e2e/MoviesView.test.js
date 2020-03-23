/* eslint-disable no-undef */
import { MoviesView } from './pages/MoviesView';

const puppeteer = require('puppeteer');

let browser;
let page;
let moviesViewPage;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 0,
  });
  page = await browser.newPage();
  moviesViewPage = new MoviesView(page);
});

describe('MoviesView page', () => {
  const moviesURL = 'http://localhost:8888/movies/';
  const movieCardSelector = '[data-testid="movieCard"]';
  const nextPageSelector = '[data-testid="nextPage"]';
  const movieInfoSelector = '[data-testid="movieInfo"]';
  const activePageSelector = '[data-testid="active"]';
  const moviesErrors = [];

  it('loads correctly', async () => {
    await page.goto(moviesURL);
    await page.waitForSelector(movieCardSelector);
    const movieCard = await page.$$(movieCardSelector);
    expect(movieCard.length).toBeGreaterThanOrEqual(1);
  }, 10000);

  it('does not have exceptions', () => {
    page.on('pageerror', (error) => moviesErrors.push(error.text));
    expect(moviesErrors.length).toBe(0);
  });

  it('goes to next page correctly', async () => {
    await page.goto(moviesURL);
    await page.waitForSelector(nextPageSelector);
    await page.waitForSelector(activePageSelector);
    const firstActivePage = await page.$eval(activePageSelector, (el) => el.textContent);
    const nextPage = await page.$(nextPageSelector);
    await nextPage.tap();
    await page.waitForSelector(activePageSelector);
    const secondActivePage = await page.$eval(activePageSelector, (el) => el.textContent);
    expect(+secondActivePage).toBeGreaterThan(+firstActivePage);
  }, 10000);

  it('goes to movie description page correctly', async () => {
    await page.goto(moviesURL);
    await page.waitForSelector(movieCardSelector);
    const movieCard = await page.$(movieCardSelector);
    await movieCard.tap();
    await page.waitForSelector(movieInfoSelector);
    const movieInfo = await page.$(movieInfoSelector);
    const currentUrl = page.url();
    expect(/http:\/\/localhost:8888\/movies\/\d+$/.test(currentUrl)).toBeTruthy();
    expect(movieInfo).toBeTruthy();
  }, 10000);

  it('searches correctly with the correct search value', async () => {
    await moviesViewPage.goTo();
    await moviesViewPage.search('world');
    const searchItems = await moviesViewPage.getSearchItems();
    expect(searchItems.length).toBeGreaterThanOrEqual(1);
    await moviesViewPage.enterPress();
    const movieCard = await moviesViewPage.getMovieCard();
    expect(movieCard.length).toBeGreaterThanOrEqual(1);
  }, 10000);

  it('searches correctly with invalid search value', async () => {
    await moviesViewPage.goTo();
    await moviesViewPage.search('vjmklolnjbvgfch');
    const searchItem = await moviesViewPage.getSearchItem();
    expect(searchItem).toBeNull();
    await moviesViewPage.enterPress();
    const noResults = await moviesViewPage.getNoResults();
    expect(noResults).toBeTruthy();
  }, 10000);
});

afterAll(() => {
  browser.close();
});
