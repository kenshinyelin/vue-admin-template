var fs = require('fs');
const cheerio = require('cheerio');
const pug = require('pug');

function loadOuterPage() {
    let $ = cheerio.load(fs.readFileSync('./page.html'));
    let header = [];
    $('.re_div_head').each((i, el) => {
        if (i === 0) {
            $(el).find('[name="sort_btn"]').each((i, ch) => {
                header.push($(ch).text().trim());
            })
        }
    })

    let body = [];

    $('.re_headbg02G').each((i, el) => {
        if (i === 0) {
            let row = ['总计'];
            $(el).find('.re_div_moveG > div').each((j, ch) => {
                row.push($(ch).text().trim());
            })
            body.push(row);
        }
    })

    $('.re_div_body').each((i, el) => {
        if (i === 0) {
            let row = [];
            let firstCol = $(el).find('.word_link').text().trim().replace(/ /g, '');
            row.push(firstCol);
            $(el).find('.re_div_moveG > div').each((j, ch) => {
                row.push($(ch).text().trim());
            })
            body.push(row);
        }
    })
    let table = {
        header,
        body
    }

    return table;
}

function loadInnerPage() {
    let $ = cheerio.load(fs.readFileSync('./page2.html'));
    let header = [];
    $('.re_div_head').each((i, el) => {
        if (i === 0) {
            $(el).find('[name="sort_btn"]').each((i, ch) => {
                header.push($(ch).text().trim());
            })
        }
    })

    let body = [];

    $('.re_headbg02G').each((i, el) => {
        if (i === 0) {
            let row = ['总计'];
            $(el).find('.re_div_moveG > div').each((j, ch) => {
                row.push($(ch).text().trim());
            })
            body.push(row);
        }
    })
    let isFirstColEmpty = false;
    $('#data_right_scroll .re_div_body').each((i, el) => {
        if ($(el).attr('id') === 'accid_*ID0*') {
            return;
        }
        let row = [];
        let firstCol = $(el).find('.re_left_br').text().trim().replace(/ /g, '');
        row.push(firstCol);
        $(el).find('.re_div_moveG  > div').each((j, ch) => {
            row.push($(ch).text().trim());
        })
        body.push(row);
        if (!firstCol) {
            isFirstColEmpty = true;
        }
    })
    if (isFirstColEmpty) {
        $('.re_left_fixed').each((i, el) => {
            if (i === 0) {
                $(el).find('> div').each((j, ch) => {
                    if (j >= 2) {
                        let col = $(ch).text().trim().replace(/ /g, '');
                        body[j - 1][0]= col;
                    }
                })
            }
        })
    }
    if (body && body[0] && body[0].length > header.length) {
        $('.re_left_fixed').each((i, el) => {
            if (i === 0) {
                $(el).find('> div').each((j, ch) => {
                    if (j === 0) {
                        let col = $(ch).text().trim().replace(/ /g, '');
                        header.unshift(col);
                    }
                })
            }
        })
    }
    body = body.filter(item => item[0])
    let table = {
        header,
        body
    }
    return table
}

function f() {
    let t1 = loadOuterPage();
    let t2 = loadInnerPage();
    
    let html = pug.renderFile('index.pug', {
        t1,
        t2
    })
    fs.writeFileSync('report.html', html);
}

module.exports = f;

