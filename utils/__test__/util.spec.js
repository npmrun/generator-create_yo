const assert = require('assert');
const CopyUtil = require('../copy');
describe('多个JSON的合并', function () {
    describe('#递归合并', function () {
        it('a应该包含b中的所有属性', function () {
            let a = {
                a: {
                    a: 1,
                    c: {
                        d: 2
                    }
                }
            };
            let b = {
                b: 1,
                a: {
                    c: {
                        d: 1111
                    }
                }
            };
            CopyUtil.copyDeep(a, b)
            assert.strictEqual(JSON.stringify(a), JSON.stringify({
                a: {
                    a: 1,
                    c: {
                        d: 1111
                    }
                },
                b: 1
            }), `这两个对象要相等`);
        });
    });
});