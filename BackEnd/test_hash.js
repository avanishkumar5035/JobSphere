const bcrypt = require('bcryptjs');

const hash = '$2b$10$ZO1m.oPL5sfevOF58XBmt.8qQPAkrRuFZSLhVAxHx23VVaJkpeOy6';

async function test() {
    const passwords = ['123456', '123456789', 'password', 'password123', 'harshit123', 'admin123', 'test', 'User@123'];
    for (let p of passwords) {
        if (await bcrypt.compare(p, hash)) {
            console.log('MATCH FOUND:', p);
            return;
        }
    }
    console.log('NO MATCH FOUND.');
}
test();
